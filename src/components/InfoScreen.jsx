// ============================================================
// COMPONENTE: InfoScreen
// Pantalla de información del programa y grupos musculares
// Props:
//   programInfo   — info general del programa
//   meses         — array de meses para mostrar resumen
//   gruposMusc    — array de grupos musculares
// ============================================================

export default function InfoScreen({ programInfo, meses, gruposMusc }) {
  return (
    <div style={styles.container}>
      {/* ─── Header del programa ─── */}
      <div style={styles.heroCard}>
        <div style={styles.heroEmoji}>🏋️‍♀️</div>
        <h2 style={styles.heroTitle}>Mi Programa</h2>
        <p style={styles.heroSubtitle}>{programInfo.objetivo}</p>
        <div style={styles.heroBadge}>{programInfo.planificacion}</div>
      </div>

      {/* ─── Estructura del programa ─── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Estructura</h3>
        <div style={styles.monthList}>
          {meses.map((mes) => (
            <div key={mes.mes} style={styles.monthItem}>
              <div style={styles.monthNumber}>{mes.mes}</div>
              <div style={styles.monthContent}>
                <div style={styles.monthName}>{mes.nombre}</div>
                <div style={styles.monthMeta}>
                  {mes.objetivo} · {mes.duracion} · Inicio: {mes.inicio}
                </div>
                <div style={styles.monthDays}>
                  {mes.dias.length} días de entrenamiento
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Grupos musculares y sus letras ─── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Grupos musculares</h3>
        <p style={styles.sectionDesc}>
          Referencia de abreviaturas usadas en la planilla:
        </p>
        <div style={styles.muscleGrid}>
          {gruposMusc.map((g) => (
            <div key={g.letra} style={styles.muscleItem}>
              <span style={styles.muscleLetter}>{g.letra}</span>
              <span style={styles.muscleName}>{g.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Glosario de términos ─── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Glosario</h3>
        <div style={styles.glossaryList}>
          {glossaryTerms.map((term) => (
            <div key={term.term} style={styles.glossaryItem}>
              <span style={styles.glossaryTerm}>{term.term}</span>
              <span style={styles.glossaryDef}>{term.def}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Guía de nutrición ─── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Nutrición básica</h3>
        <div style={styles.nutritionCard}>
          <p style={styles.nutritionNote}>
            ⚠️ Esta guía es orientativa. Para mejores resultados, trabajá con un nutricionista.
          </p>
          {nutritionTips.map((tip, i) => (
            <div key={i} style={styles.nutritionTip}>
              <span style={styles.nutritionEmoji}>{tip.icon}</span>
              <div>
                <strong style={styles.nutritionTitle}>{tip.title}</strong>
                <p style={styles.nutritionDesc}>{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Datos del glosario ───
const glossaryTerms = [
  { term: "RIR",    def: "Reps In Reserve — cuántas repeticiones te quedan en el tanque antes de fallar" },
  { term: "AMRAP",  def: "As Many Reps As Possible — tantas repeticiones como puedas con buena técnica" },
  { term: "c/m",    def: "Con mancuernas" },
  { term: "c/b",    def: "Con barra" },
  { term: "xL",     def: "Por lado (cada extremidad)" },
  { term: "Drop Set", def: "Bajar el peso inmediatamente y continuar sin descanso" },
  { term: "Rest-Pause", def: "Pausa breve (10-20 seg) dentro de la misma serie para continuar" },
  { term: "2+AMRAP", def: "2 series normales + 1 serie hasta el fallo" },
];

// ─── Tips de nutrición ───
const nutritionTips = [
  { icon: "🥩", title: "Proteína: 2g por kg de peso", desc: "Pollo, carne, huevos, pescado, yogur. Mantiene la masa muscular." },
  { icon: "🍚", title: "Carbohidratos", desc: "Arroz, avena, papa, frutas. Priorizalos cerca del entrenamiento." },
  { icon: "🥑", title: "Grasas saludables", desc: "Palta, frutos secos, aceite de oliva. No las elimines." },
  { icon: "💧", title: "Hidratación", desc: "2-3 litros de agua por día, más si entrenás fuerte." },
  { icon: "⚖️", title: "Control de peso", desc: "Pesate 1-2 veces por semana, siempre a la mañana en ayunas." },
];

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  // Card principal con logo
  heroCard: {
    background: "#111",
    color: "#fff",
    borderRadius: "16px",
    padding: "28px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  heroEmoji: { fontSize: "40px" },
  heroTitle: { fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em" },
  heroSubtitle: { fontSize: "14px", color: "#aaa" },
  heroBadge: {
    marginTop: "4px",
    padding: "4px 14px",
    border: "1px solid #444",
    borderRadius: "99px",
    fontSize: "12px",
    color: "#ccc",
    fontWeight: "600",
  },
  // Secciones
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#111",
    letterSpacing: "-0.01em",
  },
  sectionDesc: {
    fontSize: "13px",
    color: "#666",
    marginTop: "-6px",
  },
  // Lista de meses
  monthList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  monthItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px",
    background: "#f7f7f7",
    borderRadius: "10px",
    border: "1px solid #eee",
  },
  monthNumber: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "800",
    flexShrink: 0,
  },
  monthContent: { flex: 1 },
  monthName: { fontSize: "14px", fontWeight: "700", color: "#111" },
  monthMeta: { fontSize: "12px", color: "#666", marginTop: "3px" },
  monthDays: {
    display: "inline-block",
    marginTop: "6px",
    padding: "2px 8px",
    background: "#e8e8e8",
    borderRadius: "99px",
    fontSize: "11px",
    color: "#444",
    fontWeight: "600",
  },
  // Grilla de músculos
  muscleGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  muscleItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    background: "#f7f7f7",
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  muscleLetter: {
    fontWeight: "800",
    fontSize: "14px",
    color: "#111",
    minWidth: "28px",
  },
  muscleName: {
    fontSize: "13px",
    color: "#555",
  },
  // Glosario
  glossaryList: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    border: "1px solid #eee",
    borderRadius: "10px",
    overflow: "hidden",
  },
  glossaryItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px 14px",
    borderBottom: "1px solid #f0f0f0",
  },
  glossaryTerm: {
    minWidth: "72px",
    fontSize: "13px",
    fontWeight: "800",
    color: "#111",
    flexShrink: 0,
  },
  glossaryDef: {
    fontSize: "13px",
    color: "#555",
    lineHeight: 1.4,
  },
  // Nutrición
  nutritionCard: {
    border: "1px solid #eee",
    borderRadius: "12px",
    overflow: "hidden",
  },
  nutritionNote: {
    padding: "12px 14px",
    background: "#f5f5f5",
    fontSize: "12px",
    color: "#666",
    lineHeight: 1.5,
    borderBottom: "1px solid #eee",
  },
  nutritionTip: {
    display: "flex",
    gap: "12px",
    padding: "14px",
    borderBottom: "1px solid #f0f0f0",
    alignItems: "flex-start",
  },
  nutritionEmoji: { fontSize: "22px", flexShrink: 0 },
  nutritionTitle: { fontSize: "13px", color: "#111", display: "block", marginBottom: "3px" },
  nutritionDesc: { fontSize: "12px", color: "#666", lineHeight: 1.5 },
};
