import { useState } from "react";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const TOOLS = [
  { id: "H-001", nombre: "Taladro Percutor Bosch", categoria: "Electrica", estado: "disponible", ultimoUsuario: "García, Tomás", codigo: "7890123" },
  { id: "H-002", nombre: "Amoladora Angular 115mm", categoria: "Electrica", estado: "en_uso", usuarioActual: "Pérez, Lucía", desde: "08:45", ultimoUsuario: "Díaz, Carlos", codigo: "7890124" },
  { id: "H-003", nombre: "Llave Torque 1/2\"", categoria: "Manual", estado: "disponible", ultimoUsuario: "Rodríguez, Ana", codigo: "7890125" },
  { id: "H-004", nombre: "Oscilante Multifunción", categoria: "Electrica", estado: "en_uso", usuarioActual: "López, Mateo", desde: "07:30", ultimoUsuario: "Gómez, Julia", codigo: "7890126" },
  { id: "H-005", nombre: "Juego Llaves Allen", categoria: "Manual", estado: "disponible", ultimoUsuario: "Fernández, Diego", codigo: "7890127" },
  { id: "H-006", nombre: "Sierra Caladora", categoria: "Electrica", estado: "disponible", ultimoUsuario: "Martínez, Sofía", codigo: "7890128" },
  { id: "H-007", nombre: "Nivel Láser", categoria: "Medicion", estado: "en_uso", usuarioActual: "Torres, Camila", desde: "09:10", ultimoUsuario: "Vargas, Hugo", codigo: "7890129" },
  { id: "H-008", nombre: "Multímetro Digital", categoria: "Medicion", estado: "disponible", ultimoUsuario: "Romero, Pablo", codigo: "7890130" },
];

// Mock de usuarios por DNI
const USUARIOS_DNI = {
  "12345678": { nombre: "Pérez, Lucía",    legajo: "042", rol: "Alumna — 4to Año" },
  "23456789": { nombre: "García, Tomás",   legajo: "018", rol: "Alumno — 5to Año" },
  "34567890": { nombre: "Torres, Camila",  legajo: "031", rol: "Alumna — 3er Año" },
  "45678901": { nombre: "López, Mateo",    legajo: "055", rol: "Alumno — 4to Año" },
  "99999999": { nombre: "Rodríguez, Ana",  legajo: "P-07", rol: "Docente" },
};

const HISTORIAL = [
  { id: 1, herramienta: "Taladro Percutor Bosch", herramientaId: "H-001", usuario: "Pérez, Lucía", dni: "12345678", accion: "devolucion", hora: "09:45", fecha: "hoy" },
  { id: 2, herramienta: "Nivel Láser", herramientaId: "H-007", usuario: "Torres, Camila", dni: "34567890", accion: "retiro", hora: "09:10", fecha: "hoy" },
  { id: 3, herramienta: "Oscilante Multifunción", herramientaId: "H-004", usuario: "López, Mateo", dni: "45678901", accion: "retiro", hora: "07:30", fecha: "hoy" },
  { id: 4, herramienta: "Amoladora Angular", herramientaId: "H-002", usuario: "Pérez, Lucía", dni: "12345678", accion: "retiro", hora: "08:45", fecha: "hoy" },
  { id: 5, herramienta: "Multímetro Digital", herramientaId: "H-008", usuario: "Torres, Camila", dni: "34567890", accion: "devolucion", hora: "18:00", fecha: "ayer" },
  { id: 6, herramienta: "Sierra Caladora", herramientaId: "H-006", usuario: "García, Tomás", dni: "23456789", accion: "devolucion", hora: "17:30", fecha: "ayer" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Barlow:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0f0f0f;
    --bg2: #181818;
    --bg3: #222222;
    --border: #2e2e2e;
    --orange: #f97316;
    --orange-dim: #7c3910;
    --yellow: #facc15;
    --green: #22c55e;
    --green-dim: #14532d;
    --red: #ef4444;
    --red-dim: #7f1d1d;
    --text: #e5e5e5;
    --text-dim: #737373;
    --text-dimmer: #404040;
    --card-border: 1px solid var(--border);
    --radius: 4px;
    --font-display: 'Bebas Neue', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --font-body: 'Barlow', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .header {
    background: var(--bg);
    border-bottom: 2px solid var(--orange);
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header-logo {
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 2px;
    color: var(--text);
    line-height: 1;
  }
  .header-logo span { color: var(--orange); }
  .header-time { font-family: var(--font-mono); font-size: 12px; color: var(--text-dim); }
  .header-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--green);
    animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 430px;
    background: var(--bg2);
    border-top: 1px solid var(--border);
    display: flex;
    z-index: 100;
  }
  .nav-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 10px 4px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-dim);
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: color 0.15s;
  }
  .nav-btn.active { color: var(--orange); }
  .nav-btn svg { width: 20px; height: 20px; }

  .scroll-area { padding: 16px 16px 90px; min-height: calc(100vh - 60px); }

  .section-title {
    font-family: var(--font-display);
    font-size: 28px;
    letter-spacing: 3px;
    color: var(--text);
    margin-bottom: 4px;
  }
  .section-sub {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-dim);
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .stat-card {
    background: var(--bg2);
    border: var(--card-border);
    border-radius: var(--radius);
    padding: 14px;
    position: relative;
    overflow: hidden;
  }
  .stat-card::before { content:''; position:absolute; top:0; left:0; width:3px; height:100%; }
  .stat-card.orange::before { background: var(--orange); }
  .stat-card.green::before  { background: var(--green); }
  .stat-card.red::before    { background: var(--red); }
  .stat-card.yellow::before { background: var(--yellow); }
  .stat-num { font-family: var(--font-display); font-size: 42px; line-height: 1; color: var(--text); }
  .stat-label { font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }

  .tool-card {
    background: var(--bg2);
    border: var(--card-border);
    border-radius: var(--radius);
    padding: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .tool-card:active { border-color: var(--orange); }
  .tool-status-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .tool-status-dot.disponible { background: var(--green); }
  .tool-status-dot.en_uso { background: var(--orange); animation: pulse 2s infinite; }
  .tool-info { flex: 1; min-width: 0; }
  .tool-name { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text); }
  .tool-meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); margin-top: 2px; }
  .tool-id { font-family: var(--font-mono); font-size: 11px; color: var(--text-dimmer); }

  .badge { padding: 3px 8px; border-radius: 2px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; }
  .badge.disponible { background: var(--green-dim); color: var(--green); }
  .badge.en_uso { background: var(--orange-dim); color: var(--orange); }

  .filter-tabs { display: flex; gap: 6px; margin-bottom: 14px; overflow-x: auto; padding-bottom: 2px; }
  .filter-tabs::-webkit-scrollbar { display: none; }
  .filter-tab {
    padding: 5px 12px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border: 1px solid var(--border);
    background: none;
    color: var(--text-dim);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
  }
  .filter-tab.active { background: var(--orange); border-color: var(--orange); color: #000; }

  .search-box { position: relative; margin-bottom: 14px; }
  .search-input {
    width: 100%;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 14px 10px 36px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s;
  }
  .search-input:focus { border-color: var(--orange); }
  .search-input::placeholder { color: var(--text-dimmer); }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim); width: 16px; height: 16px; }

  /* MOVIMIENTO */
  .mov-step { background: var(--bg2); border: var(--card-border); border-radius: var(--radius); padding: 20px; margin-bottom: 12px; }
  .mov-step-num { font-family: var(--font-display); font-size: 11px; letter-spacing: 2px; color: var(--orange); margin-bottom: 8px; }
  .mov-step-title { font-size: 16px; font-weight: 700; margin-bottom: 12px; }

  .scan-zone {
    border: 2px dashed var(--border);
    border-radius: var(--radius);
    padding: 24px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .scan-zone:hover, .scan-zone.active { border-color: var(--orange); }
  .scan-zone svg { color: var(--text-dim); margin-bottom: 8px; }
  .scan-zone-text { font-size: 13px; color: var(--text-dim); font-weight: 500; }
  .scan-zone-sub { font-family: var(--font-mono); font-size: 10px; color: var(--text-dimmer); margin-top: 4px; }

  /* DNI INPUT */
  .dni-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }
  .dni-row { display: flex; gap: 8px; }
  .dni-input {
    flex: 1;
    background: var(--bg3);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 13px 14px;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    outline: none;
    transition: border-color 0.15s;
    min-width: 0;
  }
  .dni-input:focus { border-color: var(--orange); }
  .dni-input.valid { border-color: var(--green); }
  .dni-input.error { border-color: var(--red); }
  .dni-input::placeholder { color: var(--text-dimmer); font-size: 14px; letter-spacing: 1px; }
  .dni-buscar {
    padding: 0 18px;
    background: var(--orange);
    border: none;
    border-radius: var(--radius);
    color: #000;
    font-family: var(--font-display);
    font-size: 17px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: opacity 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .dni-buscar:hover { opacity: 0.85; }
  .dni-buscar:disabled { opacity: 0.3; cursor: not-allowed; }
  .dni-error { font-size: 12px; color: var(--red); margin-top: 8px; font-weight: 600; }
  .dni-hint { font-family: var(--font-mono); font-size: 10px; color: var(--text-dimmer); margin-top: 8px; }

  .toggle-group { display: flex; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 16px; }
  .toggle-btn { flex: 1; padding: 10px; background: none; border: none; color: var(--text-dim); font-family: var(--font-body); font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.15s; text-transform: uppercase; letter-spacing: 0.5px; }
  .toggle-btn.active.retiro { background: var(--orange); color: #000; }
  .toggle-btn.active.devolucion { background: var(--green); color: #000; }

  .btn-primary { width: 100%; padding: 14px; background: var(--orange); color: #000; border: none; border-radius: var(--radius); font-family: var(--font-display); font-size: 20px; letter-spacing: 2px; cursor: pointer; transition: opacity 0.15s; margin-top: 8px; }
  .btn-primary:hover { opacity: 0.85; }
  .btn-primary:disabled { opacity: 0.3; cursor: not-allowed; }

  .confirm-card { background: var(--bg2); border: 1px solid var(--green); border-radius: var(--radius); padding: 20px; text-align: center; margin-bottom: 12px; }
  .confirm-icon { font-size: 36px; margin-bottom: 10px; }
  .confirm-title { font-family: var(--font-display); font-size: 24px; letter-spacing: 2px; color: var(--green); }
  .confirm-sub { font-size: 13px; color: var(--text-dim); margin-top: 6px; }

  .hist-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .hist-item:last-child { border-bottom: none; }
  .hist-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .hist-icon svg { width: 14px; height: 14px; }
  .hist-icon.retiro { background: var(--orange-dim); color: var(--orange); }
  .hist-icon.devolucion { background: var(--green-dim); color: var(--green); }
  .hist-info { flex: 1; }
  .hist-nombre { font-size: 13px; font-weight: 600; color: var(--text); }
  .hist-usuario { font-size: 12px; color: var(--text-dim); margin-top: 2px; }
  .hist-time { font-family: var(--font-mono); font-size: 10px; color: var(--text-dimmer); text-align: right; flex-shrink: 0; }
  .date-separator { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-dimmer); padding: 10px 0 6px; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 200; display: flex; align-items: flex-end; justify-content: center; }
  .modal { background: var(--bg2); border-top: 2px solid var(--orange); border-radius: 12px 12px 0 0; padding: 20px; width: 100%; max-width: 430px; max-height: 80vh; overflow-y: auto; animation: slideUp 0.25s ease; }
  @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
  .modal-handle { width: 36px; height: 4px; background: var(--border); border-radius: 2px; margin: 0 auto 20px; }
  .modal-code { font-family: var(--font-mono); font-size: 11px; color: var(--orange); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
  .modal-title { font-size: 20px; font-weight: 700; margin-bottom: 16px; }
  .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .detail-row:last-of-type { border-bottom: none; }
  .detail-key { font-size: 12px; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; }
  .detail-val { font-size: 13px; font-weight: 600; color: var(--text); text-align: right; }
  .btn-close { width: 100%; padding: 12px; background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-dim); font-family: var(--font-body); font-size: 13px; font-weight: 700; cursor: pointer; margin-top: 16px; }

  .quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .quick-card { background: var(--bg2); border: var(--card-border); border-radius: var(--radius); padding: 16px; cursor: pointer; transition: border-color 0.15s; display: flex; flex-direction: column; gap: 8px; }
  .quick-card:active { border-color: var(--orange); }
  .quick-card svg { color: var(--orange); }
  .quick-card-label { font-size: 13px; font-weight: 700; color: var(--text); }
  .quick-card-sub { font-size: 11px; color: var(--text-dim); }

  .alert-bar { background: var(--orange-dim); border: 1px solid var(--orange); border-radius: var(--radius); padding: 10px 14px; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .alert-bar svg { color: var(--orange); flex-shrink: 0; }
  .alert-text { font-size: 12px; font-weight: 600; color: var(--orange); }

  .result-user {
    background: var(--bg3);
    border: 1px solid var(--green);
    border-radius: var(--radius);
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
  }
  .result-user-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
  .result-user-name { font-size: 14px; font-weight: 700; color: var(--text); }
  .result-user-meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); margin-top: 2px; }
`;

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  tools: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  move: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  barcode: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14"/></svg>,
  idcard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 9h4M14 12h4M14 15h2"/></svg>,
  arrowUp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5m-7 7 7-7 7 7"/></svg>,
  arrowDown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m7-7-7 7-7-7"/></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
};

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function Dashboard({ setTab }) {
  const enUso = TOOLS.filter(t => t.estado === "en_uso").length;
  const disponibles = TOOLS.filter(t => t.estado === "disponible").length;
  const recientes = HISTORIAL.filter(h => h.fecha === "hoy");

  return (
    <div className="scroll-area">
      <p className="section-sub">Sistema de control — Depósito</p>
      <h1 className="section-title">PANEL <span style={{color:"var(--orange)"}}>GRAL</span></h1>

      <div className="alert-bar">
        {Icon.warning}
        <span className="alert-text">{enUso} herramienta{enUso !== 1 ? "s" : ""} fuera del depósito ahora</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card orange"><div className="stat-num">{enUso}</div><div className="stat-label">En uso</div></div>
        <div className="stat-card green"><div className="stat-num">{disponibles}</div><div className="stat-label">Disponibles</div></div>
        <div className="stat-card yellow"><div className="stat-num">{TOOLS.length}</div><div className="stat-label">Total</div></div>
        <div className="stat-card red"><div className="stat-num">{recientes.length}</div><div className="stat-label">Movs. hoy</div></div>
      </div>

      <div className="quick-grid">
        <div className="quick-card" onClick={() => setTab("movimiento")}>
          {Icon.move}
          <div className="quick-card-label">Registrar</div>
          <div className="quick-card-sub">Retiro o devolución</div>
        </div>
        <div className="quick-card" onClick={() => setTab("herramientas")}>
          {Icon.tools}
          <div className="quick-card-label">Inventario</div>
          <div className="quick-card-sub">Ver todas</div>
        </div>
      </div>

      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
        <span style={{fontFamily:"var(--font-display)", fontSize:18, letterSpacing:2}}>ÚLTIMOS MOVIMIENTOS</span>
        <button onClick={() => setTab("historial")} style={{background:"none", border:"none", color:"var(--orange)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font-body)"}}>VER TODO →</button>
      </div>

      <div style={{background:"var(--bg2)", border:"var(--card-border)", borderRadius:"var(--radius)", padding:"0 14px"}}>
        {recientes.slice(0, 4).map(h => (
          <div className="hist-item" key={h.id}>
            <div className={`hist-icon ${h.accion}`}>{h.accion === "retiro" ? Icon.arrowUp : Icon.arrowDown}</div>
            <div className="hist-info">
              <div className="hist-nombre">{h.herramienta}</div>
              <div className="hist-usuario">{h.usuario}</div>
            </div>
            <div className="hist-time">{h.hora}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Herramientas() {
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [selected, setSelected] = useState(null);

  const filtradas = TOOLS.filter(t => {
    const matchFiltro = filtro === "todas" || t.estado === filtro || t.categoria.toLowerCase() === filtro;
    const matchBusqueda = t.nombre.toLowerCase().includes(busqueda.toLowerCase()) || t.id.toLowerCase().includes(busqueda.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  return (
    <div className="scroll-area">
      <p className="section-sub">{TOOLS.length} herramientas registradas</p>
      <h1 className="section-title">INVENTARIO</h1>

      <div className="search-box">
        <span className="search-icon">{Icon.search}</span>
        <input className="search-input" placeholder="Buscar por nombre o código..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      </div>

      <div className="filter-tabs">
        {["todas","disponible","en_uso","electrica","manual","medicion"].map(f => (
          <button key={f} className={`filter-tab ${filtro === f ? "active" : ""}`} onClick={() => setFiltro(f)}>
            {f === "en_uso" ? "En uso" : f === "electrica" ? "Eléctrica" : f === "medicion" ? "Medición" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtradas.map(t => (
        <div key={t.id} className="tool-card" onClick={() => setSelected(t)}>
          <div className={`tool-status-dot ${t.estado}`} />
          <div className="tool-info">
            <div className="tool-name">{t.nombre}</div>
            <div className="tool-meta">{t.estado === "en_uso" ? `${t.usuarioActual} · desde ${t.desde}` : `Último: ${t.ultimoUsuario}`}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div className={`badge ${t.estado}`}>{t.estado === "en_uso" ? "En uso" : "Libre"}</div>
            <div className="tool-id" style={{marginTop:4}}>{t.id}</div>
          </div>
        </div>
      ))}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-code">{selected.id} · Cód: {selected.codigo}</div>
            <div className="modal-title">{selected.nombre}</div>
            <div className="detail-row"><span className="detail-key">Estado</span><span className={`badge ${selected.estado}`}>{selected.estado === "en_uso" ? "En uso" : "Disponible"}</span></div>
            <div className="detail-row"><span className="detail-key">Categoría</span><span className="detail-val">{selected.categoria}</span></div>
            {selected.estado === "en_uso" && <>
              <div className="detail-row"><span className="detail-key">Usando ahora</span><span className="detail-val">{selected.usuarioActual}</span></div>
              <div className="detail-row"><span className="detail-key">Desde</span><span className="detail-val">{selected.desde}hs</span></div>
            </>}
            <div className="detail-row"><span className="detail-key">Último usuario</span><span className="detail-val">{selected.ultimoUsuario}</span></div>
            <button className="btn-close" onClick={() => setSelected(null)}>CERRAR</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Movimiento() {
  const [tipo, setTipo] = useState("retiro");
  const [scanStep, setScanStep] = useState("idle");
  const [toolScanned, setToolScanned] = useState(null);
  const [dni, setDni] = useState("");
  const [dniEstado, setDniEstado] = useState("idle"); // idle | found | notfound
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleScan = () => {
    setScanStep("scanning");
    setTimeout(() => { setToolScanned(TOOLS[1]); setScanStep("done"); }, 1500);
  };

  const handleBuscarDni = () => {
    const limpio = dni.replace(/\D/g, "");
    const usuario = USUARIOS_DNI[limpio];
    if (usuario) {
      setUsuarioEncontrado(usuario);
      setDniEstado("found");
    } else {
      setDniEstado("notfound");
      setUsuarioEncontrado(null);
    }
  };

  const handleDniChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 8);
    setDni(val);
    setDniEstado("idle");
    setUsuarioEncontrado(null);
  };

  const handleDniKeyDown = (e) => {
    if (e.key === "Enter" && dni.length >= 7) handleBuscarDni();
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setScanStep("idle");
      setToolScanned(null);
      setDni("");
      setDniEstado("idle");
      setUsuarioEncontrado(null);
    }, 3000);
  };

  const canConfirm = scanStep === "done" && dniEstado === "found";

  if (confirmed) return (
    <div className="scroll-area">
      <div className="confirm-card" style={{marginTop:40}}>
        <div className="confirm-icon">✓</div>
        <div className="confirm-title">{tipo === "retiro" ? "RETIRO REGISTRADO" : "DEVOLUCIÓN OK"}</div>
        <div className="confirm-sub" style={{marginTop:8}}>
          <strong>{toolScanned?.nombre}</strong><br/>
          {usuarioEncontrado?.nombre} · DNI {dni}
        </div>
      </div>
    </div>
  );

  return (
    <div className="scroll-area">
      <p className="section-sub">Escáner de herramienta + DNI del usuario</p>
      <h1 className="section-title">REGISTRO</h1>

      <div className="toggle-group">
        <button className={`toggle-btn retiro ${tipo === "retiro" ? "active" : ""}`} onClick={() => setTipo("retiro")}>↑ Retiro</button>
        <button className={`toggle-btn devolucion ${tipo === "devolucion" ? "active" : ""}`} onClick={() => setTipo("devolucion")}>↓ Devolución</button>
      </div>

      {/* PASO 1: HERRAMIENTA */}
      <div className="mov-step">
        <div className="mov-step-num">PASO 01 — HERRAMIENTA</div>
        <div className="mov-step-title">Escanear código de barras</div>
        {scanStep === "idle" && (
          <div className="scan-zone" onClick={handleScan}>
            <div style={{display:"flex", justifyContent:"center", marginBottom:8}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color:"var(--text-dim)"}}><path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14"/></svg>
            </div>
            <div className="scan-zone-text">Toca para escanear</div>
            <div className="scan-zone-sub">Lector USB conectado a la PC</div>
          </div>
        )}
        {scanStep === "scanning" && (
          <div className="scan-zone active">
            <div className="scan-zone-text" style={{color:"var(--orange)"}}>Leyendo código...</div>
          </div>
        )}
        {scanStep === "done" && toolScanned && (
          <div style={{background:"var(--bg3)", borderRadius:"var(--radius)", padding:"12px 14px", display:"flex", alignItems:"center", gap:10}}>
            <div style={{width:8, height:8, borderRadius:"50%", background:"var(--green)", flexShrink:0}} />
            <div>
              <div style={{fontWeight:700, fontSize:14}}>{toolScanned.nombre}</div>
              <div style={{fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-dim)", marginTop:2}}>{toolScanned.id} · Cód: {toolScanned.codigo}</div>
            </div>
          </div>
        )}
      </div>

      {/* PASO 2: DNI */}
      <div className="mov-step">
        <div className="mov-step-num">PASO 02 — USUARIO</div>
        <div className="mov-step-title">Ingresar número de DNI</div>

        <div className="dni-label">DNI (sin puntos)</div>
        <div className="dni-row">
          <input
            className={`dni-input ${dniEstado === "found" ? "valid" : dniEstado === "notfound" ? "error" : ""}`}
            type="text"
            inputMode="numeric"
            placeholder="Ej: 12345678"
            value={dni}
            onChange={handleDniChange}
            onKeyDown={handleDniKeyDown}
            maxLength={8}
          />
          <button
            className="dni-buscar"
            onClick={handleBuscarDni}
            disabled={dni.length < 7}
          >
            BUSCAR
          </button>
        </div>

        {dniEstado === "notfound" && (
          <div className="dni-error">⚠ DNI no encontrado en el sistema</div>
        )}
        {dniEstado === "idle" && dni.length === 0 && (
          <div className="dni-hint">Probá con: 12345678 · 23456789 · 99999999</div>
        )}

        {dniEstado === "found" && usuarioEncontrado && (
          <div className="result-user">
            <div className="result-user-dot" />
            <div>
              <div className="result-user-name">{usuarioEncontrado.nombre}</div>
              <div className="result-user-meta">Leg. {usuarioEncontrado.legajo} · {usuarioEncontrado.rol}</div>
            </div>
          </div>
        )}
      </div>

      <button className="btn-primary" disabled={!canConfirm} onClick={handleConfirm}>
        CONFIRMAR {tipo === "retiro" ? "RETIRO" : "DEVOLUCIÓN"}
      </button>
    </div>
  );
}

function Historial() {
  const today = HISTORIAL.filter(h => h.fecha === "hoy");
  const yesterday = HISTORIAL.filter(h => h.fecha === "ayer");

  const HistList = ({ items }) => (
    <div style={{background:"var(--bg2)", border:"var(--card-border)", borderRadius:"var(--radius)", padding:"0 14px"}}>
      {items.map(h => (
        <div className="hist-item" key={h.id}>
          <div className={`hist-icon ${h.accion}`}>{h.accion === "retiro" ? Icon.arrowUp : Icon.arrowDown}</div>
          <div className="hist-info">
            <div className="hist-nombre">{h.herramienta}</div>
            <div className="hist-usuario">
              {h.usuario} · DNI {h.dni} ·{" "}
              <span style={{color: h.accion === "retiro" ? "var(--orange)" : "var(--green)", fontWeight:600}}>
                {h.accion === "retiro" ? "Retiró" : "Devolvió"}
              </span>
            </div>
          </div>
          <div className="hist-time">{h.hora}hs</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="scroll-area">
      <p className="section-sub">{HISTORIAL.length} registros totales</p>
      <h1 className="section-title">HISTORIAL</h1>
      <div className="date-separator">— Hoy</div>
      <HistList items={today} />
      <div className="date-separator" style={{marginTop:16}}>— Ayer</div>
      <HistList items={yesterday} />
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const time = new Date().toLocaleTimeString("es-AR", {hour:"2-digit", minute:"2-digit"});

  const tabs = [
    { id: "dashboard",    label: "Inicio",    icon: Icon.home },
    { id: "herramientas", label: "Inventario", icon: Icon.tools },
    { id: "movimiento",   label: "Registrar",  icon: Icon.move },
    { id: "historial",    label: "Historial",  icon: Icon.history },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="header">
        <div className="header-logo">DEPÓ<span>SIT</span>O</div>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          <span className="header-time">{time}</span>
          <div className="header-dot" />
        </div>
      </div>

      {tab === "dashboard"    && <Dashboard setTab={setTab} />}
      {tab === "herramientas" && <Herramientas />}
      {tab === "movimiento"   && <Movimiento />}
      {tab === "historial"    && <Historial />}

      <nav className="nav">
        {tabs.map(t => (
          <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.icon}{t.label}
          </button>
        ))}
      </nav>
    </>
  );
}
