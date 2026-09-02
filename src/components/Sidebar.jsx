const IconDumbbell = ({ active }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#555"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "stroke 280ms ease" }}>
    <path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
  </svg>
);
const IconFlame = ({ active }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#555"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "stroke 280ms ease" }}>
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
  </svg>
);
const IconCalendar = ({ active }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#555"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "stroke 280ms ease" }}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);
const IconInfo = ({ active }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#555"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "stroke 280ms ease" }}>
    <circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="8" x2="12" y2="8.5"/>
    <line x1="12" y1="11" x2="12" y2="16"/>
  </svg>
);

export default function Sidebar({ activePage, onNavigate }) {
  const tabs = [
    { id: "meses",         Icon: IconDumbbell, label: "Rutina"    },
    { id: "calentamiento", Icon: IconFlame,    label: "Entrada"   },
    { id: "calendario",    Icon: IconCalendar, label: "Calendario"},
    { id: "info",          Icon: IconInfo,     label: "Programa"  },
  ];

  return (
    <aside style={s.sidebar}>
      <div style={s.logoWrap}>
        <span style={s.dot} />
        <span style={s.logoText}>LAUREN</span>
        <span style={s.logoSub}>.FIT</span>
      </div>
      <div style={s.divider} />
      <nav style={s.nav}>
        {tabs.map(({ id, Icon, label }) => {
          const active = activePage === id;
          return (
            <button key={id} style={{ ...s.item, ...(active ? s.itemActive : {}) }} onClick={() => onNavigate(id)}>
              {active && <span style={s.activeBar} />}
              <Icon active={active} />
              <span style={{ ...s.label, ...(active ? s.labelActive : {}) }}>{label}</span>
            </button>
          );
        })}
      </nav>
      <div style={s.footer}>
        <div style={s.footerLine} />
        <span style={s.footerText}>v1.0 · 2025</span>
      </div>
    </aside>
  );
}

const s = {
  sidebar: { width: "200px", flexShrink: 0, height: "100vh", position: "sticky", top: 0, borderRight: "1px solid #1a1a1a", background: "#0d0d0d", display: "flex", flexDirection: "column", padding: "24px 0" },
  logoWrap: { display: "flex", alignItems: "center", gap: "7px", padding: "0 20px", marginBottom: "4px" },
  dot: { width: "7px", height: "7px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.6)", flexShrink: 0, animation: "pulseGlow 2.5s ease-in-out infinite" },
  logoText: { fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", fontWeight: "700", color: "#f0f0f0", letterSpacing: "0.06em" },
  logoSub:  { fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", fontWeight: "400", color: "#333", letterSpacing: "0.06em" },
  divider: { height: "1px", background: "linear-gradient(90deg, transparent, #222 30%, #2a2a2a 50%, #222 70%, transparent)", margin: "18px 0" },
  nav: { display: "flex", flexDirection: "column", gap: "3px", padding: "0 10px", flex: 1 },
  item: { position: "relative", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", border: "1px solid transparent", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", width: "100%", transition: "all 260ms cubic-bezier(0.16,1,0.3,1)" },
  itemActive: { background: "#1a1a1a", border: "1px solid #2a2a2a", boxShadow: "0 2px 12px rgba(0,0,0,0.4)" },
  activeBar: { position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px", background: "#fff", borderRadius: "0 2px 2px 0", boxShadow: "0 0 8px rgba(255,255,255,0.5)" },
  label: { fontSize: "13px", fontWeight: "600", color: "#444", transition: "color 280ms ease" },
  labelActive: { color: "#f0f0f0" },
  footer: { padding: "0 20px", display: "flex", flexDirection: "column", gap: "8px" },
  footerLine: { height: "1px", background: "linear-gradient(90deg, transparent, #1e1e1e 50%, transparent)", marginBottom: "8px" },
  footerText: { fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#2a2a2a", letterSpacing: "0.06em" },
};
