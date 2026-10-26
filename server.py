# -*- coding: utf-8 -*-
"""Журнал поверки манометров и термометров — веб-приложение.
Запуск: python server.py [порт]   (по умолчанию 5555)
"""
import io, json, os, sqlite3, sys, threading, time, shutil, copy, math, random, base64
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

BASE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE, 'manometr.db')
BACKUP_DIR = os.path.join(BASE, 'backups')
STATIC = os.path.join(BASE, 'static')
WRITE_LOCK = threading.Lock()
BACKUP_EVERY = 600   # секунд
KEEP_BACKUPS = 50
_last_backup = [0.0]

os.makedirs(BACKUP_DIR, exist_ok=True)

# ---------- база ----------

def db():
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    con.execute('PRAGMA journal_mode=WAL')
    con.execute('PRAGMA foreign_keys=ON')
    return con

def ensure_schema():
    with db() as con:
        try:
            con.execute('ALTER TABLE journal ADD COLUMN sort_order INTEGER DEFAULT 0')
            con.execute('UPDATE journal SET sort_order = id WHERE sort_order = 0 OR sort_order IS NULL')
            con.commit()
        except Exception:
            pass
        try:
            con.execute('ALTER TABLE orders ADD COLUMN band_color TEXT DEFAULT ""')
            con.commit()
        except Exception:
            pass

def backup_if_needed():
    now = time.time()
    if now - _last_backup[0] < BACKUP_EVERY:
        return
    _last_backup[0] = now
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    dst = os.path.join(BACKUP_DIR, f'manometr_{ts}.db')
    shutil.copy2(DB_PATH, dst)
    files = sorted(os.listdir(BACKUP_DIR))
    for old in files[:-KEEP_BACKUPS]:
        try: os.remove(os.path.join(BACKUP_DIR, old))
        except: pass

def audit(con, user, action, details=''):
    con.execute("INSERT INTO audit(user,action,details) VALUES(?,?,?)", (user, action, details))

# ---------- JSON helpers ----------

def jrow(row):
    return dict(row)

def ok(data, status=200):
    body = json.dumps(data, ensure_ascii=False).encode('utf-8')
    return status, [('Content-Type','application/json; charset=utf-8'),
                    ('Content-Length', str(len(body)))], body

def err(msg, status=400):
    return ok({'error': msg}, status)

# ---------- ЗАКАЗЫ API ----------

def orders_list(con):
    rows = con.execute(
        'SELECT * FROM orders ORDER BY sort_order, accept_date'
    ).fetchall()
    return [jrow(r) for r in rows]

def order_get(con, oid):
    r = con.execute('SELECT * FROM orders WHERE id=?', (oid,)).fetchone()
    return jrow(r) if r else None

def order_create(con, data):
    oid = data.get('id') or f"ord_{int(time.time()*1000)}"
    sort_order = con.execute('SELECT COALESCE(MAX(sort_order),0)+1 FROM orders').fetchone()[0]
    con.execute("""INSERT INTO orders
        (id,accept_date,customer,quantity,contact,result,issue_date,note,
         customer_features,accounting_in,accounting_out,arshin,fsa,locked,band_color,sort_order)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
        (oid, data.get('accept_date',''), data.get('customer',''),
         data.get('quantity',''), data.get('contact',''), data.get('result',''),
         data.get('issue_date',''), data.get('note',''),
         data.get('customer_features',''),
         int(bool(data.get('accounting_in'))), int(bool(data.get('accounting_out'))),
         int(bool(data.get('arshin'))), int(bool(data.get('fsa'))),
         int(bool(data.get('locked'))), data.get('band_color',''), sort_order))
    return jrow(con.execute('SELECT * FROM orders WHERE id=?', (oid,)).fetchone())

def order_update(con, oid, data):
    # PATCH: update only provided fields
    all_fields = ['accept_date','customer','quantity','contact','result','issue_date',
                  'note','customer_features','accounting_in','accounting_out',
                  'arshin','fsa','locked','band_color','sort_order']
    bool_fields = {'accounting_in','accounting_out','arshin','fsa','locked'}
    fields = [f for f in all_fields if f in data]
    if not fields:
        return jrow(con.execute('SELECT * FROM orders WHERE id=?', (oid,)).fetchone())
    sets = ', '.join(f'{f}=?' for f in fields)
    vals = []
    for f in fields:
        v = data[f]
        if f in bool_fields:
            v = int(bool(v))
        vals.append(v)
    vals.append(oid)
    con.execute(f'UPDATE orders SET {sets} WHERE id=?', vals)
    return jrow(con.execute('SELECT * FROM orders WHERE id=?', (oid,)).fetchone())

def order_delete(con, oid):
    con.execute('DELETE FROM orders WHERE id=?', (oid,))

# ---------- ЖУРНАЛ API ----------

def journal_list(con, domain='manometers'):
    rows = con.execute(
        'SELECT * FROM journal WHERE domain=? ORDER BY CASE WHEN sort_order IS NULL OR sort_order=0 THEN id ELSE sort_order END, id', (domain,)
    ).fetchall()
    return [jrow(r) for r in rows]

def journal_get(con, jid):
    r = con.execute('SELECT * FROM journal WHERE id=?', (jid,)).fetchone()
    return jrow(r) if r else None

JOURNAL_FIELDS = [
    'acceptance_date','type_si','unit','min','max','accuracy_class',
    'serial_number','gr_number','year','mp','stamp','mpi','customer',
    'party','note','protocol_number','verification_date','valid_until',
    'standards','gr_si','si_number','fgis_arshin','verifier',
    'rejection_reason','temperature','pressure','humidity','checked','band_color'
]

def journal_create(con, data, domain):
    row_key = f"{domain}:{int(time.time()*1000)}"
    sort_order = con.execute('SELECT COALESCE(MAX(sort_order),0)+1 FROM journal WHERE domain=?', (domain,)).fetchone()[0]
    vals = [row_key, domain, sort_order] + [data.get(f,'') for f in JOURNAL_FIELDS]
    placeholders = ','.join(['?']*(3+len(JOURNAL_FIELDS)))
    cols = 'row_key,domain,sort_order,' + ','.join(JOURNAL_FIELDS)
    con.execute(f'INSERT INTO journal ({cols}) VALUES ({placeholders})', vals)
    jid = con.execute('SELECT last_insert_rowid()').fetchone()[0]
    return jrow(con.execute('SELECT * FROM journal WHERE id=?', (jid,)).fetchone())

def journal_update(con, jid, data):
    fields = [f for f in JOURNAL_FIELDS + ['sort_order'] if f in data]
    if not fields:
        return jrow(con.execute('SELECT * FROM journal WHERE id=?', (jid,)).fetchone())
    sets = ', '.join(f'{f}=?' for f in fields)
    vals = [data[f] for f in fields] + [jid]
    con.execute(f'UPDATE journal SET {sets} WHERE id=?', vals)
    return jrow(con.execute('SELECT * FROM journal WHERE id=?', (jid,)).fetchone())

def journal_delete(con, jid):
    con.execute('DELETE FROM journal WHERE id=?', (jid,))

# ---------- СПРАВОЧНИКИ: общий CRUD ----------

TABLES = {
    'customers':    ('customers', ['id','name','features']),
    'types':        ('types', ['id','name','official_name','note','domain','units','is_electrocontact','is_thermomanometer']),
    'registers':    ('registers', ['id','number','domain','description_types','description_makers','description_notes','note']),
    'type-registers': ('type_registers', ['id','type_id','register_id']),
    'verification-methods': ('verification_methods', ['id','name','full_name','domain','inspection_desc','testing_desc','accuracy_desc','variation_desc','decision_basis','sign_direction','uses_zero_npi','thermo_accuracy_classes','thermo_error_formula']),
    'equipment':    ('equipment', ['id','name','serial_number','gosreestr_number','description','registration_number','disabled','is_etalon','range_min','range_max','unit','accuracy','kind','domain']),
    'equipment-deps': ('equipment_deps', ['id','equipment_id','dep_id','cond_field','cond_op','cond_value','cond_unit']),
    'method-equipment': ('method_equipment', ['id','method_id','equipment_id','purpose']),
    'measurement-points': ('measurement_points', ['id','domain','method_id','unit','min_value','max_value','point1','point2','point3','point4','point5']),
    'max-values':   ('max_values', ['id','domain','unit','value']),
    'method-ranges': ('method_ranges', ['id','domain','method_id','npi','vpi','ndi','vdi','accuracy_errors']),
    'rejection-reasons': ('rejection_reasons', ['id','method_id','name']),
    'verifications': ('verifications', ['id','register_id','accuracy_classes','from_date','to_date','mpi','mp']),
}

def ref_list(con, key):
    tbl, _ = TABLES[key]
    return [jrow(r) for r in con.execute(f'SELECT * FROM {tbl} ORDER BY rowid').fetchall()]

def ref_get(con, key, rid):
    tbl, _ = TABLES[key]
    r = con.execute(f'SELECT * FROM {tbl} WHERE id=?', (rid,)).fetchone()
    return jrow(r) if r else None

def ref_create(con, key, data):
    tbl, cols = TABLES[key]
    rid = data.get('id') or f"{key[:6]}_{int(time.time()*1000)}"
    data['id'] = rid
    vals = [str(data.get(c,'') or '') for c in cols]
    ph = ','.join(['?']*len(cols))
    con.execute(f'INSERT INTO {tbl} ({",".join(cols)}) VALUES ({ph})', vals)
    return jrow(con.execute(f'SELECT * FROM {tbl} WHERE id=?', (rid,)).fetchone())

def ref_update(con, key, rid, data):
    tbl, cols = TABLES[key]
    upd = [c for c in cols if c != 'id']
    sets = ', '.join(f'{c}=?' for c in upd)
    vals = [str(data.get(c,'') or '') for c in upd] + [rid]
    con.execute(f'UPDATE {tbl} SET {sets} WHERE id=?', vals)
    return jrow(con.execute(f'SELECT * FROM {tbl} WHERE id=?', (rid,)).fetchone())

def ref_delete(con, key, rid):
    tbl, _ = TABLES[key]
    con.execute(f'DELETE FROM {tbl} WHERE id=?', (rid,))

# ---------- ГЕНЕРАЦИЯ ПРОТОКОЛА ----------

def generate_protocol_excel(req):
    try:
        import openpyxl
        from openpyxl.utils import get_column_letter
    except ImportError:
        raise RuntimeError("Библиотека openpyxl не установлена. Установите: pip install openpyxl")

    from openpyxl import load_workbook
    from openpyxl.styles import Font, Border, Side, PatternFill, Alignment
    from copy import copy as ocopy

    tpl_path = os.path.join(BASE, 'proto_template.xlsx')
    wb = load_workbook(tpl_path)
    ws = wb.active

    date = req.get('date', '')
    number = req.get('number', '')
    temperature = req.get('temperature', '20')
    humidity = req.get('humidity', '65')
    pressure = req.get('pressure', '101.3')
    verifier = req.get('verifier', '')
    method_name = req.get('method', '')
    domain = req.get('domain', 'manometers')
    skip_readings = req.get('skip_readings', False)
    devices = req.get('devices', [])

    with db() as con:
        # Fetch verification method
        method = None
        if method_name:
            row = con.execute(
                'SELECT * FROM verification_methods WHERE name=? AND domain=?',
                (method_name, domain)
            ).fetchone()
            if row:
                method = jrow(row)

        # Fetch equipment for method
        aux_equipment = []
        etalons = []
        if method:
            eq_rows = con.execute(
                '''SELECT e.* FROM equipment e
                   JOIN method_equipment me ON me.equipment_id=e.id
                   WHERE me.method_id=? AND (e.disabled IS NULL OR e.disabled='' OR e.disabled='0')''',
                (method['id'],)
            ).fetchall()
            for r in eq_rows:
                er = jrow(r)
                if er.get('is_etalon') in (1, '1', True):
                    etalons.append(er)
                else:
                    aux_equipment.append(er)

        # Also get active etalons for domain (fallback)
        if not etalons:
            eq_rows = con.execute(
                '''SELECT * FROM equipment WHERE domain=? AND is_etalon IN ('1',1)
                   AND (disabled IS NULL OR disabled='' OR disabled='0')''',
                (domain,)
            ).fetchall()
            etalons = [jrow(r) for r in eq_rows]

        # Fetch measurement points for method+domain
        mpoints = []
        if method:
            mp_rows = con.execute(
                'SELECT * FROM measurement_points WHERE method_id=? AND domain=?',
                (method['id'], domain)
            ).fetchall()
            mpoints = [jrow(r) for r in mp_rows]

    # Etalon scoring: pick best etalon per device
    ALPHA_P = 0.25

    def to_pa(value, unit):
        try:
            v = float(value)
        except Exception:
            return 0.0
        u = (unit or '').strip().lower()
        if 'мпа' in u or 'mpa' in u:
            return v * 1e6
        if 'кпа' in u or 'kpa' in u:
            return v * 1e3
        if 'бар' in u or 'bar' in u:
            return v * 1e5
        if 'атм' in u or 'atm' in u:
            return v * 101325
        return v * 1e3  # default kPa

    def pick_etalon(device_max, device_accuracy, device_unit):
        dev_max_pa = to_pa(device_max, device_unit)
        try:
            dev_acc = float(str(device_accuracy).replace(',', '.'))
        except Exception:
            dev_acc = 1.0
        best = None
        best_score = float('inf')
        for et in etalons:
            et_max = et.get('range_max', '')
            et_unit = et.get('unit', device_unit)
            et_acc_str = et.get('accuracy', '')
            try:
                et_acc = float(str(et_acc_str).replace(',', '.'))
            except Exception:
                continue
            et_max_pa = to_pa(et_max, et_unit)
            if et_max_pa < dev_max_pa:
                continue  # doesn't cover range
            if dev_max_pa == 0:
                continue
            score = (et_acc * et_max_pa / 100) / dev_max_pa * 100
            if score > ALPHA_P * dev_acc:
                continue  # not suitable
            if score < best_score:
                best_score = score
                best = et
        return best

    # Build tools line
    chosen_etalons = []
    for dev in devices:
        et = pick_etalon(dev.get('max', ''), dev.get('accuracy_class', ''), dev.get('unit', ''))
        if et and et not in chosen_etalons:
            chosen_etalons.append(et)

    etalon_parts = []
    for et in chosen_etalons:
        name = et.get('name', '')
        serial = et.get('serial_number', '')
        gosreestr = et.get('gosreestr_number', '')
        part = name
        if serial:
            part += f' №{serial}'
        if gosreestr:
            part += f', Госреестр №{gosreestr}'
        etalon_parts.append(part)

    aux_parts = []
    for eq in aux_equipment:
        name = eq.get('name', '')
        serial = eq.get('serial_number', '')
        part = name
        if serial:
            part += f' №{serial}'
        aux_parts.append(part)

    tools_line = '; '.join(etalon_parts + aux_parts)

    # Fill header cells
    ws['H6'] = date
    ws['K6'] = number
    if method:
        ws['D8'] = method.get('full_name', method_name)
    else:
        ws['D8'] = method_name
    ws['G9'] = temperature
    ws['K9'] = humidity
    ws['O9'] = pressure
    ws['A11'] = tools_line
    if method:
        ws['D13'] = method.get('inspection_desc', '')
        ws['D14'] = method.get('testing_desc', '')
        ws['D15'] = method.get('accuracy_desc', '')
        ws['D16'] = method.get('variation_desc', '')

    SRC_START = 18
    SRC_ROWS = 9
    n_devices = len(devices)

    # Helper: copy cell style
    def copy_cell_style(src_cell, dst_cell):
        if src_cell.has_style:
            if src_cell.font:
                dst_cell.font = src_cell.font.copy()
            if src_cell.border:
                dst_cell.border = src_cell.border.copy()
            if src_cell.fill:
                dst_cell.fill = src_cell.fill.copy()
            if src_cell.alignment:
                dst_cell.alignment = src_cell.alignment.copy()
            dst_cell.number_format = src_cell.number_format

    # For n_devices > 1: clone template block
    if n_devices > 1:
        # Save template rows 18-26 (values + styles)
        saved = []
        for r in range(SRC_START, SRC_START + SRC_ROWS):
            row_data = []
            for c in range(1, ws.max_column + 1):
                cell = ws.cell(row=r, column=c)
                row_data.append({
                    'value': cell.value,
                    'font': copy.copy(cell.font),
                    'border': copy.copy(cell.border),
                    'fill': copy.copy(cell.fill),
                    'alignment': copy.copy(cell.alignment),
                    'number_format': cell.number_format,
                })
            saved.append(row_data)

        # Save merged ranges within template block
        src_merges = []
        for mr in list(ws.merged_cells.ranges):
            if mr.min_row >= SRC_START and mr.max_row < SRC_START + SRC_ROWS:
                src_merges.append((mr.min_row - SRC_START, mr.max_row - SRC_START,
                                   mr.min_col, mr.max_col))

        # Insert rows for additional devices (after row 26 = SRC_START+SRC_ROWS-1)
        insert_after = SRC_START + SRC_ROWS - 1
        rows_to_insert = (n_devices - 1) * SRC_ROWS
        ws.insert_rows(insert_after + 1, rows_to_insert)

        # Copy saved data to new rows
        for dev_idx in range(1, n_devices):
            base = SRC_START + dev_idx * SRC_ROWS
            for ri, row_data in enumerate(saved):
                for ci, cell_data in enumerate(row_data):
                    cell = ws.cell(row=base + ri, column=ci + 1)
                    cell.value = cell_data['value']
                    if cell_data['font']:
                        cell.font = copy.copy(cell_data['font'])
                    if cell_data['border']:
                        cell.border = copy.copy(cell_data['border'])
                    if cell_data['fill']:
                        cell.fill = copy.copy(cell_data['fill'])
                    if cell_data['alignment']:
                        cell.alignment = copy.copy(cell_data['alignment'])
                    cell.number_format = cell_data['number_format']
            # Re-apply merged ranges
            for (r_off_min, r_off_max, c_min, c_max) in src_merges:
                ws.merge_cells(
                    start_row=base + r_off_min, start_column=c_min,
                    end_row=base + r_off_max, end_column=c_max
                )

    def fmt_num(v):
        try:
            f = float(str(v).replace(',', '.'))
            if f == int(f):
                return str(int(f))
            return str(round(f, 4))
        except Exception:
            return str(v)

    # Write each device
    for idx, dev in enumerate(devices):
        base_row = SRC_START + idx * SRC_ROWS
        type_si = dev.get('type_si', '')
        gr_number = dev.get('gr_number', '')
        si_number = dev.get('si_number', '')
        unit = dev.get('unit', '')
        dmin = dev.get('min', '')
        dmax = dev.get('max', '')
        acc = dev.get('accuracy_class', '')

        # hdr row (base_row)
        ws.cell(row=base_row, column=7).value = gr_number       # G
        ws.cell(row=base_row, column=9).value = type_si         # I
        ws.cell(row=base_row, column=14).value = si_number      # N

        # range row (base_row+1)
        ws.cell(row=base_row + 1, column=7).value = unit        # G
        ws.cell(row=base_row + 1, column=9).value = fmt_num(dmin) if dmin else ''  # I
        ws.cell(row=base_row + 1, column=11).value = fmt_num(dmax) if dmax else '' # K
        ws.cell(row=base_row + 1, column=13).value = acc        # M

        # Get per-device measurement points
        dev_points = []
        # Try to find matching measurement points for this device's unit/range
        for mp_row in mpoints:
            pts = [str(mp_row.get(f'point{i}', '')) for i in range(1, 6) if mp_row.get(f'point{i}')]
            if pts:
                dev_points = pts
                break
        # Fallback: generate equidistant points from this device's range
        if not dev_points:
            try:
                _mn = float(str(dmin or '0').replace(',', '.'))
                _mx = float(str(dmax or '100').replace(',', '.'))
                dev_points = [str(round(_mn + (_mx - _mn) * i / 4, 6)) for i in range(5)]
            except Exception:
                dev_points = ['0', '25', '50', '75', '100']

        # Compute tolerance and accuracy values
        try:
            acc_f = float(str(acc).replace(',', '.'))
        except Exception:
            acc_f = 1.0
        try:
            mx_f = float(str(dmax or '100').replace(',', '.'))
            mn_f = float(str(dmin or '0').replace(',', '.'))
        except Exception:
            mx_f = 100.0
            mn_f = 0.0
        span = mx_f - mn_f
        tolerance = round(abs(acc_f * span / 100), 4)  # absolute tolerance

        # Point rows (base_row+3 to base_row+7)
        all_pass = True
        for pi in range(5):
            pr = base_row + 2 + pi  # rows +2..+6 (0-indexed: +3..+7 from spec, but template row 20 is header)
            # Actually: rows 21-25 in original = base_row+3 to base_row+7
            pr = base_row + 3 + pi
            pt_val_str = dev_points[pi] if pi < len(dev_points) else ''
            ws.cell(row=pr, column=1).value = pi + 1  # A = point#
            ws.cell(row=pr, column=2).value = pt_val_str  # B = setpoint

            if not skip_readings:
                try:
                    pt_val = float(str(pt_val_str).replace(',', '.'))
                except Exception:
                    pt_val = 0.0

                # Generate readings with random 25-45% of tolerance, slight bias
                bias = tolerance * 0.1 * (pi - 2) / 4  # small position-based bias
                noise_fwd = random.uniform(0.20, 0.40) * tolerance * (1 if random.random() > 0.5 else -1)
                noise_rev = random.uniform(0.20, 0.40) * tolerance * (1 if random.random() > 0.5 else -1)
                fwd = round(pt_val + bias + noise_fwd, 4)
                rev = round(pt_val + bias + noise_rev, 4)

                delta1 = round(fwd - pt_val, 4)
                delta2 = round(rev - pt_val, 4)
                variation = round(abs(fwd - rev), 4)

                gamma1 = round(delta1 / span * 100, 2) if span else 0
                gamma2 = round(delta2 / span * 100, 2) if span else 0
                var_pct = round(variation / span * 100, 2) if span else 0

                pt_pass = (abs(delta1) <= tolerance and abs(delta2) <= tolerance
                           and variation <= tolerance)
                if not pt_pass:
                    all_pass = False

                ws.cell(row=pr, column=3).value = fmt_num(fwd)       # C fwd
                ws.cell(row=pr, column=4).value = fmt_num(rev)       # D rev
                ws.cell(row=pr, column=5).value = fmt_num(delta1)    # E Δ1
                ws.cell(row=pr, column=6).value = fmt_num(delta2)    # F Δ2
                ws.cell(row=pr, column=7).value = fmt_num(tolerance) # G tolerance
                ws.cell(row=pr, column=8).value = fmt_num(variation) # H variation
                ws.cell(row=pr, column=9).value = fmt_num(tolerance) # I tolerance
                ws.cell(row=pr, column=10).value = fmt_num(gamma1)   # J γ1%
                ws.cell(row=pr, column=11).value = fmt_num(gamma2)   # K γ2%
                ws.cell(row=pr, column=12).value = acc               # L accuracy_class
                ws.cell(row=pr, column=13).value = fmt_num(var_pct)  # M variation%
                ws.cell(row=pr, column=14).value = acc               # N accuracy_class
                ws.cell(row=pr, column=15).value = '✓' if pt_pass else '✗'  # O

        # Result row (base_row+8)
        rr = base_row + 8
        result_label = 'Результаты периодической поверки:'
        ws.cell(row=rr, column=1).value = result_label

        verdict = 'ПРИГОДЕН' if all_pass else 'НЕПРИГОДЕН'
        ws.cell(row=rr, column=4).value = verdict

        decision_basis = ''
        sign_direction = ''
        uses_zero_npi = False
        if method:
            decision_basis = method.get('decision_basis', '')
            sign_direction = method.get('sign_direction', '')
            uses_zero_npi = str(method.get('uses_zero_npi', '')).lower() in ('1', 'true', 'yes')
        ws.cell(row=rr, column=6).value = decision_basis

        if uses_zero_npi:
            try:
                if float(str(dmin or '0').replace(',', '.')) < 0:
                    ws.cell(row=rr, column=11).value = sign_direction
            except Exception:
                pass

    # Signature row after all devices
    sig_row = SRC_START + n_devices * SRC_ROWS
    sig_text = f'Поверитель: инженер-метролог ООО "Римейк" ___ ({verifier})'
    ws.cell(row=sig_row, column=1).value = sig_text

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('ascii')


# ---------- ЭКСПОРТ EXCEL (универсальный) ----------

def export_excel_simple(data):
    """Создаёт xlsx из { sheet, headers, rows, col_widths, filename }. Возвращает bytes."""
    try:
        import openpyxl
        from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
        from openpyxl.utils import get_column_letter
    except ImportError:
        raise RuntimeError('openpyxl не установлен')

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = data.get('sheet', 'Данные')[:31]

    headers  = data.get('headers', [])
    rows     = data.get('rows', [])
    col_widths = data.get('col_widths', [])

    thin  = Side(border_style='thin', color='000000')
    brd   = Border(left=thin, right=thin, top=thin, bottom=thin)
    hdr_fill = PatternFill('solid', fgColor='D0E4F5')

    # Шапка
    for ci, h in enumerate(headers, 1):
        c = ws.cell(row=1, column=ci, value=h)
        c.font = Font(bold=True, size=10)
        c.fill = hdr_fill
        c.border = brd
        c.alignment = Alignment(wrap_text=True, vertical='center')
    ws.row_dimensions[1].height = 30

    # Данные
    for ri, row in enumerate(rows, 2):
        for ci, val in enumerate(row, 1):
            c = ws.cell(row=ri, column=ci, value=val)
            c.font = Font(size=9)
            c.border = brd
            c.alignment = Alignment(wrap_text=True, vertical='top')

    # Ширины колонок
    for ci, w in enumerate(col_widths, 1):
        ws.column_dimensions[get_column_letter(ci)].width = w

    ws.freeze_panes = 'A2'

    buf = io.BytesIO()
    wb.save(buf)
    return buf.getvalue()


# ---------- ВЫГРУЗКА РЕЕСТРА ----------

def export_registry(data):
    """Создаёт реестр поверки в xlsx. Возвращает bytes."""
    try:
        import openpyxl
        from openpyxl.styles import Font, Alignment, Border, Side, PatternFill
        from openpyxl.utils import get_column_letter
    except ImportError:
        raise RuntimeError('openpyxl не установлен')

    domain   = data.get('domain', 'manometer')
    rows     = data.get('rows', [])
    position = data.get('position', 'Специалист по управлению документацией')
    signer   = data.get('signer_name', '')

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Реестр'

    thin  = Side(border_style='thin', color='000000')
    brd   = Border(left=thin, right=thin, top=thin, bottom=thin)
    hdr_fill = PatternFill('solid', fgColor='BDD7EE')
    center = Alignment(horizontal='center', vertical='center', wrap_text=True)
    left   = Alignment(horizontal='left',   vertical='center', wrap_text=True)

    title = 'Реестр поверенных СИ (манометры)' if domain == 'manometer' else 'Реестр поверенных СИ (термометры)'
    ws.merge_cells('A1:J1')
    t = ws['A1']
    t.value = title
    t.font = Font(bold=True, size=12)
    t.alignment = center

    # Шапка
    hdrs = ['№', 'Тип СИ', 'Номер СИ', 'Г.р. №', 'Дата поверки', 'Годен до', 'МПИ, лет', 'СВ-ВО ФГИС АРШИН', 'КЛЕЙМО', 'Владелец']
    cw   = [5, 22, 14, 12, 12, 12, 8, 20, 8, 25]
    for ci, h in enumerate(hdrs, 1):
        c = ws.cell(row=2, column=ci, value=h)
        c.font = Font(bold=True, size=9)
        c.fill = hdr_fill
        c.border = brd
        c.alignment = center
        ws.column_dimensions[get_column_letter(ci)].width = cw[ci-1]
    ws.row_dimensions[2].height = 32

    # Данные
    for ri, r in enumerate(rows, 3):
        vals = [
            r.get('row_num',''), r.get('type_si',''), r.get('si_number',''),
            r.get('gr_number',''), r.get('verification_date',''), r.get('valid_until',''),
            r.get('mpi',''), r.get('fgis_arshin',''), r.get('stamp',''), r.get('customer',''),
        ]
        for ci, v in enumerate(vals, 1):
            c = ws.cell(row=ri, column=ci, value=v)
            c.font = Font(size=9)
            c.border = brd
            c.alignment = center if ci in (1,4,5,6,7,9) else left

    # Подпись
    sig_row = len(rows) + 4
    ws.cell(row=sig_row, column=1, value=position).font = Font(size=9)
    ws.cell(row=sig_row, column=5, value='______________').font = Font(size=9)
    ws.cell(row=sig_row, column=7, value=signer).font = Font(size=9)

    ws.freeze_panes = 'A3'

    buf = io.BytesIO()
    wb.save(buf)
    return buf.getvalue()


# ---------- ВЫГРУЗКА ЖУРНАЛА ПОВЕРКИ ----------

def export_verification_journal(data):
    """Создаёт журнал поверки в xlsx. Возвращает bytes."""
    try:
        import openpyxl
        from openpyxl.styles import Font, Alignment, Border, Side, PatternFill
        from openpyxl.utils import get_column_letter
    except ImportError:
        raise RuntimeError('openpyxl не установлен')

    domain  = data.get('domain', 'manometer')
    from_dt = data.get('from', '')
    to_dt   = data.get('to', '')
    rows    = data.get('rows', [])

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Журнал поверки'

    thin  = Side(border_style='thin', color='000000')
    brd   = Border(left=thin, right=thin, top=thin, bottom=thin)
    hdr_fill = PatternFill('solid', fgColor='BDD7EE')
    center = Alignment(horizontal='center', vertical='center', wrap_text=True)
    left   = Alignment(horizontal='left',   vertical='center', wrap_text=True)

    name = 'манометры' if domain == 'manometer' else 'термометры'
    ws.merge_cells('A1:H1')
    t = ws['A1']
    t.value = f'Журнал поверки ({name}) с {from_dt} по {to_dt}'
    t.font = Font(bold=True, size=12)
    t.alignment = center

    hdrs = ['№', 'Тип СИ', 'Номер СИ', 'Дата поверки', 'Годен до', 'СВ-ВО ФГИС АРШИН', '№ протокола', 'Клеймо']
    cw   = [5, 22, 14, 12, 12, 22, 14, 8]
    for ci, h in enumerate(hdrs, 1):
        c = ws.cell(row=2, column=ci, value=h)
        c.font = Font(bold=True, size=9)
        c.fill = hdr_fill
        c.border = brd
        c.alignment = center
        ws.column_dimensions[get_column_letter(ci)].width = cw[ci-1]
    ws.row_dimensions[2].height = 32

    for ri, r in enumerate(rows, 3):
        vals = [
            r.get('row_num',''), r.get('type_si',''), r.get('si_number',''),
            r.get('verification_date',''), r.get('valid_until',''), r.get('fgis_arshin',''),
            r.get('protocol_number',''), r.get('stamp',''),
        ]
        for ci, v in enumerate(vals, 1):
            c = ws.cell(row=ri, column=ci, value=v)
            c.font = Font(size=9)
            c.border = brd
            c.alignment = center if ci in (1,4,5,8) else left

    ws.freeze_panes = 'A3'
    buf = io.BytesIO()
    wb.save(buf)
    return buf.getvalue()


# ---------- ЗАГРУЗКА РЕЗУЛЬТАТОВ АРШИНА ----------

def import_arshin_results(data):
    """Парсит xlsx-файл результатов ФГИС АРШИН.
    Принимает { filename, data: 'base64,...' }.
    Возвращает список { serial, register, document, source_row }.
    """
    try:
        import openpyxl
    except ImportError:
        raise RuntimeError('openpyxl не установлен')

    raw_b64 = data.get('data', '')
    # FileReader.readAsDataURL → 'data:...;base64,XXXXXX'
    if ',' in raw_b64:
        raw_b64 = raw_b64.split(',', 1)[1]
    xlsx_bytes = base64.b64decode(raw_b64)
    wb = openpyxl.load_workbook(io.BytesIO(xlsx_bytes), data_only=True)
    ws = wb.active

    # Определяем колонки по шапке (строка 1)
    col_serial = col_register = col_document = None
    for cell in ws[1]:
        v = str(cell.value or '').lower().strip()
        if 'завод' in v or 'сер' in v:
            col_serial = cell.column
        elif 'реестр' in v or 'типа' in v or 'г.р' in v or 'гр' in v:
            col_register = cell.column
        elif 'свид' in v or 'докум' in v or 'номер св' in v:
            col_document = cell.column

    results = []
    for ri, row in enumerate(ws.iter_rows(min_row=2, values_only=True), 2):
        if not any(row):
            continue
        def cell_val(col):
            if col is None: return ''
            idx = col - 1
            return str(row[idx] if idx < len(row) and row[idx] is not None else '')
        serial   = cell_val(col_serial).strip()
        register = cell_val(col_register).strip()
        document = cell_val(col_document).strip()
        if serial or document:
            results.append({'serial': serial, 'register': register, 'document': document, 'source_row': ri})

    return results


# ---------- HTTP ----------

class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # тихий лог

    def send(self, status, headers, body):
        self.send_response(status)
        for k, v in headers:
            self.send_header(k, v)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def read_json(self):
        n = int(self.headers.get('Content-Length', 0))
        if n == 0:
            return {}
        return json.loads(self.rfile.read(n).decode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        p = urlparse(self.path)
        path = p.path.rstrip('/')
        qs = parse_qs(p.query)

        # Статика
        if path == '' or path == '/':
            return self._static('index.html')
        if path.startswith('/static/') or path.endswith('.js') or path.endswith('.css'):
            fname = os.path.basename(path)
            return self._static(fname)

        # API
        if path == '/api/orders':
            with db() as con:
                return self.send(*ok(orders_list(con)))

        if path.startswith('/api/orders/'):
            oid = path[len('/api/orders/'):]
            with db() as con:
                r = order_get(con, oid)
                return self.send(*(ok(r) if r else err('not found', 404)))

        if path == '/api/journal':
            domain = qs.get('domain', ['manometers'])[0]
            with db() as con:
                return self.send(*ok(journal_list(con, domain)))

        if path.startswith('/api/journal/'):
            jid = int(path[len('/api/journal/'):])
            with db() as con:
                r = journal_get(con, jid)
                return self.send(*(ok(r) if r else err('not found', 404)))

        # Справочники
        for key in TABLES:
            if path == f'/api/{key}':
                with db() as con:
                    return self.send(*ok(ref_list(con, key)))
            if path.startswith(f'/api/{key}/'):
                rid = path[len(f'/api/{key}/'):]
                with db() as con:
                    r = ref_get(con, key, rid)
                    return self.send(*(ok(r) if r else err('not found', 404)))

        return self.send(*err('not found', 404))

    def do_POST(self):
        p = urlparse(self.path)
        path = p.path.rstrip('/')
        data = self.read_json()

        with WRITE_LOCK:
            backup_if_needed()
            with db() as con:
                if path == '/api/orders':
                    r = order_create(con, data)
                    audit(con, 'api', 'order_create', r.get('id',''))
                    con.commit()
                    return self.send(*ok(r, 201))

                if path == '/api/journal':
                    domain = parse_qs(urlparse(self.path).query).get('domain', ['manometers'])[0]
                    r = journal_create(con, data, domain)
                    audit(con, 'api', 'journal_create', str(r.get('id','')))
                    con.commit()
                    return self.send(*ok(r, 201))

                for key in TABLES:
                    if path == f'/api/{key}':
                        r = ref_create(con, key, data)
                        con.commit()
                        return self.send(*ok(r, 201))

        if path == '/api/protocol':
            try:
                result = generate_protocol_excel(data)
                return self.send(*ok({'file': result, 'filename': f"protocol_{data.get('number','')}.xlsx"}))
            except Exception as ex:
                import traceback
                return self.send(*err(str(ex) + '\n' + traceback.format_exc(), 500))

        if path == '/api/export-excel':
            try:
                xlsx = export_excel_simple(data)
                fname = data.get('filename', 'export.xlsx').encode('utf-8', errors='replace').decode('latin-1', errors='replace')
                return self.send(200, [
                    ('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
                    ('Content-Disposition', f'attachment; filename="{fname}"'),
                    ('Content-Length', str(len(xlsx))),
                ], xlsx)
            except Exception as ex:
                import traceback
                return self.send(*err(str(ex) + '\n' + traceback.format_exc(), 500))

        if path == '/api/export-registry':
            try:
                xlsx = export_registry(data)
                domain = data.get('domain', 'manometer')
                today = datetime.now().strftime('%Y-%m-%d')
                return self.send(200, [
                    ('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
                    ('Content-Disposition', f'attachment; filename="reestr_{domain}_{today}.xlsx"'),
                    ('Content-Length', str(len(xlsx))),
                ], xlsx)
            except Exception as ex:
                import traceback
                return self.send(*err(str(ex) + '\n' + traceback.format_exc(), 500))

        if path == '/api/export-verification-journal':
            try:
                xlsx = export_verification_journal(data)
                domain = data.get('domain', 'manometer')
                today = datetime.now().strftime('%Y-%m-%d')
                return self.send(200, [
                    ('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
                    ('Content-Disposition', f'attachment; filename="zhurnal_poverki_{domain}_{today}.xlsx"'),
                    ('Content-Length', str(len(xlsx))),
                ], xlsx)
            except Exception as ex:
                import traceback
                return self.send(*err(str(ex) + '\n' + traceback.format_exc(), 500))

        if path == '/api/import-arshin-results':
            try:
                results = import_arshin_results(data)
                return self.send(*ok({'results': results}))
            except Exception as ex:
                import traceback
                return self.send(*err(str(ex) + '\n' + traceback.format_exc(), 500))

        return self.send(*err('not found', 404))

    def do_PUT(self):
        return self.do_PATCH()

    def do_PATCH(self):
        p = urlparse(self.path)
        path = p.path.rstrip('/')
        data = self.read_json()

        with WRITE_LOCK:
            backup_if_needed()
            with db() as con:
                if path.startswith('/api/orders/'):
                    oid = path[len('/api/orders/'):]
                    r = order_update(con, oid, data)
                    audit(con, 'api', 'order_update', oid)
                    con.commit()
                    return self.send(*ok(r))

                if path.startswith('/api/journal/'):
                    jid = int(path[len('/api/journal/'):])
                    r = journal_update(con, jid, data)
                    audit(con, 'api', 'journal_update', str(jid))
                    con.commit()
                    return self.send(*ok(r))

                for key in TABLES:
                    if path.startswith(f'/api/{key}/'):
                        rid = path[len(f'/api/{key}/'):]
                        r = ref_update(con, key, rid, data)
                        con.commit()
                        return self.send(*ok(r))

        return self.send(*err('not found', 404))

    def do_DELETE(self):
        p = urlparse(self.path)
        path = p.path.rstrip('/')

        with WRITE_LOCK:
            backup_if_needed()
            with db() as con:
                if path.startswith('/api/orders/'):
                    oid = path[len('/api/orders/'):]
                    order_delete(con, oid)
                    audit(con, 'api', 'order_delete', oid)
                    con.commit()
                    return self.send(204, [], b'')

                if path.startswith('/api/journal/'):
                    jid = int(path[len('/api/journal/'):])
                    journal_delete(con, jid)
                    audit(con, 'api', 'journal_delete', str(jid))
                    con.commit()
                    return self.send(204, [], b'')

                for key in TABLES:
                    if path.startswith(f'/api/{key}/'):
                        rid = path[len(f'/api/{key}/'):]
                        ref_delete(con, key, rid)
                        con.commit()
                        return self.send(204, [], b'')

        return self.send(*err('not found', 404))

    def _static(self, fname):
        fpath = os.path.join(STATIC, fname)
        if not os.path.exists(fpath):
            self.send(*err('not found', 404))
            return
        ext = fname.rsplit('.', 1)[-1]
        ct = {'html':'text/html','js':'application/javascript','css':'text/css'}.get(ext,'application/octet-stream')
        with open(fpath, 'rb') as f:
            body = f.read()
        self.send(200, [('Content-Type', f'{ct}; charset=utf-8'), ('Content-Length', str(len(body)))], body)


if __name__ == '__main__':
    ensure_schema()
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5555
    srv = ThreadingHTTPServer(('0.0.0.0', port), Handler)
    print(f'Манометры: http://localhost:{port}/', flush=True)
    srv.serve_forever()
