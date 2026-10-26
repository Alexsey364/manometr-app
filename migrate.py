# -*- coding: utf-8 -*-
"""Миграция данных из collab-table.db + JSON-файлов в новую базу manometr.db"""
import json, sqlite3, sys, os

SRC_DB = r'C:\Users\User\AppData\Local\Temp\collab-table.db'
MAN_JSON = r'C:\Users\User\AppData\Local\Temp\manometers_rows.json'
THERMO_JSON = r'C:\Users\User\AppData\Local\Temp\thermometers_rows.json'
DST_DB = os.path.join(os.path.dirname(__file__), 'manometr.db')

src = sqlite3.connect(SRC_DB)
dst = sqlite3.connect(DST_DB)
dst.execute('PRAGMA journal_mode=WAL')

# --- Схема новой базы ---
dst.executescript("""
CREATE TABLE IF NOT EXISTS journal (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    row_key         TEXT UNIQUE,        -- оригинальный Yjs id
    domain          TEXT NOT NULL DEFAULT 'manometers', -- manometers / thermometers
    acceptance_date TEXT,
    type_si         TEXT,
    unit            TEXT,
    min             TEXT,
    max             TEXT,
    accuracy_class  TEXT,
    serial_number   TEXT,
    gr_number       TEXT,
    year            TEXT,
    mp              TEXT,
    stamp           TEXT,
    mpi             TEXT,
    customer        TEXT,
    party           TEXT,
    note            TEXT,
    protocol_number TEXT,
    verification_date TEXT,
    valid_until     TEXT,
    standards       TEXT,
    gr_si           TEXT,
    si_number       TEXT,
    fgis_arshin     TEXT,
    verifier        TEXT,
    rejection_reason TEXT,
    temperature     TEXT,
    pressure        TEXT,
    humidity        TEXT,
    checked         TEXT,
    band_color      TEXT
);

CREATE TABLE IF NOT EXISTS orders (
    id              TEXT PRIMARY KEY,
    accept_date     TEXT,
    customer        TEXT,
    quantity        TEXT,
    contact         TEXT,
    result          TEXT,
    issue_date      TEXT,
    note            TEXT,
    customer_features TEXT,
    accounting_in   INTEGER DEFAULT 0,
    accounting_out  INTEGER DEFAULT 0,
    arshin          INTEGER DEFAULT 0,
    fsa             INTEGER DEFAULT 0,
    locked          INTEGER DEFAULT 0,
    sort_order      INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS customers (
    id      TEXT PRIMARY KEY,
    name    TEXT,
    features TEXT
);

CREATE TABLE IF NOT EXISTS types (
    id                TEXT PRIMARY KEY,
    name              TEXT,
    official_name     TEXT,
    note              TEXT,
    domain            TEXT,
    units             TEXT,
    is_electrocontact INTEGER DEFAULT 0,
    is_thermomanometer INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS registers (
    id                  TEXT PRIMARY KEY,
    number              TEXT,
    domain              TEXT,
    description_types   TEXT,
    description_makers  TEXT,
    description_notes   TEXT,
    note                TEXT
);

CREATE TABLE IF NOT EXISTS type_registers (
    id          TEXT PRIMARY KEY,
    type_id     TEXT,
    register_id TEXT
);

CREATE TABLE IF NOT EXISTS verification_methods (
    id                  TEXT PRIMARY KEY,
    name                TEXT,
    full_name           TEXT,
    domain              TEXT,
    inspection_desc     TEXT,
    testing_desc        TEXT,
    accuracy_desc       TEXT,
    variation_desc      TEXT,
    decision_basis      TEXT,
    sign_direction      TEXT,
    uses_zero_npi       INTEGER DEFAULT 0,
    thermo_accuracy_classes TEXT,
    thermo_error_formula INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS equipment (
    id                  TEXT PRIMARY KEY,
    name                TEXT,
    serial_number       TEXT,
    gosreestr_number    TEXT,
    description         TEXT,
    registration_number TEXT,
    disabled            INTEGER DEFAULT 0,
    is_etalon           INTEGER DEFAULT 0,
    range_min           REAL,
    range_max           REAL,
    unit                TEXT,
    accuracy            REAL,
    kind                TEXT,
    domain              TEXT
);

CREATE TABLE IF NOT EXISTS equipment_deps (
    id              TEXT PRIMARY KEY,
    equipment_id    TEXT,
    dep_id          TEXT,
    cond_field      TEXT,
    cond_op         TEXT,
    cond_value      TEXT,
    cond_unit       TEXT
);

CREATE TABLE IF NOT EXISTS method_equipment (
    id              TEXT PRIMARY KEY,
    method_id       TEXT,
    equipment_id    TEXT,
    purpose         TEXT
);

CREATE TABLE IF NOT EXISTS measurement_points (
    id          TEXT PRIMARY KEY,
    domain      TEXT,
    method_id   TEXT,
    unit        TEXT,
    min_value   TEXT,
    max_value   TEXT,
    point1      TEXT,
    point2      TEXT,
    point3      TEXT,
    point4      TEXT,
    point5      TEXT
);

CREATE TABLE IF NOT EXISTS max_values (
    id      TEXT PRIMARY KEY,
    domain  TEXT,
    unit    TEXT,
    value   TEXT
);

CREATE TABLE IF NOT EXISTS method_ranges (
    id              TEXT PRIMARY KEY,
    domain          TEXT,
    method_id       TEXT,
    npi             TEXT,
    vpi             TEXT,
    ndi             TEXT,
    vdi             TEXT,
    accuracy_errors TEXT
);

CREATE TABLE IF NOT EXISTS rejection_reasons (
    id          TEXT PRIMARY KEY,
    method_id   TEXT,
    name        TEXT
);

CREATE TABLE IF NOT EXISTS verifications (
    id              TEXT PRIMARY KEY,
    register_id     TEXT,
    accuracy_classes TEXT,
    from_date       TEXT,
    to_date         TEXT,
    mpi             TEXT,
    mp              TEXT
);

CREATE TABLE IF NOT EXISTS audit (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    ts      TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%S','now','localtime')),
    user    TEXT,
    action  TEXT,
    details TEXT
);
""")

# --- Журналы ---
def import_journal(json_file, domain):
    with open(json_file, encoding='utf-8') as f:
        rows = json.load(f)
    inserted = 0
    for r in rows:
        rid = r.get('_id', '')
        row_key = f"{domain}:{rid}"
        dst.execute("""
            INSERT OR IGNORE INTO journal
            (row_key, domain, acceptance_date, type_si, unit, min, max,
             accuracy_class, serial_number, gr_number, year, mp, stamp, mpi,
             customer, party, note, protocol_number, verification_date, valid_until,
             standards, gr_si, si_number, fgis_arshin, verifier, rejection_reason,
             temperature, pressure, humidity, checked, band_color)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            row_key, domain,
            r.get('acceptance_date',''), r.get('type_si',''), r.get('unit',''),
            r.get('min',''), r.get('max',''), r.get('accuracy_class',''),
            r.get('serial_number',''), r.get('gr_number',''), r.get('year',''),
            r.get('mp',''), r.get('stamp',''), r.get('mpi',''),
            r.get('customer',''), r.get('party',''), r.get('note',''),
            r.get('protocol_number',''), r.get('verification_date',''),
            r.get('valid_until',''), r.get('standards',''), r.get('gr_si',''),
            r.get('si_number',''), r.get('fgis_arshin',''), r.get('verifier',''),
            r.get('rejection_reason',''), r.get('temperature',''),
            r.get('pressure',''), r.get('humidity',''), r.get('checked',''),
            r.get('__band_color',''),
        ))
        inserted += 1
    return inserted

n = import_journal(MAN_JSON, 'manometers')
print(f'Manometers: {n} rows')
n = import_journal(THERMO_JSON, 'thermometers')
print(f'Thermometers: {n} rows')

# --- Заказы ---
for row in src.execute('SELECT * FROM order_entries'):
    cols = [d[0] for d in src.execute('SELECT * FROM order_entries LIMIT 1').description]
    d = dict(zip(cols, row))
    dst.execute("""
        INSERT OR IGNORE INTO orders
        (id, accept_date, customer, quantity, contact, result, issue_date,
         note, customer_features, accounting_in, accounting_out, arshin, fsa, locked)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (d['id'], d['accept_date'], d['customer'], d['quantity'], d['contact'],
          d['result'], d['issue_date'], d['note'], d['customer_features'],
          int(d['accounting_in']), int(d['accounting_out']),
          int(d['arshin']), int(d['fsa']), int(d['locked'])))
print(f"Orders: {dst.execute('SELECT COUNT(*) FROM orders').fetchone()[0]}")

# --- Справочники ---
def copy_table(src_table, dst_table, col_map):
    rows = src.execute(f'SELECT * FROM {src_table}').fetchall()
    if not rows: return 0
    cols_src = [d[0] for d in src.execute(f'SELECT * FROM {src_table} LIMIT 1').description]
    for row in rows:
        d = dict(zip(cols_src, row))
        vals = [str(d.get(c, '') or '') for c in col_map]
        placeholders = ','.join(['?']*len(col_map))
        dst_cols = ','.join(col_map)
        dst.execute(f'INSERT OR IGNORE INTO {dst_table} ({dst_cols}) VALUES ({placeholders})', vals)
    return len(rows)

print(f"Customers: {copy_table('customers','customers',['id','name','features'])}")
print(f"Registers: {copy_table('registers','registers',['id','number','domain','description_types','description_makers','description_notes','note'])}")
print(f"Type-registers: {copy_table('type_registers','type_registers',['id','type_id','register_id'])}")
print(f"Equipment: {copy_table('equipment','equipment',['id','name','serial_number','gosreestr_number','description','registration_number','disabled','is_etalon','range_min','range_max','unit','accuracy','kind','domain'])}")
print(f"Equipment deps: {copy_table('equipment_deps','equipment_deps',['id','equipment_id','dep_id','cond_field','cond_op','cond_value','cond_unit'])}")
print(f"Method equipment: {copy_table('method_equipment','method_equipment',['id','method_id','equipment_id','purpose'])}")
print(f"Measurement points: {copy_table('measurement_points','measurement_points',['id','domain','method_id','unit','min_value','max_value','point1','point2','point3','point4','point5'])}")
print(f"Max values: {copy_table('max_values','max_values',['id','domain','unit','value'])}")
print(f"Method ranges: {copy_table('method_ranges','method_ranges',['id','domain','method_id','npi','vpi','ndi','vdi','accuracy_errors'])}")
print(f"Rejection reasons: {copy_table('rejection_reasons','rejection_reasons',['id','method_id','name'])}")

# Types — специальная обработка (units хранится как JSON-массив)
for row in src.execute('SELECT * FROM types'):
    cols = [d[0] for d in src.execute('SELECT * FROM types LIMIT 1').description]
    d = dict(zip(cols, row))
    units = d.get('units','') or ''
    dst.execute("""INSERT OR IGNORE INTO types
        (id,name,official_name,note,domain,units,is_electrocontact,is_thermomanometer)
        VALUES (?,?,?,?,?,?,?,?)""",
        (d['id'], d['name'], d.get('official_name',''), d.get('note',''),
         d.get('domain',''), units,
         int(d.get('is_electrocontact',0) or 0),
         int(d.get('is_thermomanometer',0) or 0)))
print(f"Types: {dst.execute('SELECT COUNT(*) FROM types').fetchone()[0]}")

# Verification methods
for row in src.execute('SELECT * FROM verification_methods'):
    cols = [d[0] for d in src.execute('SELECT * FROM verification_methods LIMIT 1').description]
    d = dict(zip(cols, row))
    dst.execute("""INSERT OR IGNORE INTO verification_methods
        (id,name,full_name,domain,inspection_desc,testing_desc,accuracy_desc,
         variation_desc,decision_basis,sign_direction,uses_zero_npi,
         thermo_accuracy_classes,thermo_error_formula)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)""",
        (d['id'], d['name'], d.get('full_name',''), d.get('domain',''),
         d.get('inspection_desc',''), d.get('testing_desc',''),
         d.get('accuracy_desc',''), d.get('variation_desc',''),
         d.get('decision_basis',''), d.get('sign_direction',''),
         int(d.get('uses_zero_npi',0) or 0),
         d.get('thermo_accuracy_classes',''),
         int(d.get('thermo_error_formula',0) or 0)))
print(f"Verification methods: {dst.execute('SELECT COUNT(*) FROM verification_methods').fetchone()[0]}")

# Verifications
for row in src.execute('SELECT * FROM verifications'):
    cols = [d[0] for d in src.execute('SELECT * FROM verifications LIMIT 1').description]
    d = dict(zip(cols, row))
    dst.execute("""INSERT OR IGNORE INTO verifications
        (id,register_id,accuracy_classes,from_date,to_date,mpi,mp)
        VALUES (?,?,?,?,?,?,?)""",
        (d['id'], d['register_id'], d.get('accuracy_classes',''),
         d.get('from_date',''), d.get('to_date',''),
         d.get('mpi',''), d.get('mp','')))
print(f"Verifications: {dst.execute('SELECT COUNT(*) FROM verifications').fetchone()[0]}")

dst.commit()
src.close()
dst.close()
print('\nМиграция завершена.')
