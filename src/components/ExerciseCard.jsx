// ============================================================
// COMPONENTE: ExerciseCard
// Muestra UN ejercicio con sus datos y video (si tiene).
// Props:
//   exercise  — objeto del ejercicio con { nombre, series, reps, rir, kg, videoId }
//   index     — número de orden del ejercicio en la sesión
//   expanded  — bool que indica si la tarjeta está abierta
//   onToggle  — función para abrir/cerrar
// ============================================================

import VideoPlayer from "./VideoPlayer";

export default function ExerciseCard({ exercise, index, expanded, onToggle }) {
  const { nombre, series, reps, rir, kg, videoId, metodo } = exercise;

  return (
    <div style={styles.card}>
      {/* ─── Cabecera del ejercicio (siempre visible) ─── */}
      <button style={styles.header} onClick={onToggle}>
        {/* Número de orden */}
        <span style={styles.index}>{index + 1}</span>

        {/* Nombre del ejercicio */}
        <span style={styles.name}>{nombre}</span>

        {/* Resumen compacto de series x reps */}
        <span style={styles.summary}>
          {series} × {reps}
        </span>

        {/* Flecha que rota al expandir */}
        <span style={{ ...styles.arrow, transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          ↓
        </span>
      </button>

      {/* ─── Detalle expandido ─── */}
      {expanded && (
        <div style={styles.detail}>
          {/* Fila de datos clave */}
          <div style={styles.statsRow}>
            {/* Series */}
            <div style={styles.stat}>
              <span style={styles.statLabel}>Series</span>
              <span style={styles.statValue}>{series}</span>
            </div>

            {/* Repeticiones */}
            <div style={styles.stat}>
              <span style={styles.statLabel}>Reps</span>
              <span style={styles.statValue}>{reps}</span>
            </div>

            {/* RIR (Reps in Reserve) — cuántas reps quedan en el tanque */}
            {rir && rir !== "-" && rir !== "--" && (
              <div style={styles.stat}>
                <span style={styles.statLabel}>RIR</span>
                <span style={styles.statValue}>{rir}</span>
              </div>
            )}

            {/* Kilogramos sugeridos */}
            {kg && kg !== "-" && (
              <div style={styles.stat}>
                <span style={styles.statLabel}>Peso</span>
                <span style={styles.statValue}>{kg}</span>
              </div>
            )}
          </div>

          {/* Método especial (Drop Set, Rest Pause, etc.) */}
          {metodo && (
            <div style={styles.metodoBadge}>
              ⚡ {metodo}
            </div>
          )}

          {/* Video del ejercicio */}
          <VideoPlayer videoId={videoId} title={nombre} />
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "10px",
    border: "1px solid #e8e8e8",
    overflow: "hidden",
    background: "#fff",
    marginBottom: "8px",
  },
  // Cabecera clickeable
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "13px 14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    "-webkit-tap-highlight-color": "transparent",
  },
  // Número de orden del ejercicio
  index: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    flexShrink: 0,
  },
  // Nombre del ejercicio
  name: {
    flex: 1,
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
    lineHeight: 1.3,
  },
  // Resumen series × reps
  summary: {
    fontSize: "12px",
    color: "#888",
    fontWeight: "500",
    flexShrink: 0,
  },
  // Flecha con transición
  arrow: {
    fontSize: "14px",
    color: "#aaa",
    transition: "transform 200ms ease",
    flexShrink: 0,
  },
  // Contenido expandido
  detail: {
    padding: "0 14px 14px",
    borderTop: "1px solid #f0f0f0",
  },
  // Fila de estadísticas
  statsRow: {
    display: "flex",
    gap: "8px",
    paddingTop: "12px",
    flexWrap: "wrap",
  },
  // Cada stat individual
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "52px",
    padding: "8px 12px",
    background: "#f5f5f5",
    borderRadius: "8px",
    gap: "2px",
  },
  statLabel: {
    fontSize: "10px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
  },
  statValue: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111",
  },
  // Badge de método especial
  metodoBadge: {
    display: "inline-block",
    marginTop: "10px",
    padding: "4px 10px",
    background: "#111",
    color: "#fff",
    borderRadius: "99px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.02em",
  },
};
