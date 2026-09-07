const icons = {
  meses: (a) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 4px rgba(255,255,255,0.5))":"none"}}><path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/><line x1="6" y1="12" x2="18" y2="12"/></svg>,
  calentamiento: (a) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 4px rgba(255,255,255,0.5))":"none"}}><path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/></svg>,
  calendario: (a) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 4px rgba(255,255,255,0.5))":"none"}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  info: (a) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 4px rgba(255,255,255,0.5))":"none"}}><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/></svg>,
};
const TABS = [
  {id:"meses",label:"Rutina"},{id:"calentamiento",label:"Entrada"},
  {id:"calendario",label:"Calendario"},{id:"info",label:"Programa"},
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={{
      width:"210px", flexShrink:0, height:"100vh", position:"sticky", top:0,
      background:"linear-gradient(160deg,#0d0d0d 0%,#070707 100%)",
      borderRight:"1px solid rgba(255,255,255,0.05)",
      boxShadow:"inset -1px 0 0 rgba(0,0,0,0.6), 1px 0 0 rgba(255,255,255,0.02), 4px 0 24px rgba(0,0,0,0.6)",
      display:"flex", flexDirection:"column", padding:"28px 0",
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"0 20px", marginBottom:"6px" }}>
        <span style={{
          width:"8px", height:"8px", borderRadius:"50%", background:"#fff", flexShrink:0,
          boxShadow:"0 0 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.5), 0 0 32px rgba(255,255,255,0.2)",
          animation:"pulseGlow 2.5s ease-in-out infinite",
        }} />
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"13px", fontWeight:"700", color:"#e8e8e8", letterSpacing:"0.06em" }}>LAUREN</span>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"13px", fontWeight:"400", color:"#1e1e1e", letterSpacing:"0.06em" }}>.FIT</span>
      </div>

      <div className="divider-led" style={{ margin:"16px 0" }} />

      {/* Nav */}
      <nav style={{ display:"flex", flexDirection:"column", gap:"4px", padding:"0 12px", flex:1 }}>
        {TABS.map(({id,label})=>{
          const active = activePage === id;
          return (
            <button key={id} onClick={()=>onNavigate(id)} style={{
              position:"relative", display:"flex", alignItems:"center", gap:"10px",
              padding:"10px 12px", borderRadius:"10px", width:"100%",
              cursor:"pointer", fontFamily:"inherit", textAlign:"left",
              background: active ? "linear-gradient(145deg,#1e1e1e 0%,#141414 100%)" : "none",
              borderTop:    active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
              borderLeft:   active ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
              borderRight:  active ? "1px solid rgba(0,0,0,0.4)"        : "1px solid transparent",
              borderBottom: active ? "1px solid rgba(0,0,0,0.5)"        : "1px solid transparent",
              boxShadow: active
                ? "inset 0 1px 0 rgba(255,255,255,0.08), inset 1px 0 0 rgba(255,255,255,0.04), 2px 4px 14px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)"
                : "none",
              transition:"all 260ms cubic-bezier(0.16,1,0.3,1)",
            }}>
              {active && (
                <span style={{
                  position:"absolute", left:0, top:"18%", bottom:"18%",
                  width:"2.5px", background:"linear-gradient(180deg,rgba(255,255,255,0.3) 0%,#fff 40%,#fff 60%,rgba(255,255,255,0.3) 100%)",
                  borderRadius:"0 3px 3px 0",
                  boxShadow:"0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.4), 0 0 32px rgba(255,255,255,0.2)",
                }} />
              )}
              {icons[id](active)}
              <span style={{ fontSize:"13px", fontWeight:"600", color: active?"#e0e0e0":"#2e2e2e", transition:"color 280ms ease" }}>{label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding:"0 20px" }}>
        <div className="divider-led" style={{ marginBottom:"10px" }} />
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"#1a1a1a", letterSpacing:"0.06em" }}>v1.0 · 2025</span>
      </div>
    </aside>
  );
}
