// ============================================================
// APP — sin parpadeo en swipe
// Solución: NO se usa key para re-montar. En cambio,
// se anima opacity con una transición CSS directa en el
// elemento, sin desmontarlo nunca. El fondo siempre existe.
// ============================================================
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [visible,    setVisible]    = useState(true);
  const [slideX,     setSlideX]     = useState(0);
  const lockedRef = useRef(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Navegar sin re-montar — fade out → cambiar página → fade in
  const navigate = useCallback((page, dir = null) => {
    if (lockedRef.current || page === activePage) return;
    lockedRef.current = true;

    const offset = dir === "left" ? 20 : dir === "right" ? -20 : 0;

    // 1. Fade out + leve traslación
    setVisible(false);
    setSlideX(offset);

    // 2. Cambiar página cuando ya no se ve (130ms)
    setTimeout(() => {
      setActivePage(page);
      setSlideX(-offset); // posición de entrada opuesta
    }, 140);

    // 3. Fade in desde la posición opuesta
    setTimeout(() => {
      setVisible(true);
      setSlideX(0);
    }, 160);

    // 4. Desbloquear
    setTimeout(() => { lockedRef.current = false; }, 380);
  }, [activePage]);

  const goNext = useCallback(() => {
    const idx = PAGES.indexOf(activePage);
    if (idx < PAGES.length - 1) navigate(PAGES[idx + 1], "left");
  }, [activePage, navigate]);

  const goPrev = useCallback(() => {
    const idx = PAGES.indexOf(activePage);
    if (idx > 0) navigate(PAGES[idx - 1], "right");
  }, [activePage, navigate]);

  const { handlers } = useSwipe({ onLeft: goNext, onRight: goPrev, threshold: 55 });

  const navWithDir = useCallback((page) => {
    const from = PAGES.indexOf(activePage);
    const to   = PAGES.indexOf(page);
    navigate(page, to > from ? "left" : "right");
  }, [activePage, navigate]);

  const pageTitle = {
    meses: "rutina", calentamiento: "entrada-en-calor",
    calendario: "calendario", info: "programa",
  }[activePage];

  // Estilo de transición — CSS transition puro, sin re-montar
  const transStyle = {
    opacity:   visible ? 1 : 0,
    transform: `translateX(${slideX}px)`,
    transition: visible
      ? "opacity 180ms ease, transform 220ms cubic-bezier(0.16,1,0.3,1)"
      : "opacity 130ms ease, transform 130ms ease",
    willChange: "opacity, transform",
  };

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
            <div style={{ ...lay.screen, ...transStyle }}>
              <Screen />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MÓVIL ──────────────────────────────────────────────────
  return (
    <div style={mob.wrapper}>
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
            <button key={p}
              style={{ ...mob.dotBtn, ...(activePage === p ? mob.dotActive : {}) }}
              onClick={() => navWithDir(p)} />
          ))}
        </div>
      </header>

      {/* main nunca se desmonta, siempre tiene fondo */}
      <main style={mob.main} {...handlers}>
        {/* 
          Sin key → React NO re-monta este div.
          La transición es solo CSS opacity + translateX.
          El fondo #0a0a0a siempre está presente → cero flash.
        */}
        <div ref={contentRef} style={{ ...mob.inner, ...transStyle }}>
          <Screen />
        </div>
      </main>

      <BottomNav activePage={activePage} onNavigate={navWithDir} />
    </div>
  );
}

// ── Estilos ──────────────────────────────────────────────────
const lay = {
  screen: { padding: "16px 16px 40px" },
  monthSelector: { display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "16px", flexWrap: "wrap" },
  monthBtn: { flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 14px", borderRadius: "8px", border: "1px solid #2a2a2a", background: "#111", cursor: "pointer", fontFamily: "inherit", gap: "1px", transition: "all 250ms cubic-bezier(0.16,1,0.3,1)" },
  monthBtnActive: { background: "#fff", border: "1px solid #fff", boxShadow: "0 0 20px rgba(255,255,255,0.12)" },
  num:       { ...mono, fontSize: "16px", fontWeight: "700", color: "#555", lineHeight: 1 },
  numActive: { ...mono, fontSize: "16px", fontWeight: "700", color: "#000", lineHeight: 1 },
  sub:       { ...mono, fontSize: "8px", color: "#444", letterSpacing: "0.1em" },
  subActive: { ...mono, fontSize: "8px", color: "#666", letterSpacing: "0.1em" },
};

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
  content: { maxWidth: "860px", width: "100%", paddingBottom: "40px", background: "#0a0a0a" },
};

const mob = {
  wrapper: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", maxWidth: "480px", margin: "0 auto" },
  header: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #1e1e1e" },
  topLine: { height: "1px", background: "linear-gradient(90deg,transparent,#333 30%,#555 50%,#333 70%,transparent)" },
  hContent: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px" },
  logo: { display: "flex", alignItems: "center", gap: "6px" },
  dot: { width: "6px", height: "6px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.5)", flexShrink: 0, animation: "pulseGlow 2.5s ease-in-out infinite" },
  logoText: { ...mono, fontSize: "15px", fontWeight: "700", color: "#f0f0f0", letterSpacing: "0.06em" },
  logoSub:  { ...mono, fontSize: "15px", fontWeight: "400", color: "#444", letterSpacing: "0.06em" },
  breadcrumb: { display: "flex", alignItems: "center", gap: "3px" },
  slash: { ...mono, fontSize: "13px", color: "#333" },
  page:  { ...mono, fontSize: "11px", color: "#555", fontWeight: "500" },
  dotsRow: { display: "flex", justifyContent: "center", gap: "6px", padding: "6px 0 10px" },
  dotBtn: { width: "5px", height: "5px", borderRadius: "99px", background: "#2a2a2a", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms cubic-bezier(0.34,1.56,0.64,1)" },
  dotActive: { background: "#fff", width: "18px", boxShadow: "0 0 6px rgba(255,255,255,0.4)" },
  main: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    touchAction: "pan-y",
    background: "#0a0a0a",   // fondo siempre presente
    WebkitOverflowScrolling: "touch",
  },
  inner: {
    background: "#0a0a0a",   // doble seguro
    minHeight: "100%",
    padding: "0",
  },
};
