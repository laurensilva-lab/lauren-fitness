import { useState } from "react";
import DayView from "./DayView";

export default function MonthView({ mes, warmups }) {
  const [activeDay, setActiveDay] = useState(0);
  const diaActual    = mes.dias[activeDay];
  const warmupDelDia = warmups?.find(w => w.dia === diaActual.dia);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* Info chips */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {[
          { label: "OBJ",    value: mes.objetivo },
          { label: "DUR",    value: mes.duracion },
          { label: "INICIO", value: mes.inicio },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: "flex", flexDirection: "column", gap: "3px",
            padding: "8px 12px",
            background: "linear-gradient(145deg, #151515 0%, #0e0e0e 100%)",
            border: "1px solid #222", borderTopColor: "#2a2a2a",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 3px 8px rgba(0,0,0,0.4)",
            borderRadius: "10px",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: "700", color: "#333", letterSpacing: "0.12em" }}>{label}</span>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#999", lineHeight: 1.2 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Tabs días */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "2px" }}>
        {mes.dias.map((dia, i) => {
          const active = activeDay === i;
          return (
            <button key={i} onClick={() => setActiveDay(i)} style={{
              flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
              padding: "8px 16px", borderRadius: "10px", gap: "2px", cursor: "pointer", fontFamily: "inherit",
              background: active
                ? "linear-gradient(180deg, #ffffff 0%, #d0d0d0 100%)"
                : "linear-gradient(180deg, #1a1a1a 0%, #111111 100%)",
              border: active ? "1px solid rgba(255,255,255,0.5)" : "1px solid #222",
              borderTopColor: active ? "rgba(255,255,255,0.7)" : "#2a2a2a",
              boxShadow: active
                ? "0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.5)"
                : "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.4)",
              transition: "all 280ms cubic-bezier(0.16,1,0.3,1)",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: "700", lineHeight: 1, color: active ? "#000" : "#555", transition: "color 280ms ease" }}>
                {String(dia.dia).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", color: active ? "#555" : "#2a2a2a" }}>DÍA</span>
            </button>
          );
        })}
      </div>

      <DayView dia={diaActual} warmup={warmupDelDia} checkKeyPrefix={`m${mes.mes}`} />
    </div>
  );
}
