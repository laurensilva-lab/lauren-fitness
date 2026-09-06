import { useState } from "react";
import DayView from "./DayView";

export default function MonthView({ mes, warmups }) {
  const [activeDay, setActiveDay] = useState(0);
  const diaActual    = mes.dias[activeDay];
  const warmupDelDia = warmups?.find(w => w.dia === diaActual.dia);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>

      {/* Info chips */}
      <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
        {[["OBJ",mes.objetivo],["DUR",mes.duracion],["INICIO",mes.inicio]].map(([label,value])=>(
          <div key={label} style={{
            display:"flex", flexDirection:"column", gap:"3px", padding:"8px 12px", borderRadius:"10px",
            background:"linear-gradient(145deg,#121212 0%,#0a0a0a 100%)",
            borderTop:"1px solid rgba(255,255,255,0.07)", borderLeft:"1px solid rgba(255,255,255,0.04)",
            borderRight:"1px solid rgba(0,0,0,0.35)", borderBottom:"1px solid rgba(0,0,0,0.5)",
            boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04), 2px 4px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
          }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", fontWeight:"700", color:"#2a2a2a", letterSpacing:"0.12em" }}>{label}</span>
            <span style={{ fontSize:"12px", fontWeight:"600", color:"#888", lineHeight:1.2 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Tabs días */}
      <div style={{ display:"flex", gap:"6px", overflowX:"auto", scrollbarWidth:"none", paddingBottom:"2px" }}>
        {mes.dias.map((dia,i)=>{
          const active = activeDay === i;
          return (
            <button key={i} onClick={()=>setActiveDay(i)} style={{
              flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center",
              padding:"8px 16px", borderRadius:"10px", gap:"2px", cursor:"pointer", fontFamily:"inherit",
              background: active
                ? "linear-gradient(160deg,#ffffff 0%,#c8c8c8 100%)"
                : "linear-gradient(160deg,#1c1c1c 0%,#111111 100%)",
              borderTop:    active ? "1px solid rgba(255,255,255,0.95)" : "1px solid rgba(255,255,255,0.10)",
              borderLeft:   active ? "1px solid rgba(255,255,255,0.5)"  : "1px solid rgba(255,255,255,0.05)",
              borderRight:  active ? "1px solid rgba(0,0,0,0.1)"        : "1px solid rgba(0,0,0,0.4)",
              borderBottom: active ? "1px solid rgba(0,0,0,0.18)"       : "1px solid rgba(0,0,0,0.55)",
              boxShadow: active
                ? "inset 0 1px 0 rgba(255,255,255,0.95), inset 1px 0 0 rgba(255,255,255,0.4), 3px 6px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.4), 0 0 24px rgba(255,255,255,0.12)"
                : "inset 0 1px 0 rgba(255,255,255,0.07), inset 1px 0 0 rgba(255,255,255,0.03), 2px 4px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
              transition:"all 280ms cubic-bezier(0.34,1.56,0.64,1)",
              transform: active ? "translateY(-1px)" : "translateY(0)",
            }}>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"16px", fontWeight:"700", lineHeight:1, color: active?"#000":"#444", transition:"color 280ms ease" }}>
                {String(dia.dia).padStart(2,"00")}
              </span>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.1em", color: active?"#666":"#222" }}>DÍA</span>
            </button>
          );
        })}
      </div>

      <DayView dia={diaActual} warmup={warmupDelDia} checkKeyPrefix={`m${mes.mes}`} />
    </div>
  );
}
