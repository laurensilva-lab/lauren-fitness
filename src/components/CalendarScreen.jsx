import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DIAS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const MESES_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const toKey = (y, m, d) => `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

const ChevL = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevR = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IconTrash = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;

export default function CalendarScreen() {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,  setSelected]  = useState(null);
  const [trainedDays, setTrainedDays] = useLocalStorage("lauren_trained_days", {});

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y=>y-1); } else setViewMonth(m=>m-1); setSelected(null); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0);  setViewYear(y=>y+1); } else setViewMonth(m=>m+1); setSelected(null); };

  const firstDay   = new Date(viewYear, viewMonth, 1).getDay();
  const startOff   = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const todayKey   = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  const toggleDay = (day) => {
    const key = toKey(viewYear, viewMonth, day);
    setTrainedDays(prev => {
      if (prev[key]) { const n={...prev}; delete n[key]; return n; }
      return { ...prev, [key]: { tipo: "Entrenamiento", nota: "" } };
    });
    setSelected(key);
  };

  const updateNota = (key, nota) => setTrainedDays(prev => ({ ...prev, [key]: { ...prev[key], nota } }));
  const updateTipo = (key, tipo) => setTrainedDays(prev => ({ ...prev, [key]: { ...prev[key], tipo } }));
  const removeDay  = (key) => { setTrainedDays(prev => { const n={...prev}; delete n[key]; return n; }); setSelected(null); };

  const daysThisMonth = Object.keys(trainedDays).filter(k => k.startsWith(`${viewYear}-${String(viewMonth+1).padStart(2,"0")}`)).length;
  const totalDays = Object.keys(trainedDays).length;
  const monday = new Date(today); monday.setDate(today.getDate()-((today.getDay()+6)%7)); monday.setHours(0,0,0,0);
  const weekDays = Object.keys(trainedDays).filter(k => new Date(k) >= monday).length;

  const cells = [...Array(startOff).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const selectedData = selected ? trainedDays[selected] : null;

  const btnBase = {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
    padding: "10px 12px", borderRadius: "10px", border: "none", cursor: "pointer",
    fontFamily: "inherit", transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Stats */}
      <div style={{ display: "flex", gap: "8px" }} className="anim-fade-up">
        {[["SEMANA", weekDays], ["ESTE MES", daysThisMonth], ["TOTAL", totalDays]].map(([label, val]) => (
          <div key={label} style={{
            flex: 1, display: "flex", flexDirection: "column", gap: "4px", padding: "14px 12px",
            background: "linear-gradient(145deg, #141414 0%, #0e0e0e 100%)",
            border: "1px solid #1e1e1e", borderTopColor: "#252525",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 16px rgba(0,0,0,0.5)",
            borderRadius: "12px",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: "700", color: "#2e2e2e", letterSpacing: "0.12em" }}>{label}</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "24px", fontWeight: "700", color: "#e0e0e0", lineHeight: 1 }}>{val}</span>
              <span style={{ fontSize: "11px", color: "#333" }}>días</span>
            </div>
          </div>
        ))}
      </div>

      {/* Nav mes */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="anim-fade-up">
        <button onClick={prevMonth} style={{
          width: "38px", height: "38px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(145deg, #1a1a1a 0%, #111 100%)",
          border: "1px solid #222", borderTopColor: "#2a2a2a",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.4)",
          color: "#555", cursor: "pointer",
        }}><ChevL /></button>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "19px", fontWeight: "800", color: "#e0e0e0", letterSpacing: "-0.02em" }}>{MESES_ES[viewMonth]}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#333", letterSpacing: "0.06em" }}>{viewYear}</div>
        </div>

        <button onClick={nextMonth} style={{
          width: "38px", height: "38px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(145deg, #1a1a1a 0%, #111 100%)",
          border: "1px solid #222", borderTopColor: "#2a2a2a",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.4)",
          color: "#555", cursor: "pointer",
        }}><ChevR /></button>
      </div>

      {/* Grilla calendario */}
      <div style={{
        borderRadius: "16px", padding: "16px",
        background: "linear-gradient(145deg, #111 0%, #0c0c0c 100%)",
        border: "1px solid #1e1e1e", borderTopColor: "#252525",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.6)",
      }} className="anim-fade-up">
        {/* Headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: "10px" }}>
          {DIAS.map(d => (
            <div key={d} style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "700", color: "#2a2a2a", letterSpacing: "0.06em", padding: "4px 0" }}>{d}</div>
          ))}
        </div>
        {/* Días */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px" }}>
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const key     = toKey(viewYear, viewMonth, day);
            const trained = !!trainedDays[key];
            const isToday = key === todayKey;
            const isSel   = key === selected;

            return (
              <button key={key} onClick={() => toggleDay(day)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                aspectRatio: "1", borderRadius: "9px", cursor: "pointer", fontFamily: "inherit", gap: "2px",
                padding: "2px",
                background: trained
                  ? "linear-gradient(145deg, #ffffff 0%, #d8d8d8 100%)"
                  : isToday
                    ? "linear-gradient(145deg, #1e1e1e 0%, #161616 100%)"
                    : "none",
                border: trained
                  ? "1px solid rgba(255,255,255,0.5)"
                  : isToday
                    ? "1px solid #333"
                    : isSel
                      ? "1px solid #2e2e2e"
                      : "1px solid transparent",
                boxShadow: trained
                  ? "0 0 16px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.4)"
                  : isToday
                    ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.3)"
                    : "none",
                transition: "all 220ms cubic-bezier(0.34,1.56,0.64,1)",
                transform: trained ? "scale(1.04)" : "scale(1)",
              }}>
                <span style={{ fontSize: "13px", fontWeight: trained ? "700" : "500", color: trained ? "#000" : isToday ? "#e0e0e0" : "#3a3a3a", lineHeight: 1 }}>{day}</span>
                {trained && <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(0,0,0,0.3)" }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel edición */}
      {selected && selectedData && (
        <div style={{
          borderRadius: "14px", padding: "16px",
          background: "linear-gradient(145deg, #141414 0%, #0f0f0f 100%)",
          border: "1px solid #282828", borderTopColor: "#333",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.6)",
          display: "flex", flexDirection: "column", gap: "14px",
        }} className="anim-expand">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "30px", fontWeight: "800", color: "#f0f0f0", letterSpacing: "-0.03em" }}>
                {parseInt(selected.split("-")[2])}
              </span>
              <span style={{ fontSize: "14px", color: "#444", fontWeight: "600" }}>
                {MESES_ES[parseInt(selected.split("-")[1])-1]}
              </span>
            </div>
            <button onClick={() => removeDay(selected)} style={{
              width: "34px", height: "34px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(145deg, #1a1a1a 0%, #111 100%)",
              border: "1px solid #2a2a2a", borderTopColor: "#333",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.4)",
              color: "#444", cursor: "pointer",
            }}><IconTrash /></button>
          </div>

          {/* Tipo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: "700", color: "#2a2a2a", letterSpacing: "0.12em" }}>TIPO DE SESIÓN</span>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Fuerza", "Hipertrofia", "Full Body", "Cardio", "Descanso activo"].map(t => {
                const active = selectedData.tipo === t;
                return (
                  <button key={t} onClick={() => updateTipo(selected, t)} style={{
                    padding: "5px 11px", borderRadius: "99px", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: "600",
                    background: active ? "linear-gradient(180deg, #fff 0%, #d0d0d0 100%)" : "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
                    border: active ? "1px solid rgba(255,255,255,0.5)" : "1px solid #222",
                    borderTopColor: active ? "rgba(255,255,255,0.7)" : "#2a2a2a",
                    color: active ? "#000" : "#444",
                    boxShadow: active
                      ? "0 0 14px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.5), 0 3px 8px rgba(0,0,0,0.4)"
                      : "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.3)",
                    transition: "all 220ms cubic-bezier(0.34,1.56,0.64,1)",
                  }}>{t}</button>
                );
              })}
            </div>
          </div>

          {/* Nota */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: "700", color: "#2a2a2a", letterSpacing: "0.12em" }}>NOTA</span>
            <textarea rows={3} value={selectedData.nota || ""} onChange={e => updateNota(selected, e.target.value)}
              placeholder="¿Cómo fue el entrenamiento? ¿Nuevos pesos?"
              style={{
                width: "100%", borderRadius: "10px", padding: "11px 13px",
                background: "linear-gradient(145deg, #0e0e0e 0%, #090909 100%)",
                border: "1px solid #1e1e1e", borderTopColor: "#222",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,0,0,0.3)",
                color: "#b0b0b0", fontSize: "13px", lineHeight: 1.6,
                resize: "none", outline: "none", fontFamily: "inherit",
                transition: "border-color 200ms ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Historial */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }} className="anim-fade-up">
        <div style={{ paddingBottom: "10px", borderBottom: "1px solid #161616", marginBottom: "4px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "700", color: "#2a2a2a", letterSpacing: "0.12em" }}>HISTORIAL RECIENTE</span>
        </div>
        {Object.entries(trainedDays).sort((a,b) => b[0].localeCompare(a[0])).slice(0,8).map(([key, data]) => {
          const [y,m,d] = key.split("-").map(Number);
          const date = new Date(y, m-1, d);
          const dayName = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"][date.getDay()];
          return (
            <button key={key} onClick={() => { setViewYear(y); setViewMonth(m-1); setSelected(key); }} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "11px 0", borderBottom: "1px solid #111",
              background: "none", border_bottom: "1px solid #111",
              borderTop: "none", borderLeft: "none", borderRight: "none",
              borderBottom: "1px solid #0e0e0e",
              cursor: "pointer", fontFamily: "inherit", textAlign: "left", width: "100%",
              transition: "opacity 200ms ease",
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "32px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#2a2a2a", fontWeight: "700", letterSpacing: "0.06em" }}>{dayName}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#555", fontWeight: "700" }}>{d}/{m}</span>
              </div>
              <div style={{ width: "1px", alignSelf: "stretch", background: "#161616", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#b0b0b0" }}>{data.tipo}</div>
                {data.nota && <div style={{ fontSize: "11px", color: "#333", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>{data.nota}</div>}
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          );
        })}
        {Object.keys(trainedDays).length === 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "16px 0", color: "#2a2a2a", fontSize: "13px", fontStyle: "italic" }}>
            Todavía no marcaste ningún entrenamiento.
          </div>
        )}
      </div>
    </div>
  );
}
