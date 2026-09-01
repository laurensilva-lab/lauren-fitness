// ============================================================
// COMPONENTE PRINCIPAL: App
// Layout responsive:
//   - Móvil (<768px): header arriba + BottomNav abajo
//   - Desktop (≥768px): Sidebar izquierda + contenido derecha
// ============================================================
import { useState, useEffect } from "react";
import { meses, warmupData, programInfo, gruposMusculares } from "./data/workoutData";
import MonthView    from "./components/MonthView";
import WarmupScreen from "./components/WarmupScreen";
import InfoScreen   from "./components/InfoScreen";
import BottomNav    from "./components/BottomNav";
import Sidebar      from "./components/Sidebar";

export default function App() {
  const [activePage, setActivePage] = useState("meses");
  const [activeMes,  setActiveMes]  = useState(0);

  // Detectar si es desktop (≥768px) — se recalcula al hacer resize
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Contenido central — compartido entre móvil y desktop
  const Content = () => (
    <>
      {activePage === "meses" && (
        <div style={layout.screen}>
          {/* Selector de mes */}
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
                <span style={activeMes === i ? layout.monthBtnLabelActive : layout.monthBtnLabel}>
                  MES
                </span>
              </button>
            ))}
          </div>
          <MonthView mes={meses[activeMes]} warmups={warmupData.dias} />
        </div>
      )}

      {activePage === "calentamiento" && (
        <div style={layout.screen}>
          <WarmupScreen data={warmupData} />
        </div>
      )}

      {activePage === "info" && (
        <div style={layout.screen}>
          <InfoScreen
            programInfo={programInfo}
            meses={meses}
            gruposMusc={gruposMusculares}
          />
        </div>
      )}
    </>
  );

  // ── Layout DESKTOP ─────────────────────────────────────────
  if (isDesktop) {
    return (
      <div style={desktop.root}>
        {/* Sidebar fijo a la izquierda */}
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {/* Área principal */}
        <div style={desktop.main}>
          {/* Header desktop */}
          <header style={desktop.header}>
            <div style={desktop.headerTopLine} />
            <div style={desktop.headerContent}>
              <div style={desktop.breadcrumb}>
                <span style={desktop.breadcrumbSlash}>/</span>
                <span style={desktop.breadcrumbPage}>
                  {activePage === "meses"         && "rutina"}
                  {activePage === "calentamiento" && "entrada-en-calor"}
                  {activePage === "info"          && "programa"}
                </span>
              </div>
              {/* Info extra derecha */}
              <div style={desktop.headerRight}>
                <span style={desktop.headerTag}>FULL BODY</span>
                <span style={desktop.headerTag}>{meses.length} MESES</span>
              </div>
            </div>
          </header>

          {/* Contenido con max-width cómodo */}
          <div style={desktop.content}>
            <Content />
          </div>
        </div>
      </div>
    );
  }

  // ── Layout MÓVIL ───────────────────────────────────────────
  return (
    <div style={mobile.wrapper}>
      <header style={mobile.header}>
        <div style={mobile.headerTopLine} />
        <div style={mobile.headerContent}>
          <div style={mobile.logo}>
            <span style={mobile.statusDot} />
            <span style={mobile.logoText}>LAUREN</span>
            <span style={mobile.logoSub}>.FIT</span>
          </div>
          <div style={mobile.breadcrumb}>
            <span style={mobile.breadcrumbSlash}>/</span>
            <span style={mobile.breadcrumbPage}>
              {activePage === "meses"         && "rutina"}
              {activePage === "calentamiento" && "entrada-en-calor"}
              {activePage === "info"          && "programa"}
            </span>
          </div>
        </div>
      </header>

      <main style={mobile.main}>
        <Content />
      </main>

      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

// ── Estilos Desktop ────────────────────────────────────────
const desktop = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#fff",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid #eeeeee",
  },
  headerTopLine: {
    height: "2px",
    background: "linear-gradient(90deg, #fff 0%, #0a0a0a 40%, #0a0a0a 60%, #fff 100%)",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 32px",
  },
  breadcrumb: { display: "flex", alignItems: "center", gap: "4px" },
  breadcrumbSlash: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "14px",
    color: "#d1d1d1",
  },
  breadcrumbPage: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    color: "#a8a8a8",
    fontWeight: "500",
  },
  headerRight: { display: "flex", gap: "6px" },
  headerTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10px",
    fontWeight: "700",
    color: "#a8a8a8",
    padding: "3px 8px",
    border: "1px solid #eeeeee",
    borderRadius: "4px",
    letterSpacing: "0.08em",
  },
  content: {
    flex: 1,
    // En desktop el contenido tiene máximo ancho y padding generoso
    maxWidth: "860px",
    width: "100%",
    padding: "0",
    paddingBottom: "40px",
  },
};

// ── Estilos Móvil ──────────────────────────────────────────
const mobile = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    maxWidth: "480px",
    margin: "0 auto",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid #eeeeee",
  },
  headerTopLine: {
    height: "2px",
    background: "linear-gradient(90deg, #fff 0%, #0a0a0a 40%, #0a0a0a 60%, #fff 100%)",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
  },
  logo: { display: "flex", alignItems: "center", gap: "6px" },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#0a0a0a",
    boxShadow: "0 0 0 2px rgba(10,10,10,0.12)",
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "15px",
    fontWeight: "700",
    color: "#0a0a0a",
    letterSpacing: "0.06em",
  },
  logoSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "15px",
    fontWeight: "400",
    color: "#a8a8a8",
    letterSpacing: "0.06em",
  },
  breadcrumb: { display: "flex", alignItems: "center", gap: "3px" },
  breadcrumbSlash: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    color: "#d1d1d1",
  },
  breadcrumbPage: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: "#a8a8a8",
    fontWeight: "500",
  },
  main: { flex: 1, overflowY: "auto" },
};

// ── Layout compartido (screen + mes selector) ──────────────
const layout = {
  screen: { padding: "20px 32px" },
  monthSelector: {
    display: "flex",
    gap: "5px",
    overflowX: "auto",
    scrollbarWidth: "none",
    paddingBottom: "16px",
    flexWrap: "wrap",   // En desktop se pueden wrappear
  },
  monthBtn: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "7px 14px",
    borderRadius: "8px",
    border: "1px solid #e4e4e4",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    gap: "1px",
    transition: "all 150ms ease",
  },
  monthBtnActive: { background: "#0a0a0a", border: "1px solid #0a0a0a" },
  monthBtnNum: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "16px",
    fontWeight: "700",
    color: "#737373",
    lineHeight: 1,
  },
  monthBtnNumActive: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: 1,
  },
  monthBtnLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "8px",
    color: "#a8a8a8",
    letterSpacing: "0.1em",
  },
  monthBtnLabelActive: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "8px",
    color: "#737373",
    letterSpacing: "0.1em",
  },
};
