// ============================================================
// COMPONENTE: CalendarScreen
// Calendario para marcar los días que entrenaste.
// Los datos persisten en localStorage.
// ============================================================
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// ── Íconos SVG ──────────────────────────────────────────────
const IconChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconDumbbell = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
  </svg>
);
const IconFlame = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
  </svg>
);
const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const DIAS_SEMANA = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const MESES_ES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

// Formato de clave: "YYYY-MM-DD"
const toKey = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

export default function CalendarScreen() {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,  setSelected]  = useState(null); // día seleccionado para editar nota
  // trainedDays: { "2025-03-14": { tipo: "Fuerza", nota: "..." }, ... }
  const [trainedDays, setTrainedDays] = useLocalStorage("lauren_trained_days", {});

  // ── Navegación de mes ────────────────────────────────────
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelected(null);
  };

  // ── Datos del mes actual ─────────────────────────────────
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=dom
  // Convertir a lunes=0
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  // ── Toggle día entrenado ─────────────────────────────────
  const toggleDay = (day) => {
    const key = toKey(viewYear, viewMonth, day);
    setTrainedDays(prev => {
      if (prev[key]) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: { tipo: "Entrenamiento", nota: "" } };
    });
    setSelected(key);
  };

  // ── Actualizar nota de un día ────────────────────────────
  const updateNota = (key, nota) => {
    setTrainedDays(prev => ({ ...prev, [key]: { ...prev[key], nota } }));
  };

  // ── Actualizar tipo de sesión ────────────────────────────
  const updateTipo = (key, tipo) => {
    setTrainedDays(prev => ({ ...prev, [key]: { ...prev[key], tipo } }));
  };

  // ── Eliminar día ─────────────────────────────────────────
  const removeDay = (key) => {
    setTrainedDays(prev => { const n = { ...prev }; delete n[key]; return n; });
    setSelected(null);
  };

  // ── Estadísticas del mes ─────────────────────────────────
  const daysThisMonth = Object.keys(trainedDays).filter(k =>
    k.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2,"0")}`)
  ).length;
  const totalDays = Object.keys(trainedDays).length;

  // ── Días del mes en array ────────────────────────────────
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedData = selected ? trainedDays[selected] : null;

  return (
    <div style={s.container}>

      {/* ─── Stats strip ─── */}
      <div style={s.statsRow} className="anim-fade-up">
        <StatBox label="ESTE MES" value={daysThisMonth} unit="días" />
        <StatBox label="TOTAL"    value={totalDays}     unit="días" />
        <StatBox label="SEMANA"   value={getWeekCount(trainedDays)} unit="días" />
      </div>

      {/* ─── Navegación de mes ─── */}
      <div style={s.navRow} className="anim-fade-up">
        <button style={s.navBtn} onClick={prevMonth}><IconChevronLeft /></button>
        <div style={s.monthTitle}>
          <span style={s.monthName}>{MESES_ES[viewMonth]}</span>
          <span style={s.yearLabel}>{viewYear}</span>
        </div>
        <button style={s.navBtn} onClick={nextMonth}><IconChevronRight /></button>
      </div>

      {/* ─── Grilla del calendario ─── */}
      <div style={s.calWrap} className="anim-fade-up">
        {/* Headers días de semana */}
        <div style={s.weekRow}>
          {DIAS_SEMANA.map(d => (
            <div key={d} style={s.weekLabel}>{d}</div>
          ))}
        </div>

        {/* Días */}
        <div style={s.grid}>
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const key     = toKey(viewYear, viewMonth, day);
            const trained = !!trainedDays[key];
            const isToday = key === todayKey;
            const isSel   = key === selected;

            return (
              <button
                key={key}
                style={{
                  ...s.dayBtn,
                  ...(trained ? s.dayTrained : {}),
                  ...(isToday  ? s.dayToday  : {}),
                  ...(isSel    ? s.daySelected : {}),
                }}
                onClick={() => { toggleDay(day); }}
              >
                <span style={trained ? s.dayNumTrained : isToday ? s.dayNumToday : s.dayNum}>
                  {day}
                </span>
                {trained && (
                  <span style={s.trainedDot} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Panel de edición del día seleccionado ─── */}
      {selected && selectedData && (
        <div style={s.editPanel} className="anim-expand">
          <div style={s.editHeader}>
            <div style={s.editDate}>
              <span style={s.editDateNum}>{parseInt(selected.split("-")[2])}</span>
              <span style={s.editDateMonth}>{MESES_ES[parseInt(selected.split("-")[1]) - 1]}</span>
            </div>
            <button style={s.deleteBtn} onClick={() => removeDay(selected)}>
              <IconTrash />
            </button>
          </div>

          {/* Tipo de sesión */}
          <div style={s.editSection}>
            <span style={s.editLabel}>TIPO DE SESIÓN</span>
            <div style={s.tipoRow}>
              {["Fuerza", "Hipertrofia", "Full Body", "Cardio", "Descanso activo"].map(t => (
                <button
                  key={t}
                  style={{ ...s.tipoBtn, ...(selectedData.tipo === t ? s.tipoBtnActive : {}) }}
                  onClick={() => updateTipo(selected, t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Nota libre */}
          <div style={s.editSection}>
            <span style={s.editLabel}>NOTA</span>
            <textarea
              style={s.textarea}
              placeholder="¿Cómo fue el entrenamiento? ¿Nuevos pesos? ¿Cómo te sentiste?"
              value={selectedData.nota || ""}
              onChange={e => updateNota(selected, e.target.value)}
              rows={3}
            />
          </div>
        </div>
      )}

      {/* ─── Historial reciente ─── */}
      <div style={s.historySection} className="anim-fade-up">
        <div style={s.historyHeader}>
          <span style={s.historyTitle}>HISTORIAL RECIENTE</span>
        </div>
        {Object.entries(trainedDays)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .slice(0, 8)
          .map(([key, data]) => (
            <HistoryItem key={key} dateKey={key} data={data} onSelect={() => {
              const [y, m, d] = key.split("-").map(Number);
              setViewYear(y);
              setViewMonth(m - 1);
              setSelected(key);
            }} />
          ))}
        {Object.keys(trainedDays).length === 0 && (
          <div style={s.emptyHistory}>
            <IconDumbbell />
            <span>Todavía no marcaste ningún entrenamiento.</span>
          </div>
        )}
      </div>

    </div>
  );
}

// ── Sub-componentes ─────────────────────────────────────────

function StatBox({ label, value, unit }) {
  return (
    <div style={sb.box}>
      <span style={sb.label}>{label}</span>
      <div style={sb.valueRow}>
        <span style={sb.value}>{value}</span>
        <span style={sb.unit}>{unit}</span>
      </div>
    </div>
  );
}

function HistoryItem({ dateKey, data, onSelect }) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const dayName = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"][date.getDay()];

  return (
    <button style={hi.row} onClick={onSelect}>
      <div style={hi.dateCol}>
        <span style={hi.dayName}>{dayName}</span>
        <span style={hi.dateNum}>{d}/{m}</span>
      </div>
      <div style={hi.dot} />
      <div style={hi.content}>
        <span style={hi.tipo}>{data.tipo}</span>
        {data.nota && <span style={hi.nota}>{data.nota}</span>}
      </div>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333"
        strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  );
}

// ── Helpers ─────────────────────────────────────────────────
function getWeekCount(trainedDays) {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  monday.setHours(0,0,0,0);
  return Object.keys(trainedDays).filter(k => new Date(k) >= monday).length;
}

// ── Estilos ─────────────────────────────────────────────────
const s = {
  container: { display: "flex", flexDirection: "column", gap: "16px" },

  // Stats
  statsRow: { display: "flex", gap: "8px" },

  // Navegación mes
  navRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "4px 0",
  },
  navBtn: {
    width: "36px", height: "36px", borderRadius: "8px",
    border: "1px solid #1e1e1e", background: "#111",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#555", cursor: "pointer",
    transition: "all 220ms ease",
  },
  monthTitle: { display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" },
  monthName: { fontSize: "18px", fontWeight: "800", color: "#e0e0e0", letterSpacing: "-0.02em" },
  yearLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#444", letterSpacing: "0.06em" },

  // Calendario
  calWrap: { background: "#0e0e0e", borderRadius: "14px", border: "1px solid #1e1e1e", padding: "16px", overflow: "hidden" },
  weekRow: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "8px" },
  weekLabel: {
    textAlign: "center", fontFamily: "'JetBrains Mono',monospace",
    fontSize: "10px", fontWeight: "700", color: "#333", letterSpacing: "0.06em", padding: "4px 0",
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" },
  dayBtn: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    aspectRatio: "1", borderRadius: "8px", border: "1px solid transparent",
    background: "none", cursor: "pointer", fontFamily: "inherit",
    transition: "all 220ms cubic-bezier(0.16,1,0.3,1)",
    gap: "2px", padding: "2px",
  },
  dayTrained: {
    background: "#fff",
    border: "1px solid #fff",
    boxShadow: "0 0 12px rgba(255,255,255,0.15)",
  },
  dayToday: {
    border: "1px solid #333",
    background: "#161616",
  },
  daySelected: {
    border: "1px solid #555",
  },
  dayNum:        { fontSize: "13px", fontWeight: "600", color: "#444", lineHeight: 1 },
  dayNumTrained: { fontSize: "13px", fontWeight: "700", color: "#000", lineHeight: 1 },
  dayNumToday:   { fontSize: "13px", fontWeight: "700", color: "#e0e0e0", lineHeight: 1 },
  trainedDot: {
    width: "4px", height: "4px", borderRadius: "50%", background: "#000", opacity: 0.4,
  },

  // Panel edición
  editPanel: {
    background: "#111", border: "1px solid #2a2a2a", borderRadius: "14px",
    padding: "16px", display: "flex", flexDirection: "column", gap: "14px",
  },
  editHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  editDate: { display: "flex", alignItems: "baseline", gap: "6px" },
  editDateNum: { fontSize: "28px", fontWeight: "800", color: "#f0f0f0", letterSpacing: "-0.03em", fontFamily: "'JetBrains Mono',monospace" },
  editDateMonth: { fontSize: "14px", color: "#555", fontWeight: "600" },
  deleteBtn: {
    width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #2a2a2a",
    background: "none", display: "flex", alignItems: "center", justifyContent: "center",
    color: "#444", cursor: "pointer", transition: "all 200ms ease",
  },
  editSection: { display: "flex", flexDirection: "column", gap: "8px" },
  editLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", fontWeight: "700", color: "#333", letterSpacing: "0.12em" },
  tipoRow: { display: "flex", gap: "6px", flexWrap: "wrap" },
  tipoBtn: {
    padding: "5px 10px", borderRadius: "99px", border: "1px solid #1e1e1e",
    background: "none", fontSize: "11px", fontWeight: "600", color: "#444",
    cursor: "pointer", fontFamily: "inherit", transition: "all 200ms ease",
  },
  tipoBtnActive: { background: "#fff", border: "1px solid #fff", color: "#000" },
  textarea: {
    width: "100%", background: "#0a0a0a", border: "1px solid #1e1e1e",
    borderRadius: "8px", padding: "10px 12px", color: "#b0b0b0",
    fontSize: "13px", lineHeight: 1.6, resize: "none", outline: "none",
    fontFamily: "inherit", transition: "border-color 200ms ease",
  },

  // Historial
  historySection: { display: "flex", flexDirection: "column", gap: "0" },
  historyHeader: {
    paddingBottom: "10px", borderBottom: "1px solid #1a1a1a", marginBottom: "4px",
  },
  historyTitle: {
    fontFamily: "'JetBrains Mono',monospace", fontSize: "10px",
    fontWeight: "700", color: "#333", letterSpacing: "0.12em",
  },
  emptyHistory: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "16px 0", color: "#333", fontSize: "13px", fontStyle: "italic",
  },
};

const sb = {
  box: {
    flex: 1, display: "flex", flexDirection: "column", gap: "4px",
    padding: "12px", background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px",
  },
  label: { fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", fontWeight: "700", color: "#333", letterSpacing: "0.12em" },
  valueRow: { display: "flex", alignItems: "baseline", gap: "4px" },
  value: { fontFamily: "'JetBrains Mono',monospace", fontSize: "22px", fontWeight: "700", color: "#f0f0f0", lineHeight: 1 },
  unit:  { fontSize: "11px", color: "#444", fontWeight: "500" },
};

const hi = {
  row: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "12px 0", borderBottom: "1px solid #111",
    background: "none", border_bottom: "1px solid #111",
    cursor: "pointer", fontFamily: "inherit", textAlign: "left", width: "100%",
    borderTop: "none", borderLeft: "none", borderRight: "none",
    borderBottom: "1px solid #141414",
    transition: "opacity 200ms ease",
  },
  dateCol: { display: "flex", flexDirection: "column", alignItems: "center", minWidth: "32px" },
  dayName: { fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#333", fontWeight: "700", letterSpacing: "0.06em" },
  dateNum: { fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: "#666", fontWeight: "700" },
  dot: { width: "1px", alignSelf: "stretch", background: "#1e1e1e", flexShrink: 0 },
  content: { flex: 1, display: "flex", flexDirection: "column", gap: "2px" },
  tipo:    { fontSize: "13px", fontWeight: "600", color: "#c0c0c0" },
  nota:    { fontSize: "11px", color: "#444", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" },
};
