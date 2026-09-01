// ============================================================
// COMPONENTE: ExerciseCard
// Tarjeta de ejercicio — estilo tech minimalista
// SVG inline para íconos, animaciones de entrada
// ============================================================
import VideoPlayer from "./VideoPlayer";

// Ícono chevron para el toggle
const IconChevron = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#a8a8a8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 220ms cubic-bezier(0.16,1,0.3,1)",
             transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// Ícono play para video
const IconPlay = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

export default function ExerciseCard({ exercise, index, expanded, onToggle }) {
  const { nombre, series, reps, rir, kg, videoId, metodo } = exercise;

  return (
    <div style={{ ...styles.card, ...(expanded ? styles.cardExpanded : {}) }}>

      {/* ─── Cabecera ─── */}
      <button style={styles.header} onClick={onToggle}>
        {/* Número con estilo terminal */}
        <span style={styles.index}>
          <span style={styles.indexText}>{String(index + 1).padStart(2, "0")}</span>
        </span>

        <span style={styles.name}>{nombre}</span>

        {/* Pills de datos compactos */}
        <span style={styles.pillRow}>
          <span style={styles.pill}>{series}×{reps}</span>
        </span>

        <IconChevron open={expanded} />
      </button>

      {/* ─── Detalle expandido ─── */}
      {expanded && (
        <div style={styles.detail}>
          {/* Separador con gradiente */}
          <div style={styles.divider} />

          {/* Grid de stats */}
          <div style={styles.statsGrid}>
            <StatCell label="SERIES" value={series} />
            <StatCell label="REPS" value={reps} mono />
            {rir && rir !== "-" && rir !== "--" && (
              <StatCell label="RIR" value={rir} />
            )}
            {kg && kg !== "-" && (
              <StatCell label="PESO" value={kg} mono />
            )}
          </div>

          {/* Método especial */}
          {metodo && (
            <div style={styles.metodoBadge}>
              <span style={styles.metodoIcon}>◆</span>
              {metodo}
            </div>
          )}

          {/* Video */}
          {videoId && (
            <div style={styles.videoWrapper}>
              <div style={styles.videoLabel}>
                <IconPlay /> Tutorial
              </div>
              <VideoPlayer videoId={videoId} title={nombre} />
            </div>
          )}
          {!videoId && (
            <div style={styles.noVideo}>
              <IconPlay />
              <span>Sin video — próximamente</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-componente: celda de estadística
function StatCell({ label, value, mono }) {
  return (
    <div style={statStyles.cell}>
      <span style={statStyles.label}>{label}</span>
      <span style={{ ...statStyles.value, ...(mono ? statStyles.mono : {}) }}>
        {value}
      </span>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "10px",
    border: "1px solid #eeeeee",
    background: "#fff",
    marginBottom: "6px",
    overflow: "hidden",
    transition: "border-color 220ms ease, box-shadow 220ms ease",
  },
  cardExpanded: {
    borderColor: "#d1d1d1",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "12px 14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
  },
  // Número estilo terminal
  index: {
    width: "28px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  indexText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    fontWeight: "700",
    color: "#a8a8a8",
    letterSpacing: "-0.02em",
  },
  name: {
    flex: 1,
    fontSize: "13.5px",
    fontWeight: "600",
    color: "#0a0a0a",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  pillRow: { display: "flex", gap: "4px", flexShrink: 0 },
  pill: {
    padding: "3px 8px",
    background: "#f5f5f5",
    borderRadius: "99px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#737373",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.02em",
  },
  detail: { padding: "0 14px 14px" },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e4e4e4 20%, #e4e4e4 80%, transparent)",
    marginBottom: "12px",
  },
  statsGrid: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  metodoBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "10px",
    padding: "4px 10px",
    background: "#0a0a0a",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  },
  metodoIcon: { fontSize: "8px" },
  videoWrapper: { marginTop: "12px" },
  videoLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "10px",
    fontWeight: "700",
    color: "#a8a8a8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "6px",
    fontFamily: "'JetBrains Mono', monospace",
  },
  noVideo: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginTop: "10px",
    padding: "9px 12px",
    border: "1px dashed #e4e4e4",
    borderRadius: "8px",
    color: "#a8a8a8",
    fontSize: "12px",
  },
};

const statStyles = {
  cell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    padding: "8px 12px",
    background: "#fafafa",
    border: "1px solid #eeeeee",
    borderRadius: "8px",
    minWidth: "54px",
  },
  label: {
    fontSize: "9px",
    color: "#a8a8a8",
    fontWeight: "700",
    letterSpacing: "0.1em",
    fontFamily: "'JetBrains Mono', monospace",
  },
  value: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#0a0a0a",
    lineHeight: 1,
  },
  mono: { fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" },
};
