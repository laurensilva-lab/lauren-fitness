const Icon = ({ path, active }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#fff" : "#555"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "all 280ms ease", filter: active ? "drop-shadow(0 0 5px rgba(255,255,255,0.5))" : "none" }}>
    {path}
  </svg>
);

const tabs = [
  { id: "meses", label: "Rutina",
    icon: (a) => <Icon active={a} path={<><path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/><line x1="6" y1="12" x2="18" y2="12"/></>} /> },
  { id: "calentamiento", label: "Entrada",
    icon: (a) => <Icon active={a} path={<path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>} /> },
  { id: "calendario", label: "Calendario",
    icon: (a) => <Icon active={a} path={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} /> },
  { id: "info", label: "Programa",
    icon: (a) => <Icon active={a} path={<><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/></>} /> },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={{
      width: "210px", flexShrink: 0, height: "100vh", position: "sticky", top: 0,
      background: "linear-gradient(180deg, #0d0d0d 0%, #090909 100%)",
      borderRight: "1px solid #1a1a1a",
      boxShadow: "1px 0 0 rgba(255,255,255,0.03), 4px 0 24px rgba(0,0,0,0.5)",
      display: "flex", flexDirection: "column", padding: "28px 0",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 20px", marginBottom: "6px" }}>
        <span style={{
          width: "8px", height: "8px", borderRadius: "50%", background: "#fff", flexShrink: 0,
          boxShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)",
          animation: "pulseGlow 2.5s ease-in-out infinite",
        }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700", color: "#f0f0f0", letterSpacing: "0.06em" }}>LAUREN</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "400", color: "#2a2a2a", letterSpacing: "0.06em" }}>.FIT</span>
      </div>

      {/* Divider */}
      <div className="divider-grad" style={{ margin: "16px 0" }} />

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "0 12px", flex: 1 }}>
        {tabs.map(({ id, label, icon }) => {
          const active = activePage === id;
          return (
            <button key={id} onClick={() => onNavigate(id)} style={{
              position: "relative", display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "10px", width: "100%",
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              background: active
                ? "linear-gradient(135deg, #1e1e1e 0%, #161616 100%)"
                : "none",
              border: active ? "1px solid #2e2e2e" : "1px solid transparent",
              borderTopColor: active ? "#333" : "transparent",
              boxShadow: active
                ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.5)"
                : "none",
              transition: "all 260ms cubic-bezier(0.16,1,0.3,1)",
            }}>
              {/* Barra lateral activa con glow */}
              {active && (
                <span style={{
                  position: "absolute", left: 0, top: "18%", bottom: "18%",
                  width: "2.5px", background: "#fff", borderRadius: "0 3px 3px 0",
                  boxShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)",
                }} />
              )}
              {icon(active)}
              <span style={{
                fontSize: "13px", fontWeight: "600",
                color: active ? "#e8e8e8" : "#444",
                transition: "color 280ms ease",
              }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "0 20px" }}>
        <div className="divider-grad" style={{ marginBottom: "10px" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#222", letterSpacing: "0.06em" }}>v1.0 · 2025</span>
      </div>
    </aside>
  );
}
