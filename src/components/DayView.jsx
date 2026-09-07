import { useState } from "react";
import ExerciseCard from "./ExerciseCard";

const Chevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition:"transform 300ms cubic-bezier(0.34,1.56,0.64,1)", transform: open?"rotate(180deg)":"rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function DayView({ dia, warmup, checkKeyPrefix }) {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [warmupOpen, setWarmupOpen]   = useState(false);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>

      {/* Header día */}
      <div style={{ display:"flex", alignItems:"center", gap:"10px", paddingBottom:"13px", borderBottom:"1px solid rgba(255,255,255,0.04)", boxShadow:"0 1px 0 rgba(0,0,0,0.5)" }}>
        {/* Tag DAY — componente más elevado de la pantalla */}
        <div style={{
          display:"flex", flexDirection:"column", alignItems:"center", padding:"5px 12px", borderRadius:"9px",
          background:"linear-gradient(145deg,#ffffff 0%,#c0c0c0 100%)",
          borderTop:"1px solid rgba(255,255,255,0.95)", borderLeft:"1px solid rgba(255,255,255,0.6)",
          borderRight:"1px solid rgba(0,0,0,0.15)", borderBottom:"1px solid rgba(0,0,0,0.2)",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.9), inset 1px 0 0 rgba(255,255,255,0.4), 3px 6px 18px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.35), 0 0 20px rgba(255,255,255,0.1)",
        }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"#888", fontWeight:"700", letterSpacing:"0.12em" }}>DAY</span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"19px", color:"#000", fontWeight:"800", lineHeight:1 }}>
            {String(dia.dia).padStart(2,"0")}
          </span>
        </div>

        {dia.tipo && <span style={{ flex:1, fontFamily:"var(--font-mono)", fontSize:"11px", color:"#2e2e2e", letterSpacing:"0.1em", textTransform:"uppercase" }}>{dia.tipo}</span>}

        <span style={{
          fontFamily:"var(--font-mono)", fontSize:"10px", color:"#2a2a2a", fontWeight:"600",
          padding:"3px 9px", borderRadius:"99px",
          background:"linear-gradient(145deg,#111 0%,#0a0a0a 100%)",
          borderTop:"1px solid rgba(255,255,255,0.06)", borderLeft:"1px solid rgba(255,255,255,0.03)",
          borderRight:"1px solid rgba(0,0,0,0.3)", borderBottom:"1px solid rgba(0,0,0,0.4)",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03), 1px 2px 6px rgba(0,0,0,0.4)",
        }}>{dia.ejercicios.length} EJ.</span>
      </div>

      {/* Calentamiento */}
      {warmup?.ejercicios?.length > 0 && (
        <div style={{
          borderRadius:"12px", overflow:"hidden",
          background:"linear-gradient(145deg,#111 0%,#0a0a0a 100%)",
          borderTop:"1px solid rgba(255,255,255,0.08)", borderLeft:"1px solid rgba(255,255,255,0.04)",
          borderRight:"1px solid rgba(0,0,0,0.35)", borderBottom:"1px solid rgba(0,0,0,0.5)",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05), 2px 4px 12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)",
        }}>
          <button onClick={()=>setWarmupOpen(!warmupOpen)} style={{
            display:"flex", alignItems:"center", gap:"8px", width:"100%",
            padding:"11px 14px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1 3-2 3-1.5 0-2-1.5-1-7z"/>
            </svg>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", fontWeight:"700", color:"#333", letterSpacing:"0.08em" }}>ENTRADA EN CALOR</span>
            <span style={{ fontSize:"11px", color:"#222", marginLeft:"auto" }}>{warmup.ejercicios.length} ejercicios</span>
            <Chevron open={warmupOpen} />
          </button>
          {warmupOpen && (
            <div style={{ padding:"8px 14px 14px", borderTop:"1px solid rgba(255,255,255,0.04)" }} className="anim-expand">
              {warmup.ejercicios.map((ej,i)=>(
                <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.02)" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"#1e1e1e", marginTop:"2px", flexShrink:0 }}>—</span>
                  <div>
                    <div style={{ fontSize:"13px", fontWeight:"600", color:"#999" }}>{ej.nombre}</div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"#2a2a2a", marginTop:"2px" }}>{ej.series} series · {ej.reps}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ejercicios */}
      <div>
        {dia.ejercicios.map((ej,i)=>(
          <div key={i} className="anim-fade-up" style={{ animationDelay:`${i*35}ms` }}>
            <ExerciseCard exercise={ej} index={i} expanded={expandedIdx===i} onToggle={()=>setExpandedIdx(expandedIdx===i?null:i)} checkKey={`${checkKeyPrefix}_d${dia.dia}`} />
          </div>
        ))}
      </div>

      {dia.ejercicios.some(e=>String(e.series).includes("AMRAP")) && (
        <div style={{
          padding:"10px 13px", borderRadius:"8px", display:"flex", gap:"8px", alignItems:"flex-start",
          fontSize:"12px", color:"#333", lineHeight:1.5,
          background:"linear-gradient(145deg,#0e0e0e 0%,#080808 100%)",
          borderTop:"1px solid rgba(255,255,255,0.05)", borderLeft:"1px solid rgba(255,255,255,0.03)",
          borderRight:"1px solid rgba(0,0,0,0.3)", borderBottom:"1px solid rgba(0,0,0,0.4)",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03), 1px 2px 8px rgba(0,0,0,0.4)",
        }}>
          <span style={{
            flexShrink:0, fontFamily:"var(--font-mono)", fontSize:"9px", fontWeight:"700",
            color:"#000", background:"linear-gradient(145deg,#fff 0%,#ccc 100%)", padding:"2px 6px", borderRadius:"3px",
            letterSpacing:"0.06em", marginTop:"1px",
            boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8), 1px 2px 6px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.1)",
          }}>AMRAP</span>
          As Many Reps As Possible — tantas reps como puedas con buena técnica.
        </div>
      )}
    </div>
  );
}
