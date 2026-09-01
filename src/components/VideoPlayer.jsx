// ============================================================
// COMPONENTE: VideoPlayer
// Reproduce videos de YouTube DENTRO de la app, sin redirigir.
// Props:
//   videoId  — ID del video de YouTube (ej: "dQw4w9WgXcQ")
//              Si está vacío, muestra placeholder con mensaje
//   title    — Título del ejercicio para accesibilidad
// ============================================================

import { useState } from "react";

export default function VideoPlayer({ videoId, title = "Ejercicio" }) {
  // Estado para mostrar/ocultar el reproductor
  const [playing, setPlaying] = useState(false);

  // Si no hay videoId, mostrar mensaje de "sin video"
  if (!videoId) {
    return (
      <div style={styles.placeholder}>
        <span style={styles.placeholderIcon}>▷</span>
        <span style={styles.placeholderText}>Sin video aún</span>
      </div>
    );
  }

  // Si el usuario presionó play, mostrar el iframe de YouTube
  if (playing) {
    return (
      <div style={styles.wrapper}>
        <iframe
          style={styles.iframe}
          /* 
           * Parámetros de YouTube:
           * autoplay=1     → empieza automáticamente
           * rel=0          → no muestra videos relacionados al terminar
           * modestbranding → oculta logo de YouTube
           */
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* Botón para cerrar el video */}
        <button style={styles.closeBtn} onClick={() => setPlaying(false)}>
          ✕ Cerrar
        </button>
      </div>
    );
  }

  // Estado inicial: mostrar thumbnail con botón de play
  return (
    <div style={styles.thumbnail} onClick={() => setPlaying(true)}>
      {/* Imagen miniatura de YouTube generada automáticamente */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt={`Ver tutorial: ${title}`}
        style={styles.thumbnailImg}
      />
      <div style={styles.playOverlay}>
        <div style={styles.playBtn}>▶</div>
      </div>
    </div>
  );
}

const styles = {
  // Contenedor cuando está reproduciendo
  wrapper: {
    position: "relative",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#000",
    marginTop: "8px",
  },
  // El iframe de YouTube — relación 16:9
  iframe: {
    display: "block",
    width: "100%",
    aspectRatio: "16/9",
    border: "none",
  },
  // Botón cerrar video
  closeBtn: {
    display: "block",
    width: "100%",
    padding: "8px",
    background: "#111",
    color: "#fff",
    fontSize: "13px",
    textAlign: "center",
    cursor: "pointer",
    fontFamily: "inherit",
    border: "none",
  },
  // Thumbnail antes de hacer play
  thumbnail: {
    position: "relative",
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    marginTop: "8px",
    background: "#000",
  },
  thumbnailImg: {
    display: "block",
    width: "100%",
    aspectRatio: "16/9",
    objectFit: "cover",
    opacity: 0.85,
  },
  // Overlay con botón de play centrado
  playOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    paddingLeft: "3px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
  },
  // Placeholder cuando no hay video
  placeholder: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 10px",
    background: "#f5f5f5",
    borderRadius: "6px",
    marginTop: "6px",
    color: "#aaa",
    fontSize: "12px",
  },
  placeholderIcon: { fontSize: "14px", opacity: 0.5 },
  placeholderText: { fontStyle: "italic" },
};
