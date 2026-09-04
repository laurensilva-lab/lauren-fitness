// ============================================================
// APP — con swipe táctil entre páginas en móvil
// Orden de páginas: Rutina → Entrada → Calendario → Info
// Swipe izquierda = siguiente, derecha = anterior
// ============================================================
import { useState, useEffect, useRef } from "react";
import { meses, warmupData, programInfo, gruposMusculares } from "./data/workoutData";
import MonthView      from "./components/MonthView";
import WarmupScreen   from "./components/WarmupScreen";
import InfoScreen     from "./components/InfoScreen";
import CalendarScreen from "./components/CalendarScreen";
import BottomNav      from "./components/BottomNav";
import Sidebar        from "./components/Sidebar";
import { useSwipe }   from "./hooks/useSwipe";

// Orden fijo de páginas para el swipe
const PAGES = ["meses", "calentamiento", "calendario", "info"];

export default function App() {
  const [activePage, setActivePage] = useState("meses");
  const [activeMes,  setActiveMes]  = useState(0);
  const [isDesktop,  setIsDesktop]  = useState(window.innerWidth >= 768);

  // Para animación de dirección del slide
  const [slideDir,  setSlideDir]  = useState(null); // "left" | "right" | null
  const [isAnimating, setIsAnimating] = useState(false);
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Navegar con dirección para la animación
  const navigate = (page, dir = null) => {
    if (isAnimating || page === activePage) return;
    setSlideDir(dir);
    setIsAnimating(true);
    setActivePage(page);
    setPageKey(k => k + 1);
    setTimeout(() => setIsAnimating(false), 320);
  };

  // Swipe izquierda → página siguiente
  const goNext = () => {
    const idx = PAGES.indexOf(activePage);
    if (idx < PAGES.length - 1) navigate(PAGES[idx + 1], "left");
  };

  // Swipe derecha → página anterior
  const goPrev = () => {
    const idx = PAGES.indexOf(activePage);
    if (idx > 0) navigate(PAGES[idx - 1], "right");
  };

  const { handlers: swipeHandlers } = useSwipe({
    onLeft:  goNext,
    onRight: goPrev,
    threshold: 55,
  });

  const PageTitle = () => {
    if (activePage === "meses")         return "rutina";
    if (activePage === "calentamiento") return "entrada-en-calor";
    if (activePage === "calendario")    return "calendario";
    return "programa";
  };

  // Clase de animación según dirección
  const slideClass = slideDir === "left"  ? "slide-in-left"
                   : slideDir === "right" ? "slide-in-right"
                   : "anim-fade-up";

  const Content = () => (
    <div
      key={pageKey}
      className={slideClass}
      style={layout.screen}
    >
      {activePage === "meses" && (
        <>
          <div style={layout.monthSelector}>
            {meses.map((mes, i) => (
              <button
                key={mes.mes}
                style={{ ...layout.monthBtn, ...(activeMes === i ? layout.monthBtnActive : {}) }}
                onClick={() => setActiveMes(i)}
              >
                <span style={activeMes === i ? layout.monthBtnNumActive : layout.monthBtnNum}>
                  {String(mes.mes).padStart(2, "0")}
                </span>
                <span style={activeMes === i ? layout.monthBtnLabelActive : layout.monthBtnLabel}>MES</span>
              </button>
            ))}
          </div>
          <MonthView mes={meses[activeMes]} warmups={warmupData.dias} />
        </>
      )}
      {activePage === "calentamiento" && <WarmupScreen data={warmupData} />}
      {activePage === "calendario"    && <CalendarScreen />}
      {activePage === "info"          && (
        <InfoScreen programInfo={programInfo} meses={meses} gruposMusc={gruposMusculares} />
      )}
    </div>
  );

  // ── DESKTOP — sin swipe ────────────────────────────────────
  if (isDesktop) {
    return (
      <div style={desktop.root}>
        <Sidebar activePage={activePage} onNavigate={(p) => navigate(p)} />
        <div style={desktop.main}>
          <header style={desktop.header}>
            <div style={desktop.topLine} />
            <div style={desktop.headerContent}>
              <div style={desktop.breadcrumb}>
                <span style={desktop.slash}>/</span>
                <span style={desktop.page}><PageTitle /></span>
              </div>
              <div style={desktop.tags}>
                <span style={desktop.tag}>FULL BODY</span>
                <span style={desktop.tag}>{meses.length} MESES</span>
              </div>
            </div>
          </header>
          <div style={desktop.content}><Content /></div>
        </div>
      </div>
    );
  }

  // ── MÓVIL — con swipe ─────────────────────────────────────
  return (
    <div style={mobile.wrapper}>
      <header style={mobile.header}>
        <div style={mobile.topLine} />
        <div style={mobile.headerContent}>
          <div style={mobile.logo}>
            <span style={mobile.dot} />
            <span style={mobile.logoText}>LAUREN</span>
            <span style={mobile.logoSub}>.FIT</span>
          </div>
          <div style={mobile.breadcrumb}>
            <span style={mobile.slash}>/</span>
            <span style={mobile.page}><PageTitle /></span>
          </div>
        </div>

        {/* Indicadores de página — puntos */}
        <div style={mobile.dots}>
          {PAGES.map(p => (
            <button
              key={p}
              style={{ ...mobile.dot2, ...(activePage === p ? mobile.dot2Active : {}) }}
              onClick={() => {
                const fromIdx = PAGES.indexOf(activePage);
                const toIdx   = PAGES.indexOf(p);
                navigate(p, toIdx > fromIdx ? "left" : "right");
              }}
            />
          ))}
        </div>
      </header>

      {/* Área swipeable */}
      <main style={mobile.main} {...swipeHandlers}>
        <Content />
      </main>

      <BottomNav
        activePage={activePage}
        onNavigate={(p) => {
          const fromIdx = PAGES.indexOf(activePage);
          const toIdx   = PAGES.indexOf(p);
          navigate(p, toIdx > fromIdx ? "left" : "right");
        }}
      />
    </div>
  );
}

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const layout = {
  screen: { padding: "16px 16px 40px" },
  monthSelector: { display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "16px", flexWrap: "wrap" },
  monthBtn: { flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 14px", borderRadius: "8px", border: "1px solid #2a2a2a", background: "#111", cursor: "pointer", fontFamily: "inherit", gap: "1px", transition: "all 250ms cubic-bezier(0.16,1,0.3,1)" },
  monthBtnActive:      { background: "#fff", border: "1px solid #fff", boxShadow: "0 0 20px rgba(255,255,255,0.12)" },
  monthBtnNum:         { ...mono, fontSize: "16px", fontWeight: "700", color: "#555", lineHeight: 1 },
  monthBtnNumActive:   { ...mono, fontSize: "16px", fontWeight: "700", color: "#000", lineHeight: 1 },
  monthBtnLabel:       { ...mono, fontSize: "8px", color: "#444", letterSpacing: "0.1em" },
  monthBtnLabelActive: { ...mono, fontSize: "8px", color: "#666", letterSpacing: "0.1em" },
};

const desktop = {
  root: { display: "flex", minHeight: "100vh", background: "#0a0a0a" },
  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  header: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #1e1e1e" },
  topLine: { height: "1px", background: "linear-gradient(90deg, transparent, #333 30%, #555 50%, #333 70%, transparent)" },
  headerContent: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px" },
  breadcrumb: { display: "flex", alignItems: "center", gap: "4px" },
  slash: { ...mono, fontSize: "14px", color: "#333" },
  page:  { ...mono, fontSize: "12px", color: "#666", fontWeight: "500" },
  tags:  { display: "flex", gap: "6px" },
  tag:   { ...mono, fontSize: "10px", fontWeight: "700", color: "#444", padding: "3px 8px", border: "1px solid #222", borderRadius: "4px", letterSpacing: "0.08em" },
  content: { maxWidth: "860px", width: "100%", paddingBottom: "40px" },
};

const mobile = {
  wrapper: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", maxWidth: "480px", margin: "0 auto", overflowX: "hidden" },
  header: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #1e1e1e" },
  topLine: { height: "1px", background: "linear-gradient(90deg, transparent, #333 30%, #555 50%, #333 70%, transparent)" },
  headerContent: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px" },
  logo: { display: "flex", alignItems: "center", gap: "6px" },
  dot: { width: "6px", height: "6px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.5)", flexShrink: 0, animation: "pulseGlow 2.5s ease-in-out infinite" },
  logoText: { ...mono, fontSize: "15px", fontWeight: "700", color: "#f0f0f0", letterSpacing: "0.06em" },
  logoSub:  { ...mono, fontSize: "15px", fontWeight: "400", color: "#444", letterSpacing: "0.06em" },
  breadcrumb: { display: "flex", alignItems: "center", gap: "3px" },
  slash: { ...mono, fontSize: "13px", color: "#333" },
  page:  { ...mono, fontSize: "11px", color: "#555", fontWeight: "500" },
  // Puntos indicadores de página
  dots: { display: "flex", justifyContent: "center", gap: "6px", padding: "6px 0 10px" },
  dot2: { width: "5px", height: "5px", borderRadius: "50%", background: "#2a2a2a", border: "none", cursor: "pointer", padding: 0, transition: "all 300ms cubic-bezier(0.34,1.56,0.64,1)" },
  dot2Active: { background: "#fff", width: "18px", borderRadius: "3px", boxShadow: "0 0 6px rgba(255,255,255,0.4)" },
  main: { flex: 1, overflowY: "auto", overflowX: "hidden", touchAction: "pan-y" },
};
