// ============================================================
// COMPONENTE: BottomNav
// Barra de navegación inferior con íconos SVG lineales
// Sin emojis — iconografía técnica y limpia
// ============================================================

// ── Íconos SVG lineales (sin color, solo stroke negro/gris) ──
const IconDumbbell = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#0a0a0a" : "#a8a8a8"} strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16M18 4v16"/>
    <path d="M3 8h3M18 8h3M3 16h3M18 16h3"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
  </svg>
);

const IconFlame = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#0a0a0a" : "#a8a8a8"} strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
    <path d="M12 17c0 1.1-.9 2-2 2"/>
  </svg>
);

const IconInfo = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#0a0a0a" : "#a8a8a8"} strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="8" x2="12" y2="8.5"/>
    <line x1="12" y1="11" x2="12" y2="16"/>
  </svg>
);

export default function BottomNav({ activePage, onNavigate }) {
  const tabs = [
    { id: "meses",         Icon: IconDumbbell, label: "Rutina"  },
    { id: "calentamiento", Icon: IconFlame,    label: "Entrada" },
    { id: "info",          Icon: IconInfo,     label: "Info"    },
  ];

  return (
    <nav style={styles.nav}>
      {/* Línea superior con gradiente — efecto tech */}
      <div style={styles.topLine} />

      {tabs.map((tab) => {
        const active = activePage === tab.id;
        return (
          <button
            key={tab.id}
            style={{ ...styles.tab, ...(active ? styles.tabActive : {}) }}
            onClick={() => onNavigate(tab.id)}
          >
            {/* Indicador activo — línea superior animada */}
            {active && <span style={styles.activeBar} />}

            <tab.Icon active={active} />

            <span style={{ ...styles.label, ...(active ? styles.labelActive : {}) }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: "480px",
    margin: "0 auto",
    height: "64px",
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(16px) saturate(1.4)",
    WebkitBackdropFilter: "blur(16px) saturate(1.4)",
    display: "flex",
    alignItems: "stretch",
    paddingBottom: "env(safe-area-inset-bottom)",
    zIndex: 100,
    boxShadow: "0 -1px 0 #e4e4e4, 0 -8px 24px rgba(0,0,0,0.06)",
  },
  // Línea superior con gradiente
  topLine: {
    position: "absolute",
    top: 0,
    left: "10%",
    right: "10%",
    height: "1px",
    background: "linear-gradient(90deg, transparent, #d1d1d1 30%, #a8a8a8 50%, #d1d1d1 70%, transparent)",
  },
  tab: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: "8px 0",
    position: "relative",
    transition: "opacity 120ms ease",
  },
  tabActive: {},
  // Barra activa encima del ícono
  activeBar: {
    position: "absolute",
    top: 0,
    left: "28%",
    right: "28%",
    height: "2px",
    background: "#0a0a0a",
    borderRadius: "0 0 2px 2px",
  },
  label: {
    fontSize: "9px",
    fontWeight: "600",
    color: "#a8a8a8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  },
  labelActive: { color: "#0a0a0a" },
};
