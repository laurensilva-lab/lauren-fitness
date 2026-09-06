const icons = {
  meses: (a) => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 5px rgba(255,255,255,0.6))":"none"}}><path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/><line x1="6" y1="12" x2="18" y2="12"/></svg>,
  calentamiento: (a) => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 5px rgba(255,255,255,0.6))":"none"}}><path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/></svg>,
  calendario: (a) => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 5px rgba(255,255,255,0.6))":"none"}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  info: (a) => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?"#fff":"#3a3a3a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transition:"all 280ms ease",filter:a?"drop-shadow(0 0 5px rgba(255,255,255,0.6))":"none"}}><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/></svg>,
};
const TABS = [
  {id:"meses",label:"Rutina"},{id:"calentamiento",label:"Entrada"},
  {id:"calendario",label:"Calendar"},{id:"info",label:"Info"},
];

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav style={{
      position:"fixed", bottom:0, left:0, right:0, maxWidth:"480px", margin:"0 auto",
      height:"64px",
      background:"linear-gradient(180deg,rgba(16,16,16,0.97) 0%,rgba(8,8,8,0.99) 100%)",
      backdropFilter:"blur(24px) saturate(1.5)", WebkitBackdropFilter:"blur(24px) saturate(1.5)",
      borderTop:"1px solid rgba(255,255,255,0.07)",
      boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05), 0 -4px 24px rgba(0,0,0,0.8), 0 -1px 0 rgba(0,0,0,0.6)",
      display:"flex", alignItems:"stretch",
      paddingBottom:"env(safe-area-inset-bottom)", zIndex:100,
    }}>
      {/* Línea LED superior */}
      <div style={{
        position:"absolute", top:0, left:"5%", right:"5%", height:"1px",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04) 20%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.04) 80%,transparent)",
        boxShadow:"0 0 8px rgba(255,255,255,0.06)",
      }} />

      {TABS.map(({id,label})=>{
        const active = activePage === id;
        return (
          <button key={id} onClick={()=>onNavigate(id)} style={{
            flex:1, display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", gap:"4px", position:"relative",
            background: active ? "linear-gradient(180deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.01) 100%)" : "none",
            border:"none", cursor:"pointer", fontFamily:"inherit", padding:"6px 0",
            transition:"background 250ms ease",
          }}>
            {active && (
              <span style={{
                position:"absolute", top:0, left:"20%", right:"20%", height:"2px",
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.6) 20%,#fff 50%,rgba(255,255,255,0.6) 80%,transparent)",
                boxShadow:"0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.4), 0 0 32px rgba(255,255,255,0.2)",
                borderRadius:"0 0 2px 2px",
              }} />
            )}
            {icons[id](active)}
            <span style={{
              fontSize:"8px", fontWeight:"700",
              color: active?"#999":"#2a2a2a",
              letterSpacing:"0.08em", textTransform:"uppercase",
              fontFamily:"var(--font-mono)", transition:"color 280ms ease",
            }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
