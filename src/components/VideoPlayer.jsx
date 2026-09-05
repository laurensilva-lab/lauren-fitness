import { useState } from "react";

export default function VideoPlayer({ videoId, title = "Ejercicio" }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "10px 13px", borderRadius: "9px",
        background: "linear-gradient(145deg, #0e0e0e 0%, #0a0a0a 100%)",
        border: "1px dashed #222", color: "#2a2a2a", fontSize: "12px",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Sin video — próximamente
      </div>
    );
  }

  if (playing) {
    return (
      <div style={{ borderRadius: "10px", overflow: "hidden", background: "#000", boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}>
        <iframe
          style={{ display: "block", width: "100%", aspectRatio: "16/9", border: "none" }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button onClick={() => setPlaying(false)} style={{
          display: "block", width: "100%", padding: "9px",
          background: "linear-gradient(180deg, #161616 0%, #111 100%)",
          border: "none", borderTop: "1px solid #222",
          color: "#444", fontSize: "12px", textAlign: "center",
          cursor: "pointer", fontFamily: "inherit",
          transition: "background 200ms ease",
        }}>✕ Cerrar</button>
      </div>
    );
  }

  return (
    <div onClick={() => setPlaying(true)} style={{
      position: "relative", width: "100%", borderRadius: "10px",
      overflow: "hidden", cursor: "pointer",
      border: "1px solid #252525", borderTopColor: "#2e2e2e",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 6px 24px rgba(0,0,0,0.6)",
      transition: "box-shadow 250ms ease, border-color 250ms ease",
    }}>
      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt={title}
        style={{ display: "block", width: "100%", aspectRatio: "16/9", objectFit: "cover", opacity: 0.55 }}
      />
      {/* Overlay con gradiente */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: "linear-gradient(145deg, #fff 0%, #ccc 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          paddingLeft: "3px",
          boxShadow: "0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.1), 0 6px 20px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      {/* Label */}
      <div style={{
        position: "absolute", bottom: "10px", left: "12px",
        fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "700",
        color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em",
      }}>VER TUTORIAL</div>
    </div>
  );
}
