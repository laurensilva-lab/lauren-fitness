// ============================================================
// COMPONENTE: InfoScreen — Información del programa
// Sin emojis — iconografía SVG, estilo tech/minimal
// ============================================================

// ── Íconos SVG lineales ──────────────────────────────────────
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconBook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconApple = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3c0 1.5 1 2.5 1 2.5H8C5.8 7.5 4 9.3 4 11.5c0 4.7 3.8 8.5 8 8.5s8-3.8 8-8.5C20 9.3 18.2 7.5 16 7.5h-2s1-1 1-2.5a3 3 0 0 0-3-3z"/>
  </svg>
);
const IconMuscle = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/><line x1="6" y1="12" x2="18" y2="12"/>
  </svg>
);

export default function InfoScreen({ programInfo, meses, gruposMusc }) {
  return (
    <div style={styles.container}>

      {/* ─── Hero ─── */}
      <div style={styles.hero}>
        {/* Líneas decorativas de fondo */}
        <div style={styles.heroGrid} aria-hidden>
          {[...Array(5)].map((_,i) => (
            <div key={i} style={{ ...styles.heroGridLine, left: `${i * 25}%` }} />
          ))}
        </div>
        <div style={styles.heroContent}>
          <div style={styles.heroIcon}><IconTarget /></div>
          <h2 style={styles.heroTitle}>Mi Programa</h2>
          <p style={styles.heroSub}>{programInfo.objetivo}</p>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            {programInfo.planificacion}
          </div>
        </div>
      </div>

      {/* ─── Estructura ─── */}
      <Section icon={<IconCalendar />} title="ESTRUCTURA">
        {meses.map((mes) => (
          <div key={mes.mes} style={styles.monthRow}>
            <div style={styles.monthBullet}>
              <span style={styles.monthNum}>{String(mes.mes).padStart(2, "0")}</span>
              {mes.mes < meses.length && <div style={styles.monthLine} />}
            </div>
            <div style={styles.monthInfo}>
              <div style={styles.monthName}>{mes.nombre}</div>
              <div style={styles.monthMeta}>
                <Tag>{mes.duracion}</Tag>
                <Tag>{mes.inicio}</Tag>
              </div>
              <div style={styles.monthObj}>{mes.objetivo}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* ─── Grupos musculares ─── */}
      <Section icon={<IconMuscle />} title="GRUPOS MUSCULARES">
        <div style={styles.muscleGrid}>
          {gruposMusc.map((g) => (
            <div key={g.letra} style={styles.muscleItem}>
              <span style={styles.muscleLetter}>{g.letra}</span>
              <span style={styles.muscleName}>{g.nombre}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Glosario ─── */}
      <Section icon={<IconBook />} title="GLOSARIO">
        <div style={styles.glossary}>
          {glossaryTerms.map((t) => (
            <div key={t.term} style={styles.glossaryRow}>
              <span style={styles.glossaryTerm}>{t.term}</span>
              <span style={styles.glossaryDef}>{t.def}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Nutrición ─── */}
      <Section icon={<IconApple />} title="NUTRICIÓN BÁSICA">
        <div style={styles.noteBox}>
          Guía orientativa — consultá con un nutricionista para resultados óptimos.
        </div>
        {nutritionTips.map((tip, i) => (
          <div key={i} style={styles.nutRow}>
            <div style={styles.nutIcon}>{tip.icon}</div>
            <div>
              <div style={styles.nutTitle}>{tip.title}</div>
              <div style={styles.nutDesc}>{tip.desc}</div>
            </div>
          </div>
        ))}
      </Section>

    </div>
  );
}

// Sub-componentes
function Section({ icon, title, children }) {
  return (
    <section style={secStyles.wrap}>
      <div style={secStyles.header}>
        <span style={secStyles.icon}>{icon}</span>
        <span style={secStyles.title}>{title}</span>
        <div style={secStyles.line} />
      </div>
      <div>{children}</div>
    </section>
  );
}

function Tag({ children }) {
  return <span style={tagStyle}>{children}</span>;
}

const tagStyle = {
  display: "inline-block",
  padding: "2px 7px",
  background: "#f5f5f5",
  border: "1px solid #e4e4e4",
  borderRadius: "4px",
  fontSize: "10px",
  fontFamily: "'JetBrains Mono', monospace",
  color: "#737373",
  fontWeight: "600",
};

// Ícono SVG para nutrición (lineal, sin color)
const nutIcons = {
  protein: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  carbs: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  fat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M8 12h8M12 8v8"/>
    </svg>
  ),
  water: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  scale: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 14V6a6 6 0 0 1 12 0v8"/><line x1="12" y1="6" x2="12" y2="14"/>
    </svg>
  ),
};

const glossaryTerms = [
  { term: "RIR",      def: "Reps In Reserve — repeticiones que te quedan antes de fallar" },
  { term: "AMRAP",    def: "As Many Reps As Possible — tantas reps como puedas con buena técnica" },
  { term: "c/m",      def: "Con mancuernas" },
  { term: "xL",       def: "Por lado (cada extremidad)" },
  { term: "2+AMRAP",  def: "2 series normales + 1 serie al fallo" },
  { term: "Drop Set", def: "Bajar el peso y continuar sin descanso" },
];

const nutritionTips = [
  { icon: nutIcons.protein, title: "Proteína — 2g por kg de peso",   desc: "Pollo, carne, huevos, pescado, yogur." },
  { icon: nutIcons.carbs,   title: "Carbohidratos",                   desc: "Arroz, avena, papa. Priorizalos cerca del entrenamiento." },
  { icon: nutIcons.fat,     title: "Grasas saludables",               desc: "Palta, frutos secos, aceite de oliva." },
  { icon: nutIcons.water,   title: "Hidratación — 2-3L por día",      desc: "Más si entrenás fuerte o hace calor." },
  { icon: nutIcons.scale,   title: "Control de peso",                 desc: "Pesate 1-2 veces por semana, a la mañana en ayunas." },
];

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "24px" },
  hero: {
    position: "relative",
    background: "#0a0a0a",
    borderRadius: "14px",
    overflow: "hidden",
    padding: "28px 20px",
  },
  heroGrid: { position: "absolute", inset: 0, overflow: "hidden" },
  heroGridLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "1px",
    background: "rgba(255,255,255,0.04)",
  },
  heroContent: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    textAlign: "center",
  },
  heroIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    marginBottom: "4px",
  },
  heroTitle: { fontSize: "22px", fontWeight: "800", color: "#fff", letterSpacing: "-0.03em" },
  heroSub: { fontSize: "13px", color: "#737373" },
  heroBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "99px",
    fontSize: "11px",
    color: "#a8a8a8",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.04em",
    marginTop: "4px",
  },
  heroBadgeDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#fff",
    opacity: 0.4,
  },
  // Meses
  monthRow: { display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "16px" },
  monthBullet: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", paddingTop: "2px" },
  monthNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    fontWeight: "700",
    color: "#fff",
    background: "#0a0a0a",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  monthLine: { width: "1px", flex: 1, minHeight: "20px", background: "#e4e4e4" },
  monthInfo: { flex: 1, paddingBottom: "4px" },
  monthName: { fontSize: "14px", fontWeight: "700", color: "#171717", marginBottom: "4px" },
  monthMeta: { display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "4px" },
  monthObj: { fontSize: "12px", color: "#737373" },
  // Músculos
  muscleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" },
  muscleItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 11px",
    border: "1px solid #eeeeee",
    borderRadius: "8px",
    background: "#fafafa",
  },
  muscleLetter: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    fontWeight: "700",
    color: "#0a0a0a",
    minWidth: "28px",
  },
  muscleName: { fontSize: "12px", color: "#555" },
  // Glosario
  glossary: {
    border: "1px solid #eeeeee",
    borderRadius: "10px",
    overflow: "hidden",
  },
  glossaryRow: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    padding: "11px 13px",
    borderBottom: "1px solid #f5f5f5",
  },
  glossaryTerm: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    fontWeight: "700",
    color: "#0a0a0a",
    minWidth: "72px",
    flexShrink: 0,
    paddingTop: "1px",
  },
  glossaryDef: { fontSize: "12px", color: "#555", lineHeight: 1.5 },
  // Nutrición
  noteBox: {
    padding: "10px 12px",
    background: "#fafafa",
    border: "1px solid #eeeeee",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#737373",
    lineHeight: 1.5,
    marginBottom: "12px",
    fontStyle: "italic",
  },
  nutRow: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    padding: "12px 0",
    borderBottom: "1px solid #f5f5f5",
  },
  nutIcon: { color: "#a8a8a8", flexShrink: 0, paddingTop: "2px" },
  nutTitle: { fontSize: "13px", fontWeight: "700", color: "#171717", marginBottom: "3px" },
  nutDesc: { fontSize: "12px", color: "#737373", lineHeight: 1.5 },
};

const secStyles = {
  wrap: { display: "flex", flexDirection: "column", gap: "14px" },
  header: { display: "flex", alignItems: "center", gap: "8px" },
  icon: { color: "#737373", display: "flex", flexShrink: 0 },
  title: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    fontWeight: "700",
    color: "#404040",
    letterSpacing: "0.12em",
    flexShrink: 0,
  },
  line: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, #e4e4e4, transparent)",
  },
};
