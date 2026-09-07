import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const Chevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition:"transform 300ms cubic-bezier(0.34,1.56,0.64,1)", transform: open?"rotate(180deg)":"rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const ledCard = {
  borderRadius:"12px", overflow:"hidden",
  background:"linear-gradient(145deg,#141414 0%,#0c0c0c 100%)",
  borderTop:"1px solid rgba(255,255,255,0.08)", borderLeft:"1px solid rgba(255,255,255,0.04)",
  borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.55)",
  boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05), 2px 4px 12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
};

const ledBtn = {
  display:"flex", alignItems:"center", gap:"8px", width:"100%",
  padding:"12px 14px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit",
};

const tabStyle = (active) => ({
  flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center",
  padding:"8px 16px", borderRadius:"10px", gap:"2px", cursor:"pointer", fontFamily:"inherit",
  background: active ? "linear-gradient(160deg,#fff 0%,#c8c8c8 100%)" : "linear-gradient(160deg,#1c1c1c 0%,#111 100%)",
  borderTop:    active ? "1px solid rgba(255,255,255,0.95)" : "1px solid rgba(255,255,255,0.10)",
  borderLeft:   active ? "1px solid rgba(255,255,255,0.5)"  : "1px solid rgba(255,255,255,0.05)",
  borderRight:  active ? "1px solid rgba(0,0,0,0.1)"        : "1px solid rgba(0,0,0,0.4)",
  borderBottom: active ? "1px solid rgba(0,0,0,0.18)"       : "1px solid rgba(0,0,0,0.55)",
  boxShadow: active
    ? "inset 0 1px 0 rgba(255,255,255,0.95), 3px 6px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.4), 0 0 24px rgba(255,255,255,0.12)"
    : "inset 0 1px 0 rgba(255,255,255,0.07), 2px 4px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
  transition:"all 280ms cubic-bezier(0.34,1.56,0.64,1)",
  transform: active ? "translateY(-1px)" : "translateY(0)",
});

export default function WarmupScreen({ data }) {
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded]   = useState(null);
  const [infoOpen, setInfoOpen]   = useState(false);
  const diaActual = data.dias[activeDay];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>

      {/* Instrucciones */}
      <div style={ledCard}>
        <button style={ledBtn} onClick={()=>setInfoOpen(!infoOpen)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="11" x2="12" y2="16"/>
          </svg>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", fontWeight:"700", color:"#333", letterSpacing:"0.1em" }}>INSTRUCCIONES</span>
          <span style={{ marginLeft:"auto" }}><Chevron open={infoOpen} /></span>
        </button>
        {infoOpen && (
          <div style={{ padding:"14px", borderTop:"1px solid rgba(255,255,255,0.03)" }} className="anim-expand">
            <p style={{ fontSize:"13px", color:"#444", lineHeight:1.6 }}>{data.instrucciones}</p>
            <div className="divider-led" style={{ margin:"10px 0" }} />
            <p style={{ fontSize:"12px", fontWeight:"700", color:"#555", marginBottom:"6px" }}>¿Cuándo hacer 2-3 series?</p>
            <p style={{ fontSize:"13px", color:"#444", lineHeight:1.6 }}>{data.cuandoHacer2o3Series}</p>
          </div>
        )}
      </div>

      {/* Tabs días */}
      <div style={{ display:"flex", gap:"6px", overflowX:"auto", scrollbarWidth:"none" }}>
        {data.dias.map((d,i)=>(
          <button key={i} onClick={()=>{ setActiveDay(i); setExpanded(null); }} style={tabStyle(activeDay===i)}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"16px", fontWeight:"700", lineHeight:1, color: activeDay===i?"#000":"#444" }}>
              {String(d.dia).padStart(2,"0")}
            </span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.1em", color: activeDay===i?"#666":"#222" }}>DÍA</span>
          </button>
        ))}
      </div>

      {/* Ejercicios */}
      <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
        {diaActual.ejercicios.map((ej,i)=>{
          const open = expanded === i;
          return (
            <div key={i} className="anim-fade-up" style={{ animationDelay:`${i*40}ms` }}>
              <div style={{
                borderRadius:"12px", overflow:"hidden",
                background: open ? "linear-gradient(145deg,#1a1a1a 0%,#0f0f0f 100%)" : "linear-gradient(145deg,#141414 0%,#0c0c0c 100%)",
                borderTop:    open ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
                borderLeft:   open ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.04)",
                borderRight:  open ? "1px solid rgba(0,0,0,0.55)"       : "1px solid rgba(0,0,0,0.4)",
                borderBottom: open ? "1px solid rgba(0,0,0,0.7)"        : "1px solid rgba(0,0,0,0.55)",
                boxShadow: open
                  ? "inset 0 1px 0 rgba(255,255,255,0.1), inset 1px 0 0 rgba(255,255,255,0.05), 4px 8px 24px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06)"
                  : "inset 0 1px 0 rgba(255,255,255,0.05), 2px 4px 10px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)",
                transition:"all 280ms cubic-bezier(0.16,1,0.3,1)",
              }}>
                <button onClick={()=>setExpanded(open?null:i)} style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"13px 14px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", fontWeight:"700", color:"#2a2a2a", flexShrink:0 }}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{ flex:1, fontSize:"13.5px", fontWeight:"600", color:"#c0c0c0" }}>{ej.nombre}</span>
                  <span style={{
                    padding:"3px 9px", borderRadius:"99px",
                    background:"linear-gradient(145deg,#161616 0%,#0e0e0e 100%)",
                    borderTop:"1px solid rgba(255,255,255,0.07)", borderLeft:"1px solid rgba(255,255,255,0.03)",
                    borderRight:"1px solid rgba(0,0,0,0.35)", borderBottom:"1px solid rgba(0,0,0,0.5)",
                    boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04), 1px 2px 6px rgba(0,0,0,0.4)",
                    fontSize:"11px", fontWeight:"600", color:"#444", fontFamily:"var(--font-mono)", flexShrink:0,
                  }}>{ej.series}×{ej.reps}</span>
                  <Chevron open={open} />
                </button>
                {open && (
                  <div style={{ padding:"0 14px 14px", borderTop:"1px solid rgba(255,255,255,0.03)" }} className="anim-expand">
                    <div style={{ display:"flex", gap:"6px", paddingTop:"12px", marginBottom:"12px" }}>
                      {[["SERIES",ej.series],["REPS",ej.reps],["DESCANSO","0s"]].map(([l,v])=>(
                        <div key={l} style={{
                          display:"flex", flexDirection:"column", alignItems:"center", gap:"4px",
                          padding:"8px 12px", borderRadius:"10px",
                          background:"linear-gradient(145deg,#181818 0%,#101010 100%)",
                          borderTop:"1px solid rgba(255,255,255,0.1)", borderLeft:"1px solid rgba(255,255,255,0.05)",
                          borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.5)",
                          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06), 2px 4px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                        }}>
                          <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#333", fontWeight:"700", letterSpacing:"0.1em" }}>{l}</span>
                          <span style={{ fontSize:"15px", fontWeight:"700", color:"#ddd" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <VideoPlayer videoId={ej.videoId} title={ej.nombre} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
