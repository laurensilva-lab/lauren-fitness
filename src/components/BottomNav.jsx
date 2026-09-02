const IconDumbbell = ({ active }) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#444"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "stroke 280ms ease" }}>
    <path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
  </svg>
);
const IconFlame = ({ active }) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#444"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "stroke 280ms ease" }}>
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
  </svg>
);
const IconInfo = ({ active }) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#444"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "stroke 280ms ease" }}>
    <circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/>
  </svg>
);

export default function BottomNav({ activePage, onNavigate }) {
  const tabs = [
    { id: "meses",         Icon: IconDumbbell, label: "Rutina"  },
    { id: "calentamiento", Icon: IconFlame,    label: "Entrada" },
    { id: "info",          Icon: IconInfo,     label: "Info"    },
  ];
  return (
    <nav style={s.nav}>
      <div style={s.topLine} />
      {tabs.map(({ id, Icon, label }) => {
        const active = activePage === id;
        return (
          <button key={id} style={{ ...s.tab, ...(active ? s.tabActive : {}) }} onClick={() => onNavigate(id)}>
            {active && <span style={s.activeBar} />}
            <span style={s.iconWrap}><Icon active={active} /></span>
            <span style={{ ...s.label, ...(active ? s.labelActive : {}) }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

const s = {
  nav: {
    position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: "480px", margin: "0 auto",
    height: "64px",
    background: "rgba(10,10,10,0.92)",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    borderTop: "1px solid #1e1e1e",
    display: "flex", alignItems: "stretch",
    paddingBottom: "env(safe-area-inset-bottom)",
    zIndex: 100, boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
  },
  topLine: {
    position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
    background: "linear-gradient(90deg, transparent, #2a2a2a 30%, #3a3a3a 50%, #2a2a2a 70%, transparent)",
  },
  tab: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: "3px", background: "none", border: "none",
    cursor: "pointer", fontFamily: "inherit", padding: "8px 0", position: "relative",
    transition: "opacity 200ms ease",
  },
  tabActive: {},
  activeBar: {
    position: "absolute", top: 0, left: "30%", right: "30%", height: "1.5px",
    background: "#fff", borderRadius: "0 0 2px 2px",
    boxShadow: "0 0 8px rgba(255,255,255,0.6)",
  },
  iconWrap: { display: "flex", transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)" },
  label: {
    fontSize: "9px", fontWeight: "600", color: "#444",
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
    transition: "color 280ms ease",
  },
  labelActive: { color: "#a0a0a0" },
};
