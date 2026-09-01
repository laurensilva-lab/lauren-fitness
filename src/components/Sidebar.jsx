// ============================================================
// COMPONENTE: Sidebar
// Navegación lateral para desktop (768px+)
// En móvil este componente no se muestra (se usa BottomNav)
// ============================================================

const IconDumbbell = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#0a0a0a" : "#a8a8a8"} strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16M18 4v16"/>
    <path d="M3 8h3M18 8h3M3 16h3M18 16h3"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
  </svg>
);

const IconFlame = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#0a0a0a" : "#a8a8a8"} strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
    <path d="M12 17c0 1.1-.9 2-2 2"/>
  </svg>
);

const IconInfo = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#0a0a0a" : "#a8a8a8"} strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="8" x2="12" y2="8.5"/>
    <line x1="12" y1="11" x2="12" y2="16"/>
  </svg>
);

export default function Sidebar({ activePage, onNavigate }) {
  const tabs = [
    { id: "meses",         Icon: IconDumbbell, label: "Rutina"       },
    { id: "calentamiento", Icon: IconFlame,    label: "Entrada"      },
    { id: "info",          Icon: IconInfo,     label: "Programa"     },
  ];

  return (
    <aside style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logoWrap}>
        <div style={styles.logoDot} />
        <span style={styles.logoText}>LAUREN</span>
        <span style={styles.logoSub}>.FIT</span>
      </div>

      {/* Línea separadora */}
      <div style={styles.divider} />

      {/* Nav items */}
      <nav style={styles.nav}>
        {tabs.map(({ id, Icon, label }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              style={{ ...styles.item, ...(active ? styles.itemActive : {}) }}
              onClick={() => onNavigate(id)}
            >
              {/* Barra lateral activa */}
              {active && <span style={styles.activeBar} />}
              <Icon active={active} />
              <span style={{ ...styles.label, ...(active ? styles.labelActive : {}) }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer del sidebar */}
      <div style={styles.footer}>
        <div style={styles.footerLine} />
        <span style={styles.footerText}>v1.0 · 2025</span>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    flexShrink: 0,
    height: "100vh",
    position: "sticky",
    top: 0,
    borderRight: "1px solid #eeeeee",
    background: "#fafafa",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    gap: "0",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "0 20px 0 20px",
    marginBottom: "4px",
  },
  logoDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#0a0a0a",
    boxShadow: "0 0 0 2px rgba(10,10,10,0.12)",
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    fontWeight: "700",
    color: "#0a0a0a",
    letterSpacing: "0.06em",
  },
  logoSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    fontWeight: "400",
    color: "#a8a8a8",
    letterSpacing: "0.06em",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e4e4e4 30%, #e4e4e4 70%, transparent)",
    margin: "16px 0",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "0 10px",
    flex: 1,
  },
  item: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    transition: "background 150ms ease",
    width: "100%",
  },
  itemActive: {
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1px solid #eeeeee",
  },
  activeBar: {
    position: "absolute",
    left: 0,
    top: "20%",
    bottom: "20%",
    width: "2px",
    background: "#0a0a0a",
    borderRadius: "0 2px 2px 0",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#a8a8a8",
    letterSpacing: "0.01em",
  },
  labelActive: { color: "#0a0a0a" },
  footer: {
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  footerLine: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e4e4e4 50%, transparent)",
    marginBottom: "8px",
  },
  footerText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    color: "#d1d1d1",
    letterSpacing: "0.06em",
  },
};
