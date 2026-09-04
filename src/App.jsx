// ============================================================
// APP — swipe sin parpadeo
// Truco: el <main> nunca se desmonta, solo anima el contenido
// con un key + clase CSS. Se evita el flash de fondo negro.
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { meses, warmupData, programInfo, gruposMusculares } from "./data/workoutData";
import MonthView      from "./components/MonthView";
import WarmupScreen   from "./components/WarmupScreen";
import InfoScreen     from "./components/InfoScreen";
import CalendarScreen from "./components/CalendarScreen";
import BottomNav      from "./components/BottomNav";
import Sidebar        from "./components/Sidebar";
import { useSwipe }   from "./hooks/useSwipe";

const PAGES = ["meses", "calentamiento", "calendario", "info"];
const mono  = { fontFamily: "'JetBrains Mono', monospace" };

export default function App() {
  const [activePage, setActivePage] = useState("meses");
  const [activeMes,  setActiveMes]  = useState(0);
  const [isDesktop,  setIsDesktop]  = useState(window.innerWidth >= 768);
  const [slideDir,   setSlideDir]   = useState(null);
  const [animKey,    setAnimKey]    = useState(0);
  const [locked,     setLocked]     = useState(false);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = useCallback((page, dir = null) => {
    if (locked || page === activePage) return;
    setLocked(true);
    setSlideDir(dir);
    setActivePage(page);
    setAnimKey(k => k + 1);
    // Desbloquear después de la animación
    setTimeout(() => setLocked(false), 320);
  }, [locked, activePage]);

  const goNext = useCallback(() => {
    const idx = PAGES.indexOf(activePage);
    if (idx < PAGES.length - 1) navigate(PAGES[idx + 1], "left");
  }, [activePage, navigate]);

  const goPrev = useCallback(() => {
    const idx = PAGES.indexOf(activePage);
    if (idx > 0) navigate(PAGES[idx - 1], "right");
  }, [activePage, navigate]);

  const { handlers } = useSwipe({ onLeft: goNext, onRight: goPrev, threshold: 55 });

  const navWithDir = (page) => {
    const from = PAGES.indexOf(activePage);
    const to   = PAGES.indexOf(page);
    navigate(page, to > from ? "left" : "right");
  };

  const pageTitle = {
    meses: "rutina", calentamiento: "entrada-en-calor",
    calendario: "calendario", info: "programa",
  }[activePage];

  // Clase de animación — sin re-montar el fondo
  const animClass = slideDir === "left"  ? "slide-in-left"
                  : slideDir === "right" ? "slide-in-right"
                  : "anim-fade-up";

  // Pantalla activa
  const Screen = () => {
    if (activePage === "meses") return (
      <>
        <div style={lay.monthSelector}>
          {meses.map((mes, i) => (
            <button key={mes.mes}
              style={{ ...lay.monthBtn, ...(activeMes === i ? lay.monthBtnActive : {}) }}
              onClick={() => setActiveMes(i)}>
              <span style={activeMes === i ? lay.numActive : lay.num}>
                {String(mes.mes).padStart(2, "0")}
              </span>
              <span style={activeMes === i ? lay.subActive : lay.sub}>MES</span>
            </button>
          ))}
        </div>
        <MonthView mes={meses[activeMes]} warmups={warmupData.dias} />
      </>
    );
    if (activePage === "calentamiento") return <WarmupScreen data={warmupData} />;
    if (activePage === "calendario")    return <CalendarScreen />;
    return <InfoScreen programInfo={programInfo} meses={meses} gruposMusc={gruposMusculares} />;
  };

  // ── DESKTOP ────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <div style={desk.root}>
        <Sidebar activePage={activePage} onNavigate={navWithDir} />
        <div style={desk.main}>
          <header style={desk.header}>
            <div style={desk.topLine} />
            <div style={desk.hContent}>
              <div style={desk.breadcrumb}>
                <span style={desk.slash}>/</span>
                <span style={desk.page}>{pageTitle}</span>
              </div>
              <div style={desk.tags}>
                <span style={desk.tag}>FULL BODY</span>
                <span style={desk.tag}>{meses.length} MESES</span>
              </div>
            </div>
          </header>
          <div style={desk.content}>
            {/* Contenedor de animación — solo anima el inner, no el wrapper */}
            <div style={desk.animWrap}>
              <div key={animKey} className={animClass} style={lay.screen}>
                <Screen />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MÓVIL ──────────────────────────────────────────────────
  return (
    <div style={mob.wrapper}>
      {/* Header */}
      <header style={mob.header}>
        <div style={mob.topLine} />
        <div style={mob.hContent}>
          <div style={mob.logo}>
            <span style={mob.dot} />
            <span style={mob.logoText}>LAUREN</span>
            <span style={mob.logoSub}>.FIT</span>
          </div>
          <div style={mob.breadcrumb}>
            <span style={mob.slash}>/</span>
            <span style={mob.page}>{pageTitle}</span>
          </div>
        </div>
        {/* Indicadores de página */}
        <div style={mob.dotsRow}>
          {PAGES.map(p => (
            <button key={p} style={{ ...mob.dotBtn, ...(activePage === p ? mob.dotActive : {}) }}
              onClick={() => navWithDir(p)} />
          ))}
        </div>
      </header>

      {/* Área swipeable — el wrapper NUNCA se desmonta, evita el flash */}
      <main style={mob.main} {...handlers}>
        {/*
          Solo el inner se anima con key.
          El fondo del <main> siempre está presente → sin parpadeo negro.
        */}
        <div style={mob.pageWrap}>
          <div key={animKey} className={animClass} style={lay.screen}>
            <Screen />
          </div>
        </div>
      </main>

      <BottomNav activePage={activePage} onNavigate={navWithDir} />
    </div>
  );
}

// ── Estilos compartidos ──────────────────────────────────────
const lay = {
  screen: { paddingBottom: "40px" },
  monthSelector: { display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "16px", flexWrap: "wrap" },
  monthBtn: { flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 14px", borderRadius: "8px", border: "1px solid #2a2a2a", background: "#111", cursor: "pointer", fontFamily: "inherit", gap: "1px", transition: "all 250ms cubic-bezier(0.16,1,0.3,1)" },
  monthBtnActive: { background: "#fff", border: "1px solid #fff", boxShadow: "0 0 20px rgba(255,255,255,0.12)" },
  num:       { ...mono, fontSize: "16px", fontWeight: "700", color: "#555", lineHeight: 1 },
  numActive: { ...mono, fontSize: "16px", fontWeight: "700", color: "#000", lineHeight: 1 },
  sub:       { ...mono, fontSize: "8px", color: "#444", letterSpacing: "0.1em" },
  subActive: { ...mono, fontSize: "8px", color: "#666", letterSpacing: "0.1em" },
};

// ── Desktop ──────────────────────────────────────────────────
const desk = {
  root: { display: "flex", minHeight: "100vh", background: "#0a0a0a" },
  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  header: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #1e1e1e" },
  topLine: { height: "1px", background: "linear-gradient(90deg,transparent,#333 30%,#555 50%,#333 70%,transparent)" },
  hContent: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px" },
  breadcrumb: { display: "flex", alignItems: "center", gap: "4px" },
  slash: { ...mono, fontSize: "14px", color: "#333" },
  page:  { ...mono, fontSize: "12px", color: "#666", fontWeight: "500" },
  tags:  { display: "flex", gap: "6px" },
  tag:   { ...mono, fontSize: "10px", fontWeight: "700", color: "#444", padding: "3px 8px", border: "1px solid #222", borderRadius: "4px", letterSpacing: "0.08em" },
  content: { maxWidth: "860px", width: "100%", paddingBottom: "40px" },
  // Wrapper de animación sin overflow visible
  animWrap: { overflow: "hidden", position: "relative" },
};

// ── Móvil ────────────────────────────────────────────────────
const mob = {
  wrapper: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", maxWidth: "480px", margin: "0 auto" },
  header: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #1e1e1e" },
  topLine: { height: "1px", background: "linear-gradient(90deg,transparent,#333 30%,#555 50%,#333 70%,transparent)" },
  hContent: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px" },
  logo: { display: "flex", alignItems: "center", gap: "6px" },
  dot: { width: "6px", height: "6px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.5)", flexShrink: 0, animation: "pulseGlow 2.5s ease-in-out infinite" },
  logoText: { ...mono, fontSize: "15px", fontWeight: "700", color: "#f0f0f0", letterSpacing: "0.06em" },
  logoSub:  { ...mono, fontSize: "15px", fontWeight: "400", color: "#444",   letterSpacing: "0.06em" },
  breadcrumb: { display: "flex", alignItems: "center", gap: "3px" },
  slash: { ...mono, fontSize: "13px", color: "#333" },
  page:  { ...mono, fontSize: "11px", color: "#555", fontWeight: "500" },
  dotsRow: { display: "flex", justifyContent: "center", gap: "6px", padding: "6px 0 10px" },
  dotBtn: { width: "5px", height: "5px", borderRadius: "99px", background: "#2a2a2a", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms cubic-bezier(0.34,1.56,0.64,1)" },
  dotActive: { background: "#fff", width: "18px", boxShadow: "0 0 6px rgba(255,255,255,0.4)" },
  // main nunca se desmonta — fondo siempre presente
  main: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    touchAction: "pan-y",
    background: "#0a0a0a",  // fondo explícito para evitar flash
    position: "relative",
  },
  // Wrapper interno que contiene el contenido animado
  pageWrap: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100%",
    padding: "16px",
    background: "#0a0a0a",  // doble seguro — sin flash
  },
};
