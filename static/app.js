'use strict';

/* ============================================================
   SVG ICONS (lucide)
   ============================================================ */
const ICONS = {
  plus:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  table2:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,
  lock:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  lockSm:  `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:rgba(0,113,227,.7)"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  undo:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  redo:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,
  moon:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`,
  filter:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5h20"/><path d="M6 12h12"/><path d="M9 19h6"/></svg>`,
  trash:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  journal: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
  search:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg>`,
  palette: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  excel:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m8 13 2 4 2-4 2 4 2-4"/></svg>`,
  file:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  upload:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  download:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
};

/* ============================================================
   API
   ============================================================ */
const API = {
  async get(url) { const r=await fetch(url); if(!r.ok) throw new Error(await r.text()); return r.json(); },
  async post(url,d) { const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}); if(!r.ok) throw new Error(await r.text()); return r.json(); },
  async patch(url,d) { const r=await fetch(url,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}); if(!r.ok) throw new Error(await r.text()); return r.json(); },
  async del(url) { const r=await fetch(url,{method:'DELETE'}); if(!r.ok&&r.status!==204) throw new Error(await r.text()); },
};

/* ============================================================
   STATE
   ============================================================ */
let S = {
  tab: 'orders',
  orders: [], journalM: [], journalT: [],
  fo: { from:0, accept_date:'', customer:'', quantity:'', contact:'', result:'', issue_date:'', note:'', customer_features:'', accounting_in:'', accounting_out:'', arshin:'', fsa:'', locked:'' },
  fj: {},
  jSearch: '',
  jFrom: 0,
  jFromOpen: false,
  sortCol: null, sortDir: 1,
  modal: null,
  selectedRows: new Set(),
  _clipboard: null,
  vsTop: 0,
};

const ROW_HEIGHT = 24;
const VS_BUFFER = 20;

/* ============================================================
   UTILS
   ============================================================ */
const esc = s => String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const deb = (fn,ms) => { let t; return (...a) => { clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; };

const NAMED_COLORS = ['green','yellow','red','blue','violet'];
const HEX_COLORS = ['#dff5df','#fff4bf','#ffe3ec','#dff0ff','#ece7ff','#edf0f3'];

function bandClass(c) {
  if (!c) return '';
  const v = String(c).toLowerCase().trim();
  if (v==='green'  || v==='#dff5df') return 'band-green';
  if (v==='yellow' || v==='#fff4bf') return 'band-yellow';
  if (v==='red'    || v==='#ffe3ec') return 'band-red';
  if (v==='blue'   || v==='#dff0ff') return 'band-blue';
  if (v==='violet' || v==='#ece7ff') return 'band-violet';
  if (v==='#edf0f3') return 'band-gray';
  return 'band-custom';
}

function bandInlineStyle(c) {
  if (!c) return '';
  const v = String(c).toLowerCase().trim();
  if (NAMED_COLORS.includes(v) || HEX_COLORS.includes(v)) return '';
  return ` style="background:${c}"`;
}

function orderRowClass(o) {
  if (o.locked) return 'band-locked';
  if (o.band_color) {
    const bc = bandClass(o.band_color);
    if (bc !== 'band-custom') return bc;
  }
  if (o.issue_date && o.issue_date.trim()) return 'row-order-done';
  if (o.result && o.result.trim()) return 'row-order-result';
  return '';
}

// Обязательные поля журнала (по source36 columns.ts: required: true)
const J_REQUIRED = ['type_si','unit','min','max','accuracy_class','si_number','gr_number','mp'];

function journalRowClass(row, n) {
  if (row.locked) return 'band-locked';
  if (row.band_color) {
    const bc = bandClass(row.band_color);
    if (bc !== 'band-custom') return bc;
  }
  // stamp=И-ГШР → красный фон (bg-error/6 как в source36)
  if (row.stamp === 'И-ГШР') return 'row-rejected';
  if (n % 2 === 1) return 'row-odd';
  return '';
}

// Определяет нужна ли подсветка ячейки
function journalCellClass(row, colKey) {
  const isRejected = row.stamp === 'И-ГШР';
  // rejection_reason: если не И-ГШР → затемнить
  if (colKey === 'rejection_reason') {
    if (!isRejected) return 'cell-rej-disabled';
    if (!row[colKey] || !String(row[colKey]).trim()) return 'cell-rej-attention';
    return '';
  }
  // Обязательные поля: если строка «с данными» и поле пусто → жёлтый
  if (J_REQUIRED.includes(colKey)) {
    const hasData = J_REQUIRED.some(k => row[k] && String(row[k]).trim()) ||
                    (row.verification_date && String(row.verification_date).trim()) ||
                    (row.stamp && String(row.stamp).trim());
    if (hasData && (!row[colKey] || !String(row[colKey]).trim())) return 'cell-missing';
  }
  return '';
}

/* ============================================================
   ORDERS — columns
   ============================================================ */
const O_TEXT_COLS = [
  { key:'accept_date',  mono:true },
  { key:'customer' },
  { key:'quantity' },
  { key:'contact' },
  { key:'result' },
  { key:'issue_date',   mono:true },
  { key:'note' },
];
const O_CHK = ['accounting_in','accounting_out','arshin','fsa','locked'];

function filteredOrders() {
  const f = S.fo;
  let list = S.orders;
  if (f.from > 1) list = list.slice(f.from - 1);
  O_TEXT_COLS.forEach(c => {
    const q = (f[c.key]||'').toLowerCase();
    if (q) list = list.filter(o => (o[c.key]||'').toLowerCase().includes(q));
  });
  if ((f.customer_features||'').trim()) list = list.filter(o => (o.customer_features||'').toLowerCase().includes(f.customer_features.toLowerCase()));
  O_CHK.forEach(k => {
    if (f[k]==='yes') list = list.filter(o => o[k]);
    if (f[k]==='no')  list = list.filter(o => !o[k]);
  });
  if (S.sortCol && S.tab==='orders') {
    const col=S.sortCol, dir=S.sortDir;
    list=[...list].sort((a,b)=>{ const av=a[col]||'',bv=b[col]||''; return av<bv?-dir:av>bv?dir:0; });
  }
  return list;
}

/* ============================================================
   JOURNAL — columns (точный порядок и ширины из 4445)
   ============================================================ */
const J_COLS = [
  { key:'acceptance_date',   label:'Дата приемки',           cls:'jcol-acc',   mono:true },
  { key:'type_si',           label:'ТИП СИ',                 cls:'jcol-type' },
  { key:'unit',              label:'ед',                     cls:'jcol-unit',   center:true },
  { key:'min',               label:'мин',                    cls:'jcol-min',    center:true },
  { key:'max',               label:'макс',                   cls:'jcol-max',    center:true },
  { key:'accuracy_class',    label:'кт',                     cls:'jcol-kl',     center:true },
  { key:'si_number',         label:'номер СИ',               cls:'jcol-sn' },
  { key:'gr_number',         label:'Г.р. №',                 cls:'jcol-gr' },
  { key:'year',              label:'Год',                    cls:'jcol-yr',     center:true },
  { key:'mp',                label:'МП',                     cls:'jcol-mp' },
  { key:'stamp',             label:'КЛЕЙМО',                 cls:'jcol-st',     center:true },
  { key:'mpi',               label:'МПИ',                    cls:'jcol-mpi',    center:true },
  { key:'customer',          label:'Наименование заказчика', cls:'jcol-cust' },
  { key:'party',             label:'Партия',                 cls:'jcol-par' },
  { key:'note',              label:'Примечание',             cls:'jcol-note' },
  { key:'protocol_number',   label:'№ протокола',            cls:'jcol-prot' },
  { key:'verification_date', label:'Поверен',                cls:'jcol-verd',   center:true },
  { key:'valid_until',       label:'Годен до',               cls:'jcol-till',   center:true },
  { key:'standards',         label:'ЭТАЛОНЫ',                cls:'jcol-std' },
  { key:'gr_si',             label:'ГР СИ',                  cls:'jcol-grsi' },
  { key:'serial_number',     label:'№ СИ',                   cls:'jcol-sino' },
  { key:'fgis_arshin',       label:'СВ-ВО ФГИС АРШИН',      cls:'jcol-arsh' },
  { key:'verifier',          label:'ПОВЕРИТЕЛЬ (ФИО)',        cls:'jcol-who' },
  { key:'rejection_reason',  label:'ПРИЧИНА НЕПРИГОДНОСТИ',  cls:'jcol-rej' },
  { key:'temperature',       label:'Температура',            cls:'jcol-temp',   center:true },
  { key:'pressure',          label:'Атм. давление',          cls:'jcol-pres',   center:true },
  { key:'humidity',          label:'Отн. влажность',         cls:'jcol-hum',    center:true },
  { key:'checked',           label:'Проверка',               cls:'jcol-chk' },
];

function filteredJournal(rows) {
  let list = rows;
  const q = S.jSearch.toLowerCase();
  if (q) list = list.filter(r => J_COLS.some(c => (r[c.key]||'').toLowerCase().includes(q)));
  J_COLS.forEach(c => {
    const fq = (S.fj[c.key]||'').toLowerCase();
    if (fq) list = list.filter(r => (r[c.key]||'').toLowerCase().includes(fq));
  });
  if (S.jFrom > 1) list = list.slice(S.jFrom - 1);
  if (S.sortCol && S.tab !== 'orders') {
    const col=S.sortCol, dir=S.sortDir;
    list=[...list].sort((a,b)=>{ const av=a[col]||'',bv=b[col]||''; return av<bv?-dir:av>bv?dir:0; });
  }
  return list;
}

/* ============================================================
   RENDER
   ============================================================ */
function render() {
  document.getElementById('app').innerHTML = buildPage();
  bindEvents();
}

function buildPage() {
  return renderTopBar() + renderContent() + (S.modal ? renderModal() : '');
}

/* ---- TOP BAR ---- */
function renderTopBar() {
  if (S.tab === 'orders') return renderOrdersBar();
  if (S.tab === 'admin') return renderAdminBar();
  return renderJournalBar();
}

function renderOrdersBar() {
  const shown = filteredOrders().length, total = S.orders.length;
  return `
<div class="glass-bar">
  <div class="bar-left">
    <div class="tab-group">
      <span class="tab-item active">${ICONS.table2} ЗАКАЗЫ</span>
      <button class="tab-item" data-tab="journal-m">${ICONS.journal} Журнал манометры</button>
      <button class="tab-item" data-tab="journal-t">Журнал термометры</button>
      <button class="tab-item" data-tab="admin">Справочники</button>
    </div>
    <button class="btn-primary" id="btn-new-order">${ICONS.plus} Заказ</button>
    <button class="btn-border" id="btn-customers">Заказчики</button>
    <button class="btn-border" id="btn-lock-on">${ICONS.lock} Блокировать</button>
    <button class="btn-border" id="btn-lock-off">${ICONS.unlock} Снять</button>
    <div style="display:flex;align-items:center;gap:2px">
      <button class="btn-icon" id="btn-undo" title="Отменить" disabled>${ICONS.undo}</button>
      <button class="btn-icon" id="btn-redo" title="Повторить" disabled>${ICONS.redo}</button>
    </div>
    <span class="count-text">Показано ${shown}, заполнено ${total}</span>
  </div>
  <button class="btn-theme" title="Переключить тему">${ICONS.moon}</button>
</div>`;
}

function renderJournalBar() {
  const isM = S.tab === 'journal-m';
  const domain = isM ? 'manometers' : 'thermometers';
  const rows = isM ? S.journalM : S.journalT;
  const list = filteredJournal(rows);
  const filled = rows.filter(r => r.type_si || r.acceptance_date || r.si_number).length;
  const selCount = S.selectedRows.size;
  const tabLabel = isM ? 'Журнал манометры' : 'Журнал термометры';
  const tabOther = isM ? 'journal-t' : 'journal-m';
  const tabLabelOther = isM ? 'Журнал термометры' : 'Журнал манометры';

  return `
<div class="glass-bar">
  <div class="bar-left">
    <div class="tab-group">
      <button class="tab-item" data-tab="orders">ЗАКАЗЫ</button>
      <span class="tab-item active">${ICONS.journal} ${tabLabel}</span>
      <button class="tab-item" data-tab="${tabOther}">${tabLabelOther}</button>
      <button class="tab-item" data-tab="admin">Справочники</button>
    </div>
    <button class="btn-border" id="btn-new-row" data-domain="${domain}">${ICONS.plus} Строка</button>
    <button class="btn-border" id="btn-blok">${ICONS.lock} Блокировка</button>
    <div style="display:flex;align-items:center;gap:2px">
      <button class="btn-icon" disabled>${ICONS.undo}</button>
      <button class="btn-icon" disabled>${ICONS.redo}</button>
    </div>
  </div>
  <button class="btn-theme" title="Переключить тему">${ICONS.moon}</button>
</div>
<div class="glass-bar2">
  <div class="search-wrap">
    ${ICONS.search}
    <input type="text" id="j-search" placeholder="Поиск" value="${esc(S.jSearch)}">
  </div>
  <span class="count-text">Заполненных строк: ${filled}</span>
  <span class="count-text">Выделено строк: ${selCount}</span>
  <span class="count-text">Показано: ${list.length}</span>
  <button class="btn-bar2" id="btn-okrasit">${ICONS.palette} Окрасить</button>
  <button class="btn-bar2" id="btn-arshin">${ICONS.upload} Выгрузка в аршин</button>
  <button class="btn-bar2" id="btn-load-results">${ICONS.download} Загрузка результатов</button>
  <button class="btn-bar2" id="btn-reestr">${ICONS.file} Выгрузить реестр</button>
  <button class="btn-bar2" id="btn-jpoverki">${ICONS.file} Выгрузить журнал поверки</button>
  <button class="btn-bar2" id="btn-excel">${ICONS.excel} Excel</button>
  <button class="btn-bar2" id="btn-protocol">${ICONS.file} Протокол</button>
</div>`;
}

/* ---- CONTENT ---- */
function renderContent() {
  if (S.tab === 'orders') return renderOrders();
  if (S.tab === 'admin') return renderAdmin();
  const isM = S.tab === 'journal-m';
  return renderJournal(isM ? S.journalM : S.journalT, isM ? 'manometers' : 'thermometers');
}

/* ============================================================
   ORDERS TABLE
   ============================================================ */
const O_TH = [
  ['col-num','№'], ['col-date','Дата приема СИ'], ['col-cust','Заказчик'],
  ['col-qty','Количество СИ'], ['col-cont','Контактное лицо / телефон'],
  ['col-res','Результат поверки'], ['col-idate','Дата выдачи СИ'],
  ['col-note','Примечание'], ['col-feat','Особенности'],
  ['col-chk','Бух. прием'], ['col-chk','Бух. итог'], ['col-chk','Аршин'],
  ['col-chk','ФСА'], ['col-chk','Блок'], ['col-del',''],
];
const O_SORT_KEYS = [null,'accept_date','customer','quantity','contact','result','issue_date','note',null,null,null,null,null,null,null];

function renderOrders() {
  const list = filteredOrders();
  const f = S.fo;
  return `
<div class="content">
<table>
<thead>
  <tr>
    ${O_TH.map(([cls,lbl],i)=>{
      const k = O_SORT_KEYS[i];
      const ic = k&&S.sortCol===k ? (S.sortDir>0?' ▲':' ▼') : '';
      return `<th class="${cls}"${k?` data-sort="${k}" style="cursor:pointer"`:''} >${esc(lbl)}${ic?`<span style="color:rgba(29,29,31,.35);font-size:9px">${ic}</span>`:''}</th>`;
    }).join('')}
  </tr>
  <tr class="filter-row">
    <th><input class="filter-input" type="number" min="1" id="filter-from" placeholder="с №" value="${f.from||''}"></th>
    ${O_TEXT_COLS.map(c=>`<th><input class="filter-input" type="text" data-fo="${c.key}" value="${esc(f[c.key]||'')}"></th>`).join('')}
    <th><input class="filter-input" type="text" data-fo="customer_features" value="${esc(f.customer_features||'')}"></th>
    ${O_CHK.map(k=>`<th><select class="filter-select" data-fo-chk="${k}">
      <option value="">Все</option>
      <option value="yes" ${f[k]==='yes'?'selected':''}>Да</option>
      <option value="no"  ${f[k]==='no' ?'selected':''}>Нет</option>
    </select></th>`).join('')}
    <th><button class="filter-reset" id="btn-reset-fo" title="Сбросить">${ICONS.filter}</button></th>
  </tr>
</thead>
<tbody>
  ${list.length
    ? list.map((o,i) => renderOrderRow(o, S.orders.indexOf(o)+1)).join('')
    : `<tr><td colspan="15" class="empty">Нет заказов</td></tr>`}
</tbody>
</table>
</div>`;
}

function renderOrderRow(o, num) {
  const isLocked = !!o.locked;
  const cls = orderRowClass(o);
  const sel = S.selectedRows.has(o.id) ? ' row-selected' : '';
  const dis = isLocked ? 'disabled' : '';
  // For custom band color, use inline style
  const customStyle = (o.band_color && bandClass(o.band_color) === 'band-custom') ? ` style="background:${o.band_color}"` : '';
  return `
<tr class="${cls}${sel}" data-oid="${esc(o.id)}" data-type="order"${customStyle}>
  <td class="td-num"><div class="num-cell">${num}${isLocked ? ICONS.lockSm : ''}</div></td>
  <td><textarea class="cell-ta mono" data-oid="${esc(o.id)}" data-field="accept_date" ${dis}>${esc(o.accept_date||'')}</textarea></td>
  <td><textarea class="cell-ta" data-oid="${esc(o.id)}" data-field="customer" ${dis}>${esc(o.customer||'')}</textarea></td>
  <td><textarea class="cell-ta" data-oid="${esc(o.id)}" data-field="quantity" ${dis}>${esc(o.quantity||'')}</textarea></td>
  <td><textarea class="cell-ta" data-oid="${esc(o.id)}" data-field="contact" ${dis}>${esc(o.contact||'')}</textarea></td>
  <td><textarea class="cell-ta" data-oid="${esc(o.id)}" data-field="result" ${dis}>${esc(o.result||'')}</textarea></td>
  <td><textarea class="cell-ta mono" data-oid="${esc(o.id)}" data-field="issue_date" ${dis}>${esc(o.issue_date||'')}</textarea></td>
  <td><textarea class="cell-ta" data-oid="${esc(o.id)}" data-field="note" ${dis}>${esc(o.note||'')}</textarea></td>
  <td class="td-feat">${esc(o.customer_features||'')}</td>
  ${O_CHK.map(k=>`<td class="td-center"><input type="checkbox" class="cell-chk" data-oid="${esc(o.id)}" data-field="${k}" ${o[k]?'checked':''} ${k!=='locked'&&isLocked?'disabled':''}></td>`).join('')}
  <td class="td-center"><button class="btn-del" data-del-order="${esc(o.id)}" ${dis}>${ICONS.trash}</button></td>
</tr>`;
}

/* ============================================================
   JOURNAL TABLE  (virtual-scroll)
   ============================================================ */
function jVirtualSlice(list) {
  const total = list.length;
  if (total === 0) return { startIdx: 0, endIdx: 0, topPad: 0, botPad: 0 };
  const contentH = window.innerHeight - 130;
  const visCount = Math.ceil(contentH / ROW_HEIGHT) + VS_BUFFER * 2;
  const startIdx = Math.max(0, Math.floor(S.vsTop / ROW_HEIGHT) - VS_BUFFER);
  const endIdx = Math.min(total, startIdx + visCount);
  const topPad = startIdx * ROW_HEIGHT;
  const botPad = Math.max(0, (total - endIdx)) * ROW_HEIGHT;
  return { startIdx, endIdx, topPad, botPad };
}

function buildJTbody(list) {
  const total = list.length;
  if (total === 0) return `<tr><td colspan="${J_COLS.length+2}" class="empty">Нет записей</td></tr>`;
  const { startIdx, endIdx, topPad, botPad } = jVirtualSlice(list);
  const ncols = J_COLS.length + 2;
  return (topPad > 0 ? `<tr class="vpad" style="height:${topPad}px"><td colspan="${ncols}"></td></tr>` : '') +
    list.slice(startIdx, endIdx).map((r,i) => renderJournalRow(r, startIdx+i+1)).join('') +
    (botPad > 0 ? `<tr class="vpad" style="height:${botPad}px"><td colspan="${ncols}"></td></tr>` : '');
}

function renderJournal(rows, domain) {
  const list = filteredJournal(rows);
  return `
<div class="content" id="journal-content">
<table>
<thead>
  <tr>
    <th class="jcol-num" style="position:relative">
      <div class="jfrom-wrap">
        <button class="num-hdr-btn" id="btn-jfrom">#</button>
        ${S.jFromOpen ? `
          <div class="jfrom-popup" id="jfrom-popup">
            <label>Строки с номера:</label>
            <div class="jfrom-row">
              <input type="number" min="1" id="jfrom-input" value="${S.jFrom||''}" placeholder="1">
              <button class="jfrom-ok" id="jfrom-ok">OK</button>
            </div>
            <button class="jfrom-reset" id="jfrom-reset">сбросить</button>
          </div>` : ''}
      </div>
    </th>
    ${J_COLS.map(c => {
      const ic = S.sortCol===c.key ? (S.sortDir>0?' ▲':' ▼') : '';
      return `<th class="${c.cls}" data-sort="${c.key}" style="cursor:pointer;${c.center?'text-align:center':''}">${esc(c.label)}${ic?`<span style="color:rgba(29,29,31,.35);font-size:9px">${ic}</span>`:''}</th>`;
    }).join('')}
    <th class="jcol-del"></th>
  </tr>
  <tr class="filter-row">
    <th></th>
    ${J_COLS.map(c=>`<th><input class="filter-input" type="text" data-fj="${c.key}" value="${esc(S.fj[c.key]||'')}"></th>`).join('')}
    <th><button class="filter-reset" id="btn-reset-fj">${ICONS.filter}</button></th>
  </tr>
</thead>
<tbody id="j-tbody">
  ${buildJTbody(list)}
</tbody>
</table>
</div>`;
}

function renderJournalRow(row, n) {
  const cls = journalRowClass(row, n);
  const sel = S.selectedRows.has(String(row.id)) ? ' row-selected' : '';
  const customStyle = (row.band_color && bandClass(row.band_color) === 'band-custom') ? ` style="background:${row.band_color}"` : '';
  const isLocked = !!row.locked;
  return `
<tr class="${cls}${sel}" data-jid="${row.id}" data-type="journal"${customStyle}>
  <td class="td-num"><div class="num-cell">${n}${isLocked ? ICONS.lockSm : ''}</div></td>
  ${J_COLS.map(c=>{
    const cellCls = journalCellClass(row, c.key);
    return `<td${cellCls?' class="'+cellCls+'"':''}><input type="text" class="cell-ta${c.mono||c.center?' mono':''}" data-jid="${row.id}" data-field="${c.key}"${isLocked?' disabled':''} value="${esc(row[c.key]||'')}"></td>`;
  }).join('')}
  <td class="td-center"><button class="btn-del" data-del-row="${row.id}"${isLocked?' disabled':''}>${ICONS.trash}</button></td>
</tr>`;
}

function refreshJTbody() {
  const tbody = document.getElementById('j-tbody');
  if (!tbody) return;
  const isM = S.tab === 'journal-m';
  const rows = isM ? S.journalM : S.journalT;
  const list = filteredJournal(rows);
  tbody.innerHTML = buildJTbody(list);
}

/* ============================================================
   CONTEXT MENU
   ============================================================ */
let ctxMenu = null;

function showCtxMenu(x, y, rowEl) {
  hideCtxMenu();
  const isOrder = rowEl.dataset.type === 'order';
  const rid = isOrder ? rowEl.dataset.oid : rowEl.dataset.jid;
  const arr = isOrder ? S.orders : (S.tab==='journal-m' ? S.journalM : S.journalT);
  const row = arr.find(r => String(r.id) === String(rid));
  if (!row) return;

  // Select row if not already selected
  if (!S.selectedRows.has(String(rid))) {
    S.selectedRows.clear();
    S.selectedRows.add(String(rid));
  }

  const idx = arr.indexOf(row);
  const canMoveUp = idx > 0;
  const canMoveDown = idx < arr.length - 1;
  const isLocked = !!row.locked;
  const lockLabel = isLocked ? 'Разблокировать строку' : 'Заблокировать строку';
  const canPaste = !!S._clipboard;

  const div = document.createElement('div');
  div.className = 'ctx-menu';
  div.innerHTML = `
    <button class="ctx-item" data-ctx="copy">Копировать<span class="ctx-shortcut">Ctrl+C</span></button>
    <button class="ctx-item${canPaste?'':' disabled'}" data-ctx="paste">Вставить<span class="ctx-shortcut">Ctrl+V</span></button>
    <button class="ctx-item" data-ctx="dup">Дублировать строку</button>
    <button class="ctx-item" data-ctx="dup-many">Дублировать строку на …</button>
    <button class="ctx-item disabled" data-ctx="dup-cell">Дублировать ячейку на …</button>
    <div class="ctx-sep"></div>
    <button class="ctx-item${canMoveUp?'':' disabled'}" data-ctx="move-up">Переместить вверх</button>
    <button class="ctx-item${canMoveDown?'':' disabled'}" data-ctx="move-down">Переместить вниз</button>
    <button class="ctx-item" data-ctx="lock">${lockLabel}<span class="ctx-shortcut">Ctrl+L</span></button>
    <div class="ctx-sep"></div>
    <button class="ctx-item danger" data-ctx="delete">Удалить<span class="ctx-shortcut">Del</span></button>
  `;
  document.body.appendChild(div);
  ctxMenu = div;

  // Position (keep inside viewport)
  requestAnimationFrame(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const rect = div.getBoundingClientRect();
    let lx = x, ly = y;
    if (lx + rect.width > vw) lx = vw - rect.width - 8;
    if (ly + rect.height > vh) ly = vh - rect.height - 8;
    if (lx < 4) lx = 4;
    if (ly < 4) ly = 4;
    div.style.left = lx + 'px';
    div.style.top = ly + 'px';
  });

  div.addEventListener('click', async e => {
    const btn = e.target.closest('[data-ctx]');
    if (!btn || btn.classList.contains('disabled')) return;
    hideCtxMenu();
    await handleCtxAction(btn.dataset.ctx, isOrder, rid, arr, row, idx);
  });
}

function hideCtxMenu() {
  if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; }
}

async function handleCtxAction(action, isOrder, rid, arr, row, idx) {
  if (action === 'copy') {
    S._clipboard = JSON.parse(JSON.stringify(row));
    return;
  }
  if (action === 'paste') {
    if (!S._clipboard) return;
    await pasteRow(isOrder, arr, idx);
    return;
  }
  if (action === 'dup') {
    await duplicateRows(isOrder, arr, idx, 1);
    return;
  }
  if (action === 'dup-many') {
    const n = parseInt(window.prompt('Количество копий:', '1'));
    if (!n || n < 1 || n > 1000) return;
    await duplicateRows(isOrder, arr, idx, n);
    return;
  }
  if (action === 'move-up' && idx > 0) {
    await swapRows(isOrder, arr, idx, idx-1);
    return;
  }
  if (action === 'move-down' && idx < arr.length-1) {
    await swapRows(isOrder, arr, idx, idx+1);
    return;
  }
  if (action === 'lock') {
    await toggleLock(isOrder, rid, row);
    return;
  }
  if (action === 'delete') {
    await deleteRowAction(isOrder, rid, row);
    return;
  }
}

async function pasteRow(isOrder, arr, idx) {
  const src = S._clipboard;
  if (!src) return;
  const copy = {...src};
  delete copy.id; delete copy.row_key; delete copy.sort_order;
  let newRow;
  if (isOrder) {
    newRow = await API.post('/api/orders', copy);
    S.orders.splice(idx + 1, 0, newRow);
  } else {
    const domain = S.tab === 'journal-m' ? 'manometers' : 'thermometers';
    newRow = await API.post(`/api/journal?domain=${domain}`, copy);
    const jArr = S.tab === 'journal-m' ? S.journalM : S.journalT;
    jArr.splice(idx + 1, 0, newRow);
  }
  render();
}

async function duplicateRows(isOrder, arr, idx, count) {
  const src = arr[idx];
  for (let i = 0; i < count; i++) {
    const copy = {...src};
    delete copy.id; delete copy.row_key; delete copy.sort_order;
    let newRow;
    if (isOrder) {
      newRow = await API.post('/api/orders', copy);
      S.orders.splice(idx + 1 + i, 0, newRow);
    } else {
      const domain = S.tab === 'journal-m' ? 'manometers' : 'thermometers';
      newRow = await API.post(`/api/journal?domain=${domain}`, copy);
      const jArr = S.tab === 'journal-m' ? S.journalM : S.journalT;
      jArr.splice(idx + 1 + i, 0, newRow);
    }
  }
  render();
}

async function swapRows(isOrder, arr, idxA, idxB) {
  [arr[idxA], arr[idxB]] = [arr[idxB], arr[idxA]];
  render();
  const rowA = arr[idxA], rowB = arr[idxB];
  const soA = rowA.sort_order || rowA.id;
  const soB = rowB.sort_order || rowB.id;
  rowA.sort_order = soB; rowB.sort_order = soA;
  if (isOrder) {
    await Promise.all([
      API.patch(`/api/orders/${rowA.id}`, {sort_order: soB}),
      API.patch(`/api/orders/${rowB.id}`, {sort_order: soA}),
    ]);
  } else {
    await Promise.all([
      API.patch(`/api/journal/${rowA.id}`, {sort_order: soB}),
      API.patch(`/api/journal/${rowB.id}`, {sort_order: soA}),
    ]);
  }
}

async function toggleLock(isOrder, rid, row) {
  const newVal = row.locked ? 0 : 1;
  row.locked = newVal;
  if (isOrder) {
    await API.patch(`/api/orders/${rid}`, {locked: newVal});
  } else {
    await API.patch(`/api/journal/${rid}`, {locked: newVal ? '1' : ''});
  }
  render();
}

async function deleteRowAction(isOrder, rid, row) {
  if (!confirm('Удалить?')) return;
  if (isOrder) {
    await API.del(`/api/orders/${rid}`);
    S.orders = S.orders.filter(o => String(o.id) !== String(rid));
  } else {
    const jid = parseInt(rid);
    await API.del(`/api/journal/${jid}`);
    S.journalM = S.journalM.filter(r => r.id !== jid);
    S.journalT = S.journalT.filter(r => r.id !== jid);
  }
  S.selectedRows.delete(String(rid));
  render();
}

/* ============================================================
   ОКРАСИТЬ — prompt-based like original
   ============================================================ */
function doOkrasit() {
  const selArr = [...S.selectedRows];
  if (selArr.length === 0) { alert('Выберите строки'); return; }

  const isJ = S.tab !== 'orders';
  const arr = isJ ? (S.tab==='journal-m' ? S.journalM : S.journalT) : S.orders;

  const dispList = isJ ? filteredJournal(arr) : filteredOrders();
  const indices = selArr.map(rid => dispList.findIndex(r => String(r.id) === String(rid)) + 1).filter(i => i > 0);
  const minIdx = indices.length ? Math.min(...indices) : 1;
  const maxIdx = indices.length ? Math.max(...indices) : minIdx;

  const fromStr = window.prompt('Окрасить строки с', String(minIdx));
  if (fromStr === null) return;
  const toStr = window.prompt('По строку', String(maxIdx));
  if (toStr === null) return;

  const colors = [
    {name:'желтый',     value:'#fff4bf'},
    {name:'зеленый',    value:'#dff5df'},
    {name:'голубой',    value:'#dff0ff'},
    {name:'розовый',    value:'#ffe3ec'},
    {name:'лавандовый', value:'#ece7ff'},
    {name:'серый',      value:'#edf0f3'},
    {name:'очистить',   value:''},
  ];
  const colorPrompt = `Цвет: ${colors.map((c,i) => `${i+1} - ${c.name}`).join(', ')}`;
  const colorStr = window.prompt(colorPrompt, '1');
  if (colorStr === null) return;

  const from = Math.max(1, parseInt(fromStr)||1);
  const to = Math.max(from, parseInt(toStr)||from);
  const colorIdx = Math.max(0, Math.min(colors.length-1, (parseInt(colorStr)||1)-1));
  const color = colors[colorIdx];

  const tasks = [];
  for (let i = from-1; i <= to-1 && i < dispList.length; i++) {
    const row = dispList[i];
    row.band_color = color.value;
    if (isJ) {
      tasks.push(API.patch(`/api/journal/${row.id}`, {band_color: color.value}));
    } else {
      tasks.push(API.patch(`/api/orders/${row.id}`, {band_color: color.value}));
    }
  }
  Promise.all(tasks).then(() => render());
  render();
}

/* ============================================================
   MODALS
   ============================================================ */
function renderModal() {
  const m = S.modal;
  if (m.type==='order') return renderOrderModal(m.data);
  if (m.type==='protocol') return renderProtocolModal(m.data);
  return '';
}

function renderOrderModal(d) {
  d = d||{};
  return `
<div class="modal-bg" id="modal-bg">
  <div class="modal">
    <h2>${d.id?'Редактировать заказ':'Новый заказ'}</h2>
    <div class="form-grid">
      <div class="field"><label>Дата приема СИ</label><input name="accept_date" value="${esc(d.accept_date||'')}"></div>
      <div class="field"><label>Дата выдачи СИ</label><input name="issue_date" value="${esc(d.issue_date||'')}"></div>
      <div class="field span2"><label>Заказчик</label><input name="customer" value="${esc(d.customer||'')}"></div>
      <div class="field span2"><label>Количество СИ</label><input name="quantity" value="${esc(d.quantity||'')}"></div>
      <div class="field span2"><label>Контактное лицо / телефон</label><input name="contact" value="${esc(d.contact||'')}"></div>
      <div class="field span2"><label>Результат поверки</label><textarea name="result">${esc(d.result||'')}</textarea></div>
      <div class="field span2"><label>Примечание</label><textarea name="note">${esc(d.note||'')}</textarea></div>
      <div class="field span2"><label>Особенности заказчика</label><textarea name="customer_features">${esc(d.customer_features||'')}</textarea></div>
      <div class="field span2">
        <label>Отметки</label>
        <div class="checkrow">
          <label><input type="checkbox" name="accounting_in"  ${d.accounting_in ?'checked':''}> Бух. приём</label>
          <label><input type="checkbox" name="accounting_out" ${d.accounting_out?'checked':''}> Бух. итог</label>
          <label><input type="checkbox" name="arshin"         ${d.arshin        ?'checked':''}> Аршин</label>
          <label><input type="checkbox" name="fsa"            ${d.fsa           ?'checked':''}> ФСА</label>
          <label><input type="checkbox" name="locked"         ${d.locked        ?'checked':''}> Блокировать</label>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-border" id="modal-cancel">Отмена</button>
      ${d.id?`<button class="btn-del" style="height:36px;padding:0 12px" id="modal-del" data-id="${esc(d.id)}">Удалить</button>`:''}
      <button class="btn-primary" id="modal-save" data-id="${esc(d.id||'')}">Сохранить</button>
    </div>
  </div>
</div>`;
}

function renderProtocolModal(d) {
  d = d || {};
  const rows = S.tab === 'journal-m' ? S.journalM : S.journalT;
  const list = filteredJournal(rows);
  const total = list.length;
  const lastRow = rows.filter(r => r.temperature || r.humidity || r.pressure).pop() || {};
  const defTemp = d.temperature || lastRow.temperature || '20';
  const defHum = d.humidity || lastRow.humidity || '65';
  const defPres = d.pressure || lastRow.pressure || '101.3';
  const defDate = d.date || new Date().toISOString().slice(0,10);
  const selFrom = d.from || (S.selectedRows.size ? Math.min(...[...S.selectedRows].map(id => {
    const i = list.findIndex(r => String(r.id) === String(id)); return i >= 0 ? i+1 : 9999;
  })) : 1);
  const selTo = d.to || (S.selectedRows.size ? Math.max(...[...S.selectedRows].map(id => {
    const i = list.findIndex(r => String(r.id) === String(id)); return i >= 0 ? i+1 : 0;
  })) : total);

  return `
<div class="modal-bg" id="modal-bg">
  <div class="modal" style="max-width:520px">
    <h2>Протокол поверки</h2>
    <div class="form-grid">
      <div class="field"><label>Строки с №</label><input name="proto_from" type="number" min="1" value="${selFrom}"></div>
      <div class="field"><label>по №</label><input name="proto_to" type="number" min="1" value="${selTo||total}"></div>
      <div class="field"><label>Дата поверки</label><input name="proto_date" type="date" value="${defDate}"></div>
      <div class="field"><label>№ протокола</label><input name="proto_number" value="${esc(d.number||'')}"></div>
      <div class="field span2"><label>Поверитель (ФИО)</label><input name="proto_verifier" value="${esc(d.verifier||'')}"></div>
      <div class="field"><label>Температура, °С</label><input name="proto_temp" type="number" step="0.1" value="${defTemp}"></div>
      <div class="field"><label>Влажность, %</label><input name="proto_hum" type="number" step="1" value="${defHum}"></div>
      <div class="field"><label>Давление, кПа</label><input name="proto_pres" type="number" step="0.1" value="${defPres}"></div>
      <div class="field span2">
        <label><input type="checkbox" name="proto_skip_readings"> Не генерировать показания (только структура)</label>
      </div>
    </div>
    <div id="proto-status" style="min-height:20px;font-size:12px;color:rgba(29,29,31,.6);margin:4px 0"></div>
    <div class="modal-actions">
      <button class="btn-border" id="modal-cancel">Отмена</button>
      <button class="btn-primary" id="modal-proto-gen">Сформировать протокол</button>
    </div>
  </div>
</div>`;
}

/* ============================================================
   BIND EVENTS
   ============================================================ */
function bindEvents() {
  // --- tabs ---
  document.querySelectorAll('[data-tab]').forEach(el => el.addEventListener('click', async () => {
    const t = el.dataset.tab;
    S.tab=t; S.fj={}; S.jSearch=''; S.jFrom=0; S.jFromOpen=false; S.sortCol=null; S.selectedRows.clear();
    if (t==='admin') {
      ADM.tab='types'; ADM.sel=null; ADM.editing=null; ADM.search='';
      if (!ADM.items['types']) await admLoad('types');
      render();
      bindAdminEvents();
    } else {
      render();
    }
  }));

  // --- orders toolbar ---
  const bno = document.getElementById('btn-new-order');
  if (bno) bno.addEventListener('click', () => { S.modal={type:'order',data:null}; render(); });

  const blon = document.getElementById('btn-lock-on');
  if (blon) blon.addEventListener('click', async () => {
    for (const o of filteredOrders()) { o.locked=1; await API.patch(`/api/orders/${o.id}`,{locked:1}); }
    render();
  });
  const bloff = document.getElementById('btn-lock-off');
  if (bloff) bloff.addEventListener('click', async () => {
    for (const o of filteredOrders()) { o.locked=0; await API.patch(`/api/orders/${o.id}`,{locked:0}); }
    render();
  });

  // --- orders inline textarea ---
  document.querySelectorAll('textarea.cell-ta[data-oid]').forEach(ta => {
    ta.addEventListener('blur', async () => {
      const id=ta.dataset.oid, field=ta.dataset.field;
      const o=S.orders.find(o=>o.id===id);
      if (!o || o[field]===ta.value) return;
      o[field]=ta.value;
      await API.patch(`/api/orders/${id}`,{[field]:ta.value});
    });
  });

  // --- orders checkboxes ---
  document.querySelectorAll('.cell-chk[data-oid]').forEach(chk => chk.addEventListener('change', async () => {
    const id=chk.dataset.oid, field=chk.dataset.field;
    const o=S.orders.find(o=>o.id===id);
    if (!o) return;
    o[field]=chk.checked?1:0;
    await API.patch(`/api/orders/${id}`,{[field]:chk.checked?1:0});
    if (field==='locked') render();
  }));

  // --- orders delete ---
  document.querySelectorAll('[data-del-order]').forEach(el => el.addEventListener('click', async e => {
    e.stopPropagation();
    if (!confirm('Удалить заказ?')) return;
    const id=el.dataset.delOrder;
    await API.del(`/api/orders/${id}`);
    S.orders=S.orders.filter(o=>o.id!==id);
    render();
  }));

  // --- orders filters ---
  const ff = document.getElementById('filter-from');
  if (ff) ff.addEventListener('input', deb(e=>{ S.fo.from=parseInt(e.target.value)||0; render(); },300));
  document.querySelectorAll('[data-fo]').forEach(el => el.addEventListener('input', deb(()=>{ S.fo[el.dataset.fo]=el.value; render(); },300)));
  document.querySelectorAll('[data-fo-chk]').forEach(el => el.addEventListener('change', ()=>{ S.fo[el.dataset.foChk]=el.value; render(); }));
  const brf = document.getElementById('btn-reset-fo');
  if (brf) brf.addEventListener('click', () => {
    S.fo={from:0,accept_date:'',customer:'',quantity:'',contact:'',result:'',issue_date:'',note:'',customer_features:'',accounting_in:'',accounting_out:'',arshin:'',fsa:'',locked:''}; render();
  });

  // --- sort ---
  document.querySelectorAll('[data-sort]').forEach(el => el.addEventListener('click', () => {
    const col=el.dataset.sort;
    if (S.sortCol===col) S.sortDir*=-1; else { S.sortCol=col; S.sortDir=1; }
    render();
  }));

  // --- journal toolbar ---
  const bnr = document.getElementById('btn-new-row');
  if (bnr) bnr.addEventListener('click', async () => {
    const domain = bnr.dataset.domain || 'manometers';
    const r = await API.post(`/api/journal?domain=${domain}`,{});
    if (domain==='manometers') S.journalM.push(r); else S.journalT.push(r);
    render();
  });

  const js = document.getElementById('j-search');
  if (js) js.addEventListener('input', deb(()=>{ S.jSearch=js.value; render(); },250));

  // --- Protocol button ---
  const bProt = document.getElementById('btn-protocol');
  if (bProt) bProt.addEventListener('click', () => {
    if (S.tab === 'orders') return;
    S.modal = {type:'protocol', data:{}};
    render();
  });

  // --- Excel экспорт ---
  const bExcel = document.getElementById('btn-excel');
  if (bExcel) bExcel.addEventListener('click', () => doExcelExport());

  // --- Выгрузка в аршин ---
  const bArshin = document.getElementById('btn-arshin');
  if (bArshin) bArshin.addEventListener('click', () => doArshinExport());

  // --- Загрузка результатов ---
  const bLoad = document.getElementById('btn-load-results');
  if (bLoad) bLoad.addEventListener('click', () => doLoadArshinResults());

  // --- Выгрузить реестр ---
  const bReestr = document.getElementById('btn-reestr');
  if (bReestr) bReestr.addEventListener('click', () => doExportReestr());

  // --- Выгрузить журнал поверки ---
  const bJP = document.getElementById('btn-jpoverki');
  if (bJP) bJP.addEventListener('click', () => doExportJurnalPoverki());

  const brfj = document.getElementById('btn-reset-fj');
  if (brfj) brfj.addEventListener('click', ()=>{ S.fj={}; S.jSearch=''; S.jFrom=0; render(); });

  // --- Окрасить ---
  const bOkr = document.getElementById('btn-okrasit');
  if (bOkr) bOkr.addEventListener('click', () => doOkrasit());

  // --- jfrom popup ---
  const btnJfrom = document.getElementById('btn-jfrom');
  if (btnJfrom) btnJfrom.addEventListener('click', e => {
    e.stopPropagation();
    S.jFromOpen = !S.jFromOpen;
    render();
  });
  const jfromOk = document.getElementById('jfrom-ok');
  if (jfromOk) jfromOk.addEventListener('click', e => {
    e.stopPropagation();
    const inp = document.getElementById('jfrom-input');
    S.jFrom = parseInt(inp.value)||0;
    S.jFromOpen = false;
    render();
  });
  const jfromReset = document.getElementById('jfrom-reset');
  if (jfromReset) jfromReset.addEventListener('click', e => {
    e.stopPropagation();
    S.jFrom = 0;
    S.jFromOpen = false;
    render();
  });
  const jfromInput = document.getElementById('jfrom-input');
  if (jfromInput) {
    jfromInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); jfromOk && jfromOk.click(); }
    });
    jfromInput.addEventListener('click', e => e.stopPropagation());
  }

  // --- journal inline textarea (event delegation on tbody) ---
  const jTbody = document.getElementById('j-tbody');
  if (jTbody) {
    jTbody.addEventListener('blur', async e => {
      const ta = e.target;
      if (!ta.classList.contains('cell-ta') || !ta.dataset.jid) return;
      const id=parseInt(ta.dataset.jid), field=ta.dataset.field;
      const arr = S.tab==='journal-m' ? S.journalM : S.journalT;
      const row = arr.find(r=>r.id===id);
      if (!row || row[field]===ta.value) return;
      row[field]=ta.value;
      await API.patch(`/api/journal/${id}`,{[field]:ta.value});
    }, true);

    // --- journal delete (delegated) ---
    jTbody.addEventListener('click', async e => {
      const btn = e.target.closest('[data-del-row]');
      if (btn) {
        e.stopPropagation();
        if (!confirm('Удалить строку?')) return;
        const id=parseInt(btn.dataset.delRow);
        await API.del(`/api/journal/${id}`);
        S.journalM=S.journalM.filter(r=>r.id!==id);
        S.journalT=S.journalT.filter(r=>r.id!==id);
        S.vsTop = 0; render();
        return;
      }
      // --- row click → select (delegated) ---
      const tr = e.target.closest('tr[data-jid]');
      if (tr && !e.target.closest('textarea,input,button')) {
        const rid = String(tr.dataset.jid);
        if (e.ctrlKey||e.metaKey) {
          if (S.selectedRows.has(rid)) S.selectedRows.delete(rid); else S.selectedRows.add(rid);
        } else {
          S.selectedRows.clear();
          S.selectedRows.add(rid);
        }
        jTbody.querySelectorAll('tr[data-jid]').forEach(r => {
          r.classList.toggle('row-selected', S.selectedRows.has(String(r.dataset.jid)));
        });
        const cnt = document.querySelectorAll('.count-text');
        cnt.forEach(c=>{ if(c.textContent.includes('Выделено')) c.textContent=`Выделено строк: ${S.selectedRows.size}`; });
      }
    });

    // --- context menu (delegated) ---
    jTbody.addEventListener('contextmenu', e => {
      const tr = e.target.closest('tr[data-jid]');
      if (tr) { e.preventDefault(); showCtxMenu(e.clientX, e.clientY, tr); }
    });
  }

  // --- orders row click → select ---
  document.querySelectorAll('tbody tr[data-oid]').forEach(tr => {
    tr.addEventListener('click', e => {
      if (e.target.tagName==='TEXTAREA'||e.target.tagName==='INPUT'||e.target.tagName==='BUTTON') return;
      const rid = tr.dataset.oid;
      if (e.ctrlKey||e.metaKey) {
        if (S.selectedRows.has(rid)) S.selectedRows.delete(rid); else S.selectedRows.add(rid);
      } else {
        S.selectedRows.clear();
        S.selectedRows.add(rid);
      }
      document.querySelectorAll('tbody tr[data-oid]').forEach(r => {
        r.classList.toggle('row-selected', S.selectedRows.has(r.dataset.oid));
      });
    });
  });

  // --- orders context menu ---
  document.querySelectorAll('tbody tr[data-oid]').forEach(tr => {
    tr.addEventListener('contextmenu', e => {
      e.preventDefault();
      showCtxMenu(e.clientX, e.clientY, tr);
    });
  });

  // --- journal col filters ---
  document.querySelectorAll('[data-fj]').forEach(el => el.addEventListener('input', deb(()=>{ S.fj[el.dataset.fj]=el.value; S.vsTop=0; render(); },300)));

  // --- virtual scroll ---
  const jContent = document.getElementById('journal-content');
  if (jContent) {
    jContent.scrollTop = S.vsTop;
    jContent.addEventListener('scroll', () => {
      S.vsTop = jContent.scrollTop;
      refreshJTbody();
      // delegation listeners are on jTbody element itself, no re-attach needed
    }, { passive: true });
  }

  // --- modal ---
  const mc = document.getElementById('modal-cancel');
  if (mc) mc.addEventListener('click', ()=>{ S.modal=null; render(); });
  const mbg = document.getElementById('modal-bg');
  if (mbg) mbg.addEventListener('click', e=>{ if(e.target===mbg){S.modal=null;render();} });
  const mdel = document.getElementById('modal-del');
  if (mdel) mdel.addEventListener('click', async ()=>{
    if (!confirm('Удалить заказ?')) return;
    const id=mdel.dataset.id;
    await API.del(`/api/orders/${id}`);
    S.orders=S.orders.filter(o=>o.id!==id);
    S.modal=null; render();
  });
  const ms = document.getElementById('modal-save');
  if (ms) ms.addEventListener('click', async ()=>{
    const modal=document.querySelector('.modal');
    const data={};
    modal.querySelectorAll('input,textarea,select').forEach(inp=>{
      if(!inp.name) return;
      data[inp.name]=inp.type==='checkbox'?inp.checked:inp.value;
    });
    const id=ms.dataset.id;
    if (id) { const u=await API.patch(`/api/orders/${id}`,data); const i=S.orders.findIndex(o=>o.id===id); if(i>=0)S.orders[i]=u; }
    else { const c=await API.post('/api/orders',data); S.orders.push(c); }
    S.modal=null; render();
  });

  // --- Protocol generate ---
  const mprotoGen = document.getElementById('modal-proto-gen');
  if (mprotoGen) mprotoGen.addEventListener('click', async () => {
    const modal = document.querySelector('.modal');
    const isM = S.tab === 'journal-m';
    const domain = isM ? 'manometers' : 'thermometers';
    const rows = isM ? S.journalM : S.journalT;
    const list = filteredJournal(rows);

    const fromN = parseInt(modal.querySelector('[name=proto_from]').value) || 1;
    const toN = parseInt(modal.querySelector('[name=proto_to]').value) || list.length;
    const date = modal.querySelector('[name=proto_date]').value;
    const number = modal.querySelector('[name=proto_number]').value;
    const verifier = modal.querySelector('[name=proto_verifier]').value;
    const temperature = modal.querySelector('[name=proto_temp]').value;
    const humidity = modal.querySelector('[name=proto_hum]').value;
    const pressure = modal.querySelector('[name=proto_pres]').value;
    const skipReadings = modal.querySelector('[name=proto_skip_readings]').checked;

    const statusEl = document.getElementById('proto-status');

    const selectedRows = list.slice(fromN - 1, toN);
    if (!selectedRows.length) { statusEl.textContent = 'Нет строк в диапазоне'; return; }

    const byMp = {};
    for (const r of selectedRows) {
      const mp = r.mp || '';
      if (!byMp[mp]) byMp[mp] = [];
      byMp[mp].push(r);
    }

    const groups = Object.entries(byMp);
    statusEl.textContent = `Формирование ${groups.length} протокол(а)...`;
    mprotoGen.disabled = true;

    try {
      for (let gi = 0; gi < groups.length; gi++) {
        const [mp, mpRows] = groups[gi];
        const devices = mpRows.map(r => ({
          type_si: r.type_si || '',
          gr_number: r.gr_number || '',
          si_number: r.si_number || '',
          unit: r.unit || '',
          min: r.min || '',
          max: r.max || '',
          accuracy_class: r.accuracy_class || '',
        }));

        const numStr = groups.length > 1 ? `${number}-${gi+1}` : number;

        const req = {
          date, number: numStr, temperature, humidity, pressure,
          verifier, method: mp, domain,
          is_thermomanometer: !isM,
          skip_readings: skipReadings,
          devices,
        };

        statusEl.textContent = `Генерация ${gi+1}/${groups.length}: МП "${mp}" (${devices.length} приборов)...`;
        const res = await API.post('/api/protocol', req);

        const bytes = atob(res.file);
        const arr2 = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr2[i] = bytes.charCodeAt(i);
        const blob = new Blob([arr2], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = res.filename || `protocol_${numStr}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        const today = date || new Date().toISOString().slice(0,10);
        for (const r of mpRows) {
          r.protocol_number = numStr;
          r.verification_date = today;
          await API.patch(`/api/journal/${r.id}`, {
            protocol_number: numStr,
            verification_date: today,
          });
        }
      }

      statusEl.textContent = `Готово! ${groups.length} протокол(а) сформировано.`;
      setTimeout(() => { S.modal = null; render(); }, 1500);
    } catch(err) {
      statusEl.textContent = 'Ошибка: ' + (err.message || String(err));
      mprotoGen.disabled = false;
    }
  });

  // --- keyboard shortcuts ---
  document.onkeydown = async e => {
    if (e.key === 'Escape') {
      hideCtxMenu();
      if (S.modal) { S.modal=null; render(); }
      if (S.jFromOpen) { S.jFromOpen=false; render(); }
      return;
    }

    // Ctrl+L — toggle lock on selected rows
    if ((e.ctrlKey||e.metaKey) && e.key === 'l') {
      e.preventDefault();
      const selArr = [...S.selectedRows];
      if (!selArr.length) return;
      const isJ = S.tab !== 'orders';
      const arr = isJ ? (S.tab==='journal-m' ? S.journalM : S.journalT) : S.orders;
      for (const rid of selArr) {
        const row = arr.find(r => String(r.id) === String(rid));
        if (row) await toggleLock(!isJ, rid, row);
      }
      return;
    }

    // Ctrl+C — copy selected row
    if ((e.ctrlKey||e.metaKey) && e.key === 'c' && !e.target.matches('textarea,input')) {
      e.preventDefault();
      const selArr = [...S.selectedRows];
      if (selArr.length !== 1) return;
      const rid = selArr[0];
      const isJ = S.tab !== 'orders';
      const arr = isJ ? (S.tab==='journal-m' ? S.journalM : S.journalT) : S.orders;
      const row = arr.find(r => String(r.id) === String(rid));
      if (row) S._clipboard = JSON.parse(JSON.stringify(row));
      return;
    }

    // Ctrl+V — paste
    if ((e.ctrlKey||e.metaKey) && e.key === 'v' && !e.target.matches('textarea,input')) {
      e.preventDefault();
      if (!S._clipboard) return;
      const selArr = [...S.selectedRows];
      const isJ = S.tab !== 'orders';
      const arr = isJ ? (S.tab==='journal-m' ? S.journalM : S.journalT) : S.orders;
      const idx = selArr.length ? arr.findIndex(r => String(r.id) === String(selArr[selArr.length-1])) : arr.length-1;
      await pasteRow(!isJ, arr, Math.max(0, idx));
      return;
    }

    // Del — delete selected rows
    if (e.key === 'Delete' && !e.target.matches('textarea,input')) {
      const selArr = [...S.selectedRows];
      if (!selArr.length) return;
      if (!confirm(`Удалить ${selArr.length} строк?`)) return;
      const isJ = S.tab !== 'orders';
      for (const rid of selArr) {
        if (isJ) {
          const jid = parseInt(rid);
          await API.del(`/api/journal/${jid}`);
          S.journalM = S.journalM.filter(r => r.id !== jid);
          S.journalT = S.journalT.filter(r => r.id !== jid);
        } else {
          await API.del(`/api/orders/${rid}`);
          S.orders = S.orders.filter(o => String(o.id) !== String(rid));
        }
      }
      S.selectedRows.clear();
      render();
      return;
    }
  };

  // --- close jfrom popup on outside click ---
  document.addEventListener('click', e => {
    if (ctxMenu && !ctxMenu.contains(e.target)) hideCtxMenu();
    if (S.jFromOpen) {
      const popup = document.getElementById('jfrom-popup');
      const btn = document.getElementById('btn-jfrom');
      if (popup && !popup.contains(e.target) && btn && !btn.contains(e.target)) {
        S.jFromOpen = false;
        render();
      }
    }
  }, {capture:true, once:false});
}

/* ============================================================
   УТИЛИТЫ ЭКСПОРТА
   ============================================================ */

/** Скачать blob как файл */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

/** Текущая дата YYYY-MM-DD */
function today() { return new Date().toISOString().slice(0,10); }

/** Строки журнала в видимом порядке */
function journalRows() {
  const isM = S.tab === 'journal-m';
  return filteredJournal(isM ? S.journalM : S.journalT);
}

/** Prompt выбора диапазона строк (как в v36 ac()) */
function pickRange(title) {
  const list = journalRows();
  if (!list.length) { alert('Журнал пуст'); return null; }
  const sel = [...S.selectedRows];
  const selIdxs = sel.map(id => list.findIndex(r => String(r.id) === String(id))).filter(i => i >= 0);
  const defFrom = selIdxs.length ? Math.min(...selIdxs)+1 : 1;
  const defTo   = selIdxs.length ? Math.max(...selIdxs)+1 : list.length;
  const fromStr = window.prompt(`${title}: строки журнала с`, String(defFrom));
  if (fromStr === null) return null;
  const toStr = window.prompt('по', String(defTo));
  if (toStr === null) return null;
  const from = Math.max(1, parseInt(fromStr)||defFrom);
  const to   = Math.max(from, parseInt(toStr)||defTo);
  return list.slice(from-1, to);
}

/* --- Excel экспорт журнала --- */
async function doExcelExport() {
  const list = journalRows();
  if (!list.length) { alert('Журнал пуст'); return; }
  const sel = [...S.selectedRows];
  const selIdxs = sel.map(id => list.findIndex(r => String(r.id) === String(id))).filter(i => i >= 0);
  const defFrom = selIdxs.length ? Math.min(...selIdxs)+1 : 1;
  const defTo   = selIdxs.length ? Math.max(...selIdxs)+1 : list.length;
  const fromStr = window.prompt('С какой строки выгрузить Excel?', String(defFrom));
  if (fromStr === null) return;
  const toStr = window.prompt('По какую строку выгрузить Excel?', String(defTo));
  if (toStr === null) return;
  const from = Math.max(1, parseInt(fromStr)||defFrom);
  const to   = Math.max(from, parseInt(toStr)||defTo);
  const rows = list.slice(from-1, to);

  const cols = J_COLS.filter(c => c.key !== 'checked');
  const headers = cols.map(c => c.label);
  const colWidths = cols.map(c => Math.max(c.label.length, Math.floor(
    {jcol_acc:10,jcol_type:16,jcol_mp:22,jcol_cust:19,jcol_who:22,jcol_arsh:22,jcol_rej:25}[c.cls?.replace('-','_')] || 10
  )));
  const dataRows = rows.map(r => cols.map(c => r[c.key]||''));

  const domain = S.tab === 'journal-m' ? 'manometer' : 'thermometer';
  try {
    const resp = await fetch('/api/export-excel', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ filename:`zhurnal_${domain}_${today()}.xlsx`, sheet:'Данные', headers, rows:dataRows, col_widths:colWidths })
    });
    if (!resp.ok) throw new Error(await resp.text());
    downloadBlob(await resp.blob(), `zhurnal_${domain}_${today()}.xlsx`);
  } catch(e) { alert('Ошибка: '+e.message); }
}

/* --- Выгрузка в Аршин (XML, только JS) --- */
function doArshinExport() {
  const rows = pickRange('Выгрузка в аршин');
  if (!rows) return;

  // Парсинг даты dd.mm.yyyy → yyyy-mm-dd+10:00
  function parseDate(s) {
    s = (s||'').trim();
    const m1 = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);
    if (m1) return `${m1[3]}-${m1[2]}-${m1[1]}+10:00`;
    const m2 = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (m2) return `${m2[1]}-${m2[2]}-${m2[3]}+10:00`;
    return '';
  }
  function xmlEsc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  }
  function tag(name, val) {
    const v = xmlEsc((val||'').trim());
    return v ? `<gost:${name}>${v}</gost:${name}>` : '';
  }
  function splitList(s) {
    return (s||'').split(/[,;]+/).map(x=>x.trim()).filter(Boolean);
  }
  // Очистка ГР (убираем всё до первой цифры)
  function cleanGR(s) {
    return (s||'').replace(/^[^\d]*/,'').trim();
  }

  const items = [];
  for (const r of rows) {
    const typeSI   = (r.type_si||'').trim();
    const siNum    = (r.si_number||'').trim();
    const grNum    = cleanGR(r.gr_number||'');
    if (!siNum || !grNum) continue;

    const vrfDate  = parseDate(r.verification_date);
    const valDate  = parseDate(r.valid_until);
    const rejected = !!(r.rejection_reason||'').trim();
    const standards = splitList(r.standards);
    const grSIs    = splitList(r.gr_si).map(cleanGR);
    const serials  = splitList(r.serial_number);

    let means = standards.map(s=>`<gost:mieta>${tag('number',s)}</gost:mieta>`).join('');
    const miPairs = Math.max(grSIs.length, serials.length);
    let mis = '';
    for (let i=0; i<miPairs; i++) {
      const gri = grSIs[i]||'', sni = serials[i]||'';
      if (gri||sni) mis += `<gost:mi>${tag('typeNum',gri)}${tag('manufactureNum',sni)}</gost:mi>`;
    }
    if (mis) means += `<gost:mis>${mis}</gost:mis>`;

    const conditions = [
      tag('temperature', r.temperature ? r.temperature+'°C' : ''),
      tag('pressure',    r.pressure    ? r.pressure+'кПа'   : ''),
      tag('hymidity',    r.humidity    ? r.humidity+'%'     : ''),
    ].join('');

    items.push([
      '<gost:result>',
      '<gost:miInfo><gost:singleMI>',
      tag('mitypeNumber', grNum),
      tag('manufactureNum', siNum),
      tag('manufactureYear', r.year||''),
      tag('modification', typeSI),
      '</gost:singleMI></gost:miInfo>',
      '<gost:signCipher>ГШР</gost:signCipher>',
      '<gost:miOwner>Не предоставлен</gost:miOwner>',
      tag('vrfDate', vrfDate),
      rejected ? '' : tag('validDate', valDate),
      '<gost:type>2</gost:type>',
      '<gost:calibration>false</gost:calibration>',
      rejected
        ? `<gost:inapplicable>${tag('reasons', r.rejection_reason)}</gost:inapplicable>`
        : '<gost:applicable><gost:signPass>false</gost:signPass><gost:signMi>true</gost:signMi></gost:applicable>',
      tag('docTitle', r.mp||''),
      tag('metrologist', r.verifier||''),
      means ? `<gost:means>${means}</gost:means>` : '',
      conditions ? `<gost:conditions>${conditions}</gost:conditions>` : '',
      '</gost:result>',
    ].join(''));
  }

  if (!items.length) { alert('Нет строк для выгрузки в Аршин'); return; }

  const domain = S.tab === 'journal-m' ? 'Манометры' : 'Термометры';
  const xml = `<?xml version="1.0" encoding="utf-8"?>\n<gost:application xmlns:gost="urn://fgis-arshin.gost.ru/module-verifications/import/2020-06-19">${items.join('')}</gost:application>`;
  downloadBlob(new Blob([xml], {type:'application/xml;charset=utf-8'}), `${domain}_${today()}.xml`);
  alert(`Выгружено строк: ${items.length}`);
}

/* --- Загрузка результатов из Аршина --- */
function doLoadArshinResults() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const resp = await fetch('/api/import-arshin-results', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ filename: file.name, data: reader.result })
        });
        if (!resp.ok) throw new Error(await resp.text());
        const { results } = await resp.json();
        if (!results.length) { alert('В файле не найдено подходящих строк'); return; }

        const isM = S.tab === 'journal-m';
        const arr = isM ? S.journalM : S.journalT;
        const loaded=[], notFound=[], skipped=[], alreadyFilled=[];

        // Очистка ГР
        function cleanGR(s) { return (s||'').replace(/^[^\d]*/,'').trim().replace(/\s+/g,'').toUpperCase(); }

        for (const hit of results) {
          // Ищем строку в журнале по номеру СИ + ГР
          const matches = arr.filter(row => {
            const sn = (row.si_number||'').trim();
            const gr = cleanGR(row.gr_number||'');
            return sn === hit.serial.trim() && gr === cleanGR(hit.register);
          });
          if (matches.length === 0) { notFound.push(`файл стр.${hit.source_row}: СИ ${hit.serial}, ГР ${hit.register}`); continue; }
          if (matches.length > 1)   { skipped.push(`файл стр.${hit.source_row}: дубли СИ ${hit.serial}`); continue; }
          const row = matches[0];
          if ((row.fgis_arshin||'').trim()) { alreadyFilled.push(`журнал стр.${arr.indexOf(row)+1}: СИ ${hit.serial}`); continue; }
          row.fgis_arshin = hit.document;
          loaded.push(`файл стр.${hit.source_row} → журнал стр.${arr.indexOf(row)+1}: ${hit.document}`);
          await API.patch(`/api/journal/${row.id}`, { fgis_arshin: hit.document });
        }

        const msg = [
          `Загрузка результатов завершена.`,
          `Загружено: ${loaded.length}`,
          `Не найдено в журнале: ${notFound.length}`,
          `Пропущено из-за дублей: ${skipped.length}`,
          `Пропущено, уже заполнено СВ-ВО ФГИС АРШИН: ${alreadyFilled.length}`,
          loaded.length    ? '\nЗагружено:\n'+loaded.join('\n') : '',
          notFound.length  ? '\nНе найдено:\n'+notFound.join('\n') : '',
          skipped.length   ? '\nДубли:\n'+skipped.join('\n') : '',
          alreadyFilled.length ? '\nУже заполнено:\n'+alreadyFilled.join('\n') : '',
        ].filter(Boolean).join('\n');

        alert(msg);
        if (confirm('Скачать отчёт загрузки в TXT?')) {
          downloadBlob(new Blob([msg], {type:'text/plain;charset=utf-8'}), `otchet_zagruzki_arshin_${today()}.txt`);
        }
        if (loaded.length) { S.vsTop=0; render(); }
      } catch(e) { alert('Ошибка загрузки результатов: '+e.message); }
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

/* --- Выгрузить реестр --- */
async function doExportReestr() {
  const rows = pickRange('Выгрузить реестр');
  if (!rows) return;
  const position = window.prompt('Должность подписанта', 'Специалист по управлению документацией');
  if (position === null) return;
  const signerName = window.prompt('ФИО подписанта', '');
  if (signerName === null) return;

  // Очистка ГР
  function cleanGR(s) { return (s||'').replace(/^[^\d]*/,'').trim(); }

  const domain = S.tab === 'journal-m' ? 'manometer' : 'thermometer';
  const reestrRows = rows.map((r,i) => ({
    row_num:   i+1,
    type_si:   r.type_si||'',
    si_number: r.si_number||'',
    gr_number: cleanGR(r.gr_number||''),
    verification_date: r.verification_date||'',
    valid_until: r.valid_until||'',
    mpi:         r.mpi||'',
    fgis_arshin: r.fgis_arshin||'',
    stamp:       r.stamp||'',
    customer:    r.customer||'',
  })).filter(r => r.type_si||r.si_number||r.gr_number||r.fgis_arshin);

  try {
    const resp = await fetch('/api/export-registry', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ domain, rows: reestrRows, position, signer_name: signerName })
    });
    if (!resp.ok) throw new Error(await resp.text());
    downloadBlob(await resp.blob(), `reestr_${domain}_${today()}.xlsx`);
  } catch(e) { alert('Ошибка выгрузки реестра: '+e.message); }
}

/* --- Выгрузить журнал поверки --- */
async function doExportJurnalPoverki() {
  const fromStr = window.prompt('Журнал поверки: дата с (дд.мм.гггг)', '');
  if (fromStr === null) return;
  const toStr = window.prompt('по (дд.мм.гггг)', '');
  if (toStr === null) return;

  // Парсинг даты строки вида dd.mm.yyyy в Date
  function parseRU(s) {
    s = (s||'').trim();
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);
    if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}`);
    return null;
  }

  const fromDate = parseRU(fromStr);
  const toDate   = parseRU(toStr);
  if (!fromDate || !toDate) { alert('Неверный формат даты (ожидается дд.мм.гггг)'); return; }

  const domain = S.tab === 'journal-m' ? 'manometer' : 'thermometer';
  const isM = S.tab === 'journal-m';
  const all = isM ? S.journalM : S.journalT;

  const jpRows = all.map((r,i) => {
    const vd = (r.verification_date||'').trim();
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(vd);
    if (!m) return null;
    const dt = new Date(`${m[3]}-${m[2]}-${m[1]}`);
    if (dt < fromDate || dt > toDate) return null;
    if (!r.type_si && !r.si_number && !r.fgis_arshin && !r.protocol_number) return null;
    return {
      row_num: i+1,
      type_si: r.type_si||'',
      si_number: r.si_number||'',
      verification_date: r.verification_date||'',
      fgis_arshin: r.fgis_arshin||'',
      protocol_number: r.protocol_number||'',
      stamp: r.stamp||'',
      valid_until: r.valid_until||'',
    };
  }).filter(Boolean);

  if (!jpRows.length) { alert('За указанный период строки не найдены.'); return; }

  try {
    const resp = await fetch('/api/export-verification-journal', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ domain, from: fromStr, to: toStr, rows: jpRows })
    });
    if (!resp.ok) throw new Error(await resp.text());
    downloadBlob(await resp.blob(), `zhurnal_poverki_${domain}_${today()}.xlsx`);
  } catch(e) { alert('Ошибка выгрузки журнала поверки: '+e.message); }
}

/* ============================================================
   СПРАВОЧНИКИ (ADMIN)
   ============================================================ */

// State for admin page
const ADM = {
  tab: 'types',      // types | registers | methods | equipment | customers
  items: {},         // { types:[], registers:[], methods:[], equipment:[], customers:[] }
  sel: null,         // selected item id
  editing: null,     // { key, item } — item being edited
  search: '',
};

const ADM_TABS = [
  { key:'types',      label:'По типам СИ' },
  { key:'registers',  label:'По реестрам' },
  { key:'methods',    label:'Методики' },
  { key:'equipment',  label:'Оборудование' },
  { key:'customers',  label:'Заказчики' },
];

const ADM_API = {
  'types':      'types',
  'registers':  'registers',
  'methods':    'verification-methods',
  'equipment':  'equipment',
  'customers':  'customers',
};

const ADM_COLS = {
  types: [
    { f:'name',               label:'Наименование' },
    { f:'official_name',      label:'Официальное название' },
    { f:'domain',             label:'Домен' },
    { f:'units',              label:'Единицы', fmt: v => { try { return JSON.parse(v||'[]').join(', '); } catch{ return v||''; } } },
    { f:'is_electrocontact',  label:'Электроконтактный', fmt: v => v?'Да':'' },
    { f:'is_thermomanometer', label:'Термоманометр', fmt: v => v?'Да':'' },
    { f:'note',               label:'Примечание' },
  ],
  registers: [
    { f:'number',             label:'Номер реестра' },
    { f:'domain',             label:'Домен' },
    { f:'description_types',  label:'Типы СИ' },
    { f:'description_makers', label:'Производители' },
    { f:'note',               label:'Примечание' },
  ],
  methods: [
    { f:'name',               label:'Краткое название' },
    { f:'full_name',          label:'Полное название' },
    { f:'domain',             label:'Домен' },
    { f:'decision_basis',     label:'Основание' },
  ],
  equipment: [
    { f:'name',               label:'Наименование' },
    { f:'serial_number',      label:'Зав. номер' },
    { f:'gosreestr_number',   label:'Госреестр №' },
    { f:'kind',               label:'Вид' },
    { f:'domain',             label:'Домен' },
    { f:'accuracy',           label:'Точность' },
    { f:'is_etalon',          label:'Эталон', fmt: v => v?'Да':'' },
    { f:'disabled',           label:'Откл.', fmt: v => v?'Да':'' },
  ],
  customers: [
    { f:'name',               label:'Наименование' },
    { f:'features',           label:'Особенности' },
  ],
};

// Fields for edit form
const ADM_FORM = {
  types: [
    { f:'name',               label:'Наименование', type:'text' },
    { f:'official_name',      label:'Официальное название', type:'text' },
    { f:'domain',             label:'Домен', type:'select', opts:['manometer','thermometer'] },
    { f:'units',              label:'Единицы (через запятую)', type:'text', hint:'bar, МПа, кПа' },
    { f:'is_electrocontact',  label:'Электроконтактный', type:'checkbox' },
    { f:'is_thermomanometer', label:'Термоманометр', type:'checkbox' },
    { f:'note',               label:'Примечание', type:'textarea' },
  ],
  registers: [
    { f:'number',             label:'Номер реестра', type:'text' },
    { f:'domain',             label:'Домен', type:'select', opts:['manometer','thermometer'] },
    { f:'description_types',  label:'Типы СИ', type:'textarea' },
    { f:'description_makers', label:'Производители', type:'textarea' },
    { f:'description_notes',  label:'Доп. описание', type:'textarea' },
    { f:'note',               label:'Примечание', type:'textarea' },
  ],
  methods: [
    { f:'name',               label:'Краткое название', type:'text' },
    { f:'full_name',          label:'Полное название', type:'textarea' },
    { f:'domain',             label:'Домен', type:'select', opts:['manometer','thermometer'] },
    { f:'inspection_desc',    label:'Описание внешнего осмотра', type:'textarea' },
    { f:'testing_desc',       label:'Описание испытания', type:'textarea' },
    { f:'accuracy_desc',      label:'Описание погрешности', type:'textarea' },
    { f:'decision_basis',     label:'Основание для решения', type:'textarea' },
  ],
  equipment: [
    { f:'name',               label:'Наименование', type:'text' },
    { f:'serial_number',      label:'Зав. номер', type:'text' },
    { f:'gosreestr_number',   label:'Госреестр №', type:'text' },
    { f:'registration_number',label:'Рег. номер', type:'text' },
    { f:'description',        label:'Описание', type:'textarea' },
    { f:'kind',               label:'Вид', type:'text' },
    { f:'domain',             label:'Домен', type:'select', opts:['manometer','thermometer',''] },
    { f:'range_min',          label:'Диапазон мин', type:'text' },
    { f:'range_max',          label:'Диапазон макс', type:'text' },
    { f:'unit',               label:'Единица', type:'text' },
    { f:'accuracy',           label:'Точность', type:'text' },
    { f:'is_etalon',          label:'Эталон', type:'checkbox' },
    { f:'disabled',           label:'Отключён', type:'checkbox' },
  ],
  customers: [
    { f:'name',               label:'Наименование', type:'text' },
    { f:'features',           label:'Особенности', type:'textarea' },
  ],
};

async function admLoad(key) {
  const apiKey = ADM_API[key];
  if (!apiKey) return;
  const data = await API.get(`/api/${apiKey}`);
  ADM.items[key] = data;
}

function renderAdminBar() {
  return `
<div class="glass-bar">
  <div class="bar-left">
    <div class="tab-group">
      <button class="tab-item" data-tab="orders">ЗАКАЗЫ</button>
      <button class="tab-item" data-tab="journal-m">${ICONS.journal} Журнал манометры</button>
      <button class="tab-item" data-tab="journal-t">Журнал термометры</button>
      <span class="tab-item active">Справочники</span>
    </div>
  </div>
  <button class="btn-theme" title="Переключить тему">${ICONS.moon}</button>
</div>`;
}

function renderAdmin() {
  const key = ADM.tab;
  const items = ADM.items[key] || [];
  const cols = ADM_COLS[key] || [];
  const search = ADM.search.toLowerCase();
  const filtered = search
    ? items.filter(r => Object.values(r).some(v => String(v||'').toLowerCase().includes(search)))
    : items;

  const tabHtml = ADM_TABS.map(t =>
    `<button class="adm-tab${ADM.tab===t.key?' active':''}" data-adm-tab="${t.key}">${t.label}</button>`
  ).join('');

  const headCols = cols.map(c => `<th>${esc(c.label)}</th>`).join('');
  const bodyRows = filtered.map(item => {
    const sel = ADM.sel === item.id ? ' adm-sel' : '';
    const cells = cols.map(c => {
      const v = item[c.f];
      const disp = c.fmt ? c.fmt(v) : esc(v??'');
      return `<td>${disp}</td>`;
    }).join('');
    return `<tr class="adm-row${sel}" data-adm-id="${esc(item.id)}">${cells}<td><button class="adm-del-btn" data-adm-del="${esc(item.id)}" title="Удалить">✕</button></td></tr>`;
  }).join('') || `<tr><td colspan="${cols.length+1}" class="empty">Нет записей</td></tr>`;

  // Edit form
  let formHtml = '';
  if (ADM.editing) {
    const { item } = ADM.editing;
    const formFields = (ADM_FORM[key] || []).map(fd => {
      const val = item[fd.f] ?? '';
      if (fd.type === 'checkbox') {
        const chk = val ? ' checked' : '';
        return `<div class="adm-field"><label><input type="checkbox" data-adm-field="${esc(fd.f)}"${chk}> ${esc(fd.label)}</label></div>`;
      }
      if (fd.type === 'select') {
        const opts = (fd.opts||[]).map(o => `<option value="${esc(o)}"${val===o?' selected':''}>${esc(o)||'(пусто)'}</option>`).join('');
        return `<div class="adm-field"><label>${esc(fd.label)}<select data-adm-field="${esc(fd.f)}">${opts}</select></label></div>`;
      }
      if (fd.type === 'textarea') {
        return `<div class="adm-field"><label>${esc(fd.label)}<textarea data-adm-field="${esc(fd.f)}" rows="2">${esc(val)}</textarea></label></div>`;
      }
      return `<div class="adm-field"><label>${esc(fd.label)}<input type="text" data-adm-field="${esc(fd.f)}" value="${esc(val)}"></label></div>`;
    }).join('');
    const isNew = !item.id;
    formHtml = `
<div class="adm-form-panel">
  <div class="adm-form-title">${isNew ? 'Новая запись' : 'Редактирование'}</div>
  <div class="adm-form-fields">${formFields}</div>
  <div class="adm-form-btns">
    <button class="btn-primary" id="adm-save">Сохранить</button>
    <button class="btn-border" id="adm-cancel">Отмена</button>
  </div>
</div>`;
  }

  return `
<div class="adm-wrap" id="adm-wrap-root">
  <div class="adm-sidebar">
    <div class="adm-tabs">${tabHtml}</div>
    <div class="adm-search-wrap">
      ${ICONS.search}<input type="text" id="adm-search" placeholder="Поиск" value="${esc(ADM.search)}">
    </div>
    <button class="btn-primary adm-new-btn" id="adm-new">${ICONS.plus} Добавить</button>
    <div class="adm-count">${filtered.length} из ${items.length}</div>
  </div>
  <div class="adm-main">
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr>${headCols}<th></th></tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
    ${formHtml}
  </div>
</div>`;
}

function admCollectForm() {
  const item = Object.assign({}, ADM.editing.item);
  const key = ADM.editing.key;
  (ADM_FORM[key]||[]).forEach(fd => {
    const el = document.querySelector(`[data-adm-field="${fd.f}"]`);
    if (!el) return;
    if (fd.type === 'checkbox') item[fd.f] = el.checked ? 1 : 0;
    else item[fd.f] = el.value;
  });
  // units: convert "bar, МПа" → JSON array
  if (key === 'types' && item.units && !item.units.startsWith('[')) {
    item.units = JSON.stringify(item.units.split(',').map(s=>s.trim()).filter(Boolean));
  }
  return item;
}

async function bindAdminEvents() {
  // tab switch
  document.querySelectorAll('[data-adm-tab]').forEach(btn => {
    btn.addEventListener('click', async () => {
      ADM.tab = btn.dataset.admTab;
      ADM.sel = null;
      ADM.editing = null;
      ADM.search = '';
      if (!ADM.items[ADM.tab]) await admLoad(ADM.tab);
      renderAdminPage();
    });
  });

  // search
  const srch = document.getElementById('adm-search');
  if (srch) srch.addEventListener('input', deb(() => { ADM.search = srch.value; renderAdminPage(); }, 250));

  // row click → select / open form
  document.querySelectorAll('.adm-row').forEach(tr => {
    tr.addEventListener('click', e => {
      if (e.target.closest('[data-adm-del]')) return;
      const id = tr.dataset.admId;
      ADM.sel = id;
      const item = (ADM.items[ADM.tab]||[]).find(r=>r.id===id);
      ADM.editing = item ? { key: ADM.tab, item: Object.assign({}, item) } : null;
      renderAdminPage();
    });
  });

  // delete
  document.querySelectorAll('[data-adm-del]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      if (!confirm('Удалить запись?')) return;
      const id = btn.dataset.admDel;
      const apiKey = ADM_API[ADM.tab];
      await API.del(`/api/${apiKey}/${id}`);
      ADM.items[ADM.tab] = (ADM.items[ADM.tab]||[]).filter(r=>r.id!==id);
      if (ADM.sel===id) { ADM.sel=null; ADM.editing=null; }
      renderAdminPage();
    });
  });

  // new
  const btnNew = document.getElementById('adm-new');
  if (btnNew) btnNew.addEventListener('click', () => {
    ADM.sel = null;
    ADM.editing = { key: ADM.tab, item: {} };
    renderAdminPage();
  });

  // save
  const btnSave = document.getElementById('adm-save');
  if (btnSave) btnSave.addEventListener('click', async () => {
    const item = admCollectForm();
    const apiKey = ADM_API[ADM.tab];
    let saved;
    if (item.id) {
      saved = await API.patch(`/api/${apiKey}/${item.id}`, item);
      const idx = (ADM.items[ADM.tab]||[]).findIndex(r=>r.id===item.id);
      if (idx>=0) ADM.items[ADM.tab][idx] = saved;
    } else {
      saved = await API.post(`/api/${apiKey}`, item);
      if (!ADM.items[ADM.tab]) ADM.items[ADM.tab] = [];
      ADM.items[ADM.tab].push(saved);
    }
    ADM.sel = saved.id;
    ADM.editing = { key: ADM.tab, item: Object.assign({}, saved) };
    renderAdminPage();
  });

  // cancel
  const btnCancel = document.getElementById('adm-cancel');
  if (btnCancel) btnCancel.addEventListener('click', () => {
    ADM.editing = null;
    renderAdminPage();
  });
}

function renderAdminPage() {
  const content = document.getElementById('adm-wrap-root');
  if (content) {
    content.outerHTML = renderAdmin();
    bindAdminEvents();
  } else {
    // full re-render needed (tab switch from outside)
    render();
  }
}

/* ============================================================
   INIT
   ============================================================ */
async function init() {
  document.getElementById('app').innerHTML = '<div class="empty">Загрузка…</div>';
  [S.orders, S.journalM, S.journalT] = await Promise.all([
    API.get('/api/orders'),
    API.get('/api/journal?domain=manometers'),
    API.get('/api/journal?domain=thermometers'),
  ]);
  render();
}

init();
