import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const Chevron = ({ open }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition:"transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
             transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconEdit = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

function SerieCheck({ done, onToggle }) {
  return (
    <button onClick={e => { e.stopPropagation(); onToggle(); }} style={{
      width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      background: done
        ? "linear-gradient(145deg, #fff 0%, #c8c8c8 100%)"
        : "linear-gradient(145deg, #0f0f0f 0%, #090909 100%)",
      borderTop:    done ? "1px solid rgba(255,255,255,0.9)"  : "1px solid rgba(0,0,0,0.5)",
      borderLeft:   done ? "1px solid rgba(255,255,255,0.5)"  : "1px solid rgba(0,0,0,0.3)",
      borderRight:  done ? "1px solid rgba(0,0,0,0.1)"        : "1px solid rgba(255,255,255,0.04)",
      borderBottom: done ? "1px solid rgba(0,0,0,0.15)"       : "1px solid rgba(255,255,255,0.02)",
      boxShadow: done
        ? "inset 0 1px 0 rgba(255,255,255,0.9), inset 2px 2px 6px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.4), 0 0 16px rgba(255,255,255,0.2), 3px 5px 14px rgba(0,0,0,0.5)"
        : "inset 2px 3px 8px rgba(0,0,0,0.6), inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.03)",
      transition: "all 280ms cubic-bezier(0.34,1.56,0.64,1)",
      transform: done ? "scale(1.06)" : "scale(1)",
    }}>
      {done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{animation:"fadeIn 150ms ease both"}}><polyline points="20 6 9 17 4 12"/></svg>}
    </button>
  );
}

export default function ExerciseCard({ exercise, index, expanded, onToggle, checkKey }) {
  const { nombre, series, reps, rir, kg, videoId, metodo } = exercise;
  const numSeries = parseInt(String(series).replace(/\D.*/,"")) || 1;

  const cKey = `lauren_check_${checkKey}_${index}`;
  const [done, setDone] = useState(() => { try { const s=localStorage.getItem(cKey); return s?JSON.parse(s):Array(numSeries).fill(false); } catch { return Array(numSeries).fill(false); }});
  const toggleSerie = i => { const n=done.map((v,idx)=>idx===i?!v:v); setDone(n); try{localStorage.setItem(cKey,JSON.stringify(n));}catch{} };
  const resetAll = e => { e.stopPropagation(); const f=Array(numSeries).fill(false); setDone(f); try{localStorage.setItem(cKey,JSON.stringify(f));}catch{}; };

  const pKey = `lauren_peso_${checkKey}_${index}`;
  const [pesoLogrado, setPesoLogrado] = useState(()=>{try{return localStorage.getItem(pKey)||"";}catch{return "";}});
  const [editingPeso, setEditingPeso] = useState(false);
  const savePeso = v => { setPesoLogrado(v); try{localStorage.setItem(pKey,v);}catch{}; };

  const allDone = done.every(Boolean);
  const doneCnt = done.filter(Boolean).length;
  const progress = numSeries > 0 ? doneCnt/numSeries : 0;

  return (
    <div style={{
      borderRadius: "12px", marginBottom: "8px", overflow: "hidden",
      background: expanded ? "linear-gradient(145deg,#1a1a1a 0%,#0f0f0f 100%)" : "linear-gradient(145deg,#141414 0%,#0c0c0c 100%)",
      borderTop:    expanded ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
      borderLeft:   expanded ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.04)",
      borderRight:  expanded ? "1px solid rgba(0,0,0,0.55)"       : "1px solid rgba(0,0,0,0.4)",
      borderBottom: expanded ? "1px solid rgba(0,0,0,0.7)"        : "1px solid rgba(0,0,0,0.55)",
      boxShadow: expanded
        ? "inset 0 1px 0 rgba(255,255,255,0.12), inset 1px 0 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5), 4px 8px 28px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), 0 0 20px rgba(255,255,255,0.02)"
        : "inset 0 1px 0 rgba(255,255,255,0.06), inset 1px 0 0 rgba(255,255,255,0.03), 2px 4px 12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      opacity: allDone ? 0.55 : 1,
      transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
    }}>

      {/* Barra progreso */}
      <div style={{ height: "2px", background: "rgba(0,0,0,0.6)", position: "relative", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%",
          width: `${progress*100}%`,
          background: "linear-gradient(90deg, #333 0%, #fff 100%)",
          boxShadow: progress>0 ? "0 0 8px rgba(255,255,255,0.5), 0 0 2px rgba(255,255,255,1)" : "none",
          borderRadius: "0 1px 1px 0",
          transition: "width 400ms cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      {/* Header */}
      <button onClick={onToggle} style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"13px 14px", background:"none", border:"none", cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", fontWeight:"700", color: allDone?"#2a2a2a":"#3a3a3a", flexShrink:0, minWidth:"22px" }}>
          {String(index+1).padStart(2,"0")}
        </span>
        <span style={{ flex:1, fontSize:"13.5px", fontWeight:"600", color: allDone?"#2e2e2e":"#d8d8d8", lineHeight:1.3, letterSpacing:"-0.01em", transition:"color 300ms ease" }}>
          {nombre}
        </span>
        {doneCnt>0 && !allDone && <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"#555", flexShrink:0 }}>{doneCnt}/{numSeries}</span>}
        {allDone && (
          <span style={{
            display:"inline-flex", alignItems:"center", gap:"4px", padding:"2px 8px", borderRadius:"99px",
            background:"linear-gradient(145deg,#1a1a1a 0%,#111 100%)",
            borderTop:"1px solid rgba(255,255,255,0.1)", borderLeft:"1px solid rgba(255,255,255,0.05)",
            borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.5)",
            boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06), 2px 3px 8px rgba(0,0,0,0.5)",
            fontSize:"10px", fontWeight:"700", color:"#555", fontFamily:"var(--font-mono)", flexShrink:0, letterSpacing:"0.06em",
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            LISTO
          </span>
        )}
        <span style={{
          padding:"3px 9px", borderRadius:"99px",
          background:"linear-gradient(145deg,#161616 0%,#0e0e0e 100%)",
          borderTop:"1px solid rgba(255,255,255,0.08)", borderLeft:"1px solid rgba(255,255,255,0.04)",
          borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.5)",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05), 1px 2px 6px rgba(0,0,0,0.4)",
          fontSize:"11px", fontWeight:"600", color:"#555", fontFamily:"var(--font-mono)", flexShrink:0,
        }}>{series}×{reps}</span>
        <Chevron open={expanded} />
      </button>

      {/* Detalle */}
      {expanded && (
        <div style={{ padding:"0 14px 16px" }} className="anim-expand">
          <div className="divider-led" style={{ marginBottom:"14px" }} />

          {/* Stats */}
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"16px" }}>
            {[["SERIES",series,false,false],["REPS",reps,true,false],
              ...(rir&&rir!=="-"&&rir!=="--" ? [["RIR",rir,false,false]] : []),
              ...(kg&&kg!=="-" ? [["RECOMENDADO",kg,true,true]] : [])
            ].map(([l,v,mono,muted])=>(
              <div key={l} style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:"4px",
                padding:"8px 12px", minWidth:"54px", borderRadius:"10px",
                background: muted ? "linear-gradient(145deg,#0a0a0a 0%,#070707 100%)" : "linear-gradient(145deg,#181818 0%,#101010 100%)",
                borderTop:    muted ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(255,255,255,0.1)",
                borderLeft:   muted ? "1px solid rgba(255,255,255,0.02)" : "1px solid rgba(255,255,255,0.05)",
                borderRight:  muted ? "1px solid rgba(0,0,0,0.2)"        : "1px solid rgba(0,0,0,0.4)",
                borderBottom: muted ? "1px solid rgba(0,0,0,0.3)"        : "1px solid rgba(0,0,0,0.5)",
                boxShadow: muted
                  ? "inset 2px 3px 8px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.02)"
                  : "inset 0 1px 0 rgba(255,255,255,0.06), inset 1px 0 0 rgba(255,255,255,0.03), 2px 4px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
              }}>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color: muted?"#222":"#3a3a3a", fontWeight:"700", letterSpacing:"0.1em" }}>{l}</span>
                <span style={{ fontSize: mono?"13px":"15px", fontWeight:"700", color: muted?"#333":"#ddd", lineHeight:1, fontFamily: mono?"var(--font-mono)":"inherit" }}>{v}</span>
              </div>
            ))}

            {/* MI PESO editable */}
            <div style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap:"4px",
              padding:"8px 10px", minWidth:"64px", borderRadius:"10px",
              background:"linear-gradient(145deg,#1c1c1c 0%,#131313 100%)",
              borderTop:"1px solid rgba(255,255,255,0.16)", borderLeft:"1px solid rgba(255,255,255,0.08)",
              borderRight:"1px solid rgba(0,0,0,0.45)", borderBottom:"1px solid rgba(0,0,0,0.6)",
              boxShadow:"inset 0 1px 0 rgba(255,255,255,0.1), inset 1px 0 0 rgba(255,255,255,0.05), 2px 4px 12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07), 0 0 12px rgba(255,255,255,0.02)",
            }}>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#888", fontWeight:"700", letterSpacing:"0.1em" }}>MI PESO</span>
              {editingPeso ? (
                <input autoFocus style={{
                  width:"58px", background:"none", border:"none",
                  borderBottom:"1px solid rgba(255,255,255,0.2)",
                  color:"#f0f0f0", fontSize:"14px", fontWeight:"700",
                  fontFamily:"var(--font-mono)", textAlign:"center", outline:"none", padding:"2px 0",
                }}
                  value={pesoLogrado} onChange={e=>savePeso(e.target.value)}
                  onBlur={()=>setEditingPeso(false)}
                  onKeyDown={e=>{if(e.key==="Enter")setEditingPeso(false);}}
                  placeholder="ej: 30kg" maxLength={10}
                />
              ) : (
                <button onClick={()=>setEditingPeso(true)} style={{ display:"flex", alignItems:"center", gap:"4px", background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"inherit" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"15px", fontWeight:"700", color: pesoLogrado?"#f0f0f0":"#1e1e1e", lineHeight:1 }}>{pesoLogrado||"—"}</span>
                  <span style={{ color:"#333", display:"flex" }}><IconEdit /></span>
                </button>
              )}
            </div>
          </div>

          {/* Checks */}
          <div style={{ marginBottom:"14px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", fontWeight:"700", color:"#2a2a2a", letterSpacing:"0.12em" }}>SERIES COMPLETADAS</span>
              {doneCnt>0 && <button onClick={resetAll} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#2a2a2a", background:"none", border:"none", cursor:"pointer", textDecoration:"underline", fontWeight:"600" }}>reiniciar</button>}
            </div>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              {done.map((isDone,i)=>(
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
                  <SerieCheck done={isDone} onToggle={()=>toggleSerie(i)} />
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", fontWeight:"700", color: isDone?"#3a3a3a":"#1e1e1e", letterSpacing:"0.06em" }}>S{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {metodo && (
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"6px", marginBottom:"12px",
              padding:"4px 12px", borderRadius:"6px",
              background:"linear-gradient(145deg,#161616 0%,#0e0e0e 100%)",
              borderTop:"1px solid rgba(255,255,255,0.08)", borderLeft:"1px solid rgba(255,255,255,0.04)",
              borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.5)",
              boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05), 2px 3px 8px rgba(0,0,0,0.4)",
              color:"#555", fontSize:"11px", fontWeight:"700", letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:"var(--font-mono)",
            }}>◆ {metodo}</div>
          )}

          <VideoPlayer videoId={videoId} title={nombre} />
        </div>
      )}
    </div>
  );
}
