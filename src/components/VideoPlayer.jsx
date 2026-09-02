import { useState } from "react";

export default function VideoPlayer({ videoId, title = "Ejercicio" }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) {
    return (
      <div style={s.placeholder}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>Sin video — próximamente</span>
      </div>
    );
  }

  if (playing) {
    return (
      <div style={s.wrapper}>
        <iframe
          style={s.iframe}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button style={s.closeBtn} onClick={() => setPlaying(false)}>✕ Cerrar</button>
      </div>
    );
  }

  return (
    <div style={s.thumb} onClick={() => setPlaying(true)}>
      <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt={title} style={s.thumbImg} />
      <div style={s.overlay}>
        <div style={s.playBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    </div>
  );
}

const s = {
  placeholder: {
    display: "flex", alignItems: "center", gap: "7px",
    padding: "9px 12px", background: "#0e0e0e", border: "1px dashed #2a2a2a",
    borderRadius: "8px", color: "#333", fontSize: "12px",
  },
  wrapper: { position: "relative", width: "100%", borderRadius: "8px", overflow: "hidden", background: "#000" },
  iframe:  { display: "block", width: "100%", aspectRatio: "16/9", border: "none" },
  closeBtn: {
    display: "block", width: "100%", padding: "8px",
    background: "#111", border: "none", borderTop: "1px solid #222",
    color: "#555", fontSize: "12px", textAlign: "center", cursor: "pointer", fontFamily: "inherit",
    transition: "background 200ms ease, color 200ms ease",
  },
  thumb: {
    position: "relative", width: "100%", borderRadius: "8px",
    overflow: "hidden", cursor: "pointer", background: "#000",
    border: "1px solid #2a2a2a",
    transition: "border-color 250ms ease, box-shadow 250ms ease",
  },
  thumbImg: { display: "block", width: "100%", aspectRatio: "16/9", objectFit: "cover", opacity: 0.6 },
  overlay:  { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" },
  playBtn: {
    width: "48px", height: "48px", borderRadius: "50%",
    background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center",
    color: "#000", paddingLeft: "2px",
    boxShadow: "0 0 24px rgba(255,255,255,0.2)",
    transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease",
  },
};
