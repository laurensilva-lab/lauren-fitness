const IconTarget   = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
const IconCalendar = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IconBook     = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>);
const IconApple    = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3c0 1.5 1 2.5 1 2.5H8C5.8 7.5 4 9.3 4 11.5c0 4.7 3.8 8.5 8 8.5s8-3.8 8-8.5C20 9.3 18.2 7.5 16 7.5h-2s1-1 1-2.5a3 3 0 0 0-3-3z"/></svg>);
const IconMuscle   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16M18 4v16"/><path d="M3 8h3M18 8h3M3 16h3M18 16h3"/><line x1="6" y1="12" x2="18" y2="12"/></svg>);

const nutIcons = {
  protein: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  carbs:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  fat:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M8 12h8M12 8v8"/></svg>,
  water:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  scale:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 14V6a6 6 0 0 1 12 0v8"/><line x1="12" y1="6" x2="12" y2="14"/></svg>,
};

const glossary = [
  { term: "RIR",      def: "Reps In Reserve — cuántas reps quedan antes del fallo" },
  { term: "AMRAP",    def: "As Many Reps As Possible — al máximo con buena técnica" },
  { term: "c/m",      def: "Con mancuernas" },
  { term: "xL",       def: "Por lado (cada extremidad)" },
  { term: "2+AMRAP",  def: "2 series normales + 1 serie al fallo" },
  { term: "Drop Set", def: "Bajar el peso y continuar sin descanso" },
];

const nutrition = [
  { icon: nutIcons.protein, title: "Proteína — 2g por kg", desc: "Pollo, carne, huevos, pescado, yogur." },
  { icon: nutIcons.carbs,   title: "Carbohidratos",         desc: "Arroz, avena, papa. Priorizalos cerca del entreno." },
  { icon: nutIcons.fat,     title: "Grasas saludables",     desc: "Palta, frutos secos, aceite de oliva." },
  { icon: nutIcons.water,   title: "Hidratación — 2-3L",   desc: "Más si entrenás fuerte o hace calor." },
  { icon: nutIcons.scale,   title: "Control de peso",       desc: "1-2 veces por semana, a la mañana en ayunas." },
];

export default function InfoScreen({ programInfo, meses, gruposMusc }) {
  return (
    <div style={s.container}>
      {/* Hero con logo RSE de fondo */}
      <div style={s.hero} className="anim-fade-up">
        {/* Logo RSE — semitransparente de fondo */}
        <img src="/img/rse-logo.jpg" alt="" aria-hidden style={s.heroBgImg} />
        {/* Overlay para legibilidad */}
        <div style={s.heroOverlay} />
        {/* Contenido */}
        <div style={s.heroContent}>
          <h2 style={s.heroTitle}>Mi Programa</h2>
          <p style={s.heroSub}>{programInfo.objetivo}</p>
          <div style={s.heroBadge}><span style={s.heroDot} />{programInfo.planificacion}</div>
        </div>
      </div>

      {/* Estructura */}
      <Section icon={<IconCalendar />} title="ESTRUCTURA">
        {meses.map((mes, i) => (
          <div key={mes.mes} style={s.monthRow} className="anim-fade-up" style2={{ animationDelay: `${i*50}ms` }}>
            <div style={s.monthBullet}>
              <span style={s.monthNum}>{String(mes.mes).padStart(2, "0")}</span>
              {mes.mes < meses.length && <div style={s.monthLine} />}
            </div>
            <div style={s.monthInfo}>
              <div style={s.monthName}>{mes.nombre}</div>
              <div style={s.monthMeta}><Tag>{mes.duracion}</Tag><Tag>{mes.inicio}</Tag></div>
              <div style={s.monthObj}>{mes.objetivo}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* Grupos */}
      <Section icon={<IconMuscle />} title="GRUPOS MUSCULARES">
        <div style={s.muscleGrid}>
          {gruposMusc.map(g => (
            <div key={g.letra} style={s.muscleItem}>
              <span style={s.muscleLetter}>{g.letra}</span>
              <span style={s.muscleName}>{g.nombre}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Glosario */}
      <Section icon={<IconBook />} title="GLOSARIO">
        <div style={s.glossary}>
          {glossary.map(t => (
            <div key={t.term} style={s.glossaryRow}>
              <span style={s.glossaryTerm}>{t.term}</span>
              <span style={s.glossaryDef}>{t.def}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Nutrición */}
      <Section icon={<IconApple />} title="NUTRICIÓN BÁSICA">
        <div style={s.noteBox}>Guía orientativa — consultá con un nutricionista para mejores resultados.</div>
        {nutrition.map((n, i) => (
          <div key={i} style={s.nutRow}>
            <div style={s.nutIcon}>{n.icon}</div>
            <div><div style={s.nutTitle}>{n.title}</div><div style={s.nutDesc}>{n.desc}</div></div>
          </div>
        ))}
      </Section>
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <section style={sec.wrap}>
      <div style={sec.header}>
        <span style={sec.icon}>{icon}</span>
        <span style={sec.title}>{title}</span>
        <div style={sec.line} />
      </div>
      {children}
    </section>
  );
}

function Tag({ children }) {
  return <span style={tagS}>{children}</span>;
}

const tagS = {
  display: "inline-block", padding: "2px 7px",
  background: "#161616", border: "1px solid #2a2a2a", borderRadius: "4px",
  fontSize: "10px", fontFamily: "'JetBrains Mono',monospace", color: "#555", fontWeight: "600",
};

const s = {
  container: { display: "flex", flexDirection: "column", gap: "28px" },
  hero: {
    position: "relative", background: "#111", borderRadius: "14px",
    overflow: "hidden", padding: "40px 20px 36px", border: "1px solid #1e1e1e",
    minHeight: "160px",
  },
  // Logo RSE de fondo — ocupa todo el hero
  heroBgImg: {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover", objectPosition: "center",
    opacity: 0.18,           // muy sutil para no tapar el texto
    mixBlendMode: "luminosity",
  },
  // Gradiente oscuro encima de la imagen para que el texto se lea
  heroOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 100%)",
  },
  heroContent: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" },
  heroTitle: { fontSize: "24px", fontWeight: "800", color: "#f0f0f0", letterSpacing: "-0.03em" },
  heroSub:   { fontSize: "13px", color: "#444" },
  heroBadge: {
    display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px",
    border: "1px solid #2a2a2a", borderRadius: "99px",
    fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#555", marginTop: "4px",
  },
  heroDot: { width: "5px", height: "5px", borderRadius: "50%", background: "#fff", opacity: 0.3 },
  // Meses
  monthRow: { display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "16px" },
  monthBullet: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", paddingTop: "2px" },
  monthNum: {
    fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "700",
    color: "#000", background: "#fff", width: "26px", height: "26px",
    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    boxShadow: "0 0 10px rgba(255,255,255,0.1)",
  },
  monthLine: { width: "1px", flex: 1, minHeight: "20px", background: "#1e1e1e" },
  monthInfo: { flex: 1 },
  monthName: { fontSize: "14px", fontWeight: "700", color: "#d0d0d0", marginBottom: "4px" },
  monthMeta: { display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "4px" },
  monthObj:  { fontSize: "12px", color: "#444" },
  // Músculos
  muscleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" },
  muscleItem: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "9px 11px", border: "1px solid #1e1e1e", borderRadius: "8px", background: "#111",
    transition: "border-color 200ms ease",
  },
  muscleLetter: { fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", fontWeight: "700", color: "#e0e0e0", minWidth: "28px" },
  muscleName:   { fontSize: "12px", color: "#555" },
  // Glosario
  glossary: { border: "1px solid #1e1e1e", borderRadius: "10px", overflow: "hidden" },
  glossaryRow: { display: "flex", gap: "10px", alignItems: "flex-start", padding: "11px 13px", borderBottom: "1px solid #141414" },
  glossaryTerm: { fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: "700", color: "#e0e0e0", minWidth: "72px", flexShrink: 0 },
  glossaryDef:  { fontSize: "12px", color: "#555", lineHeight: 1.5 },
  // Nutrición
  noteBox: {
    padding: "10px 12px", background: "#0e0e0e", border: "1px solid #1e1e1e",
    borderRadius: "8px", fontSize: "12px", color: "#444", lineHeight: 1.5, marginBottom: "12px", fontStyle: "italic",
  },
  nutRow: { display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid #141414" },
  nutIcon:  { color: "#444", flexShrink: 0, paddingTop: "2px" },
  nutTitle: { fontSize: "13px", fontWeight: "700", color: "#c0c0c0", marginBottom: "3px" },
  nutDesc:  { fontSize: "12px", color: "#555", lineHeight: 1.5 },
};

const sec = {
  wrap: { display: "flex", flexDirection: "column", gap: "14px" },
  header: { display: "flex", alignItems: "center", gap: "8px" },
  icon:  { color: "#444", display: "flex", flexShrink: 0 },
  title: { fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", fontWeight: "700", color: "#333", letterSpacing: "0.12em", flexShrink: 0 },
  line:  { flex: 1, height: "1px", background: "linear-gradient(90deg, #1e1e1e, transparent)" },
};
