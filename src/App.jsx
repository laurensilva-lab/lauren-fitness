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
  const [isDesktop,  setIsDesktop]  = useState(window.innerWidth >= 768);
  // Para animar el cambio de página
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = (page) => {
    setActivePage(page);
    setPageKey(k => k + 1); // fuerza re-mount para animación
  };

  const Content = () => (
    <div key={pageKey} className="anim-fade-up" style={layout.screen}>
      {activePage === "meses" && (
        <>
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
        </>
      )}
      {activePage === "calentamiento" && <WarmupScreen data={warmupData} />}
      {activePage === "info" && (
        <InfoScreen programInfo={programInfo} meses={meses} gruposMusc={gruposMusculares} />
      )}
    </div>
  );

  // ── DESKTOP ────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <div style={desktop.root}>
        <Sidebar activePage={activePage} onNavigate={navigate} />
        <div style={desktop.main}>
          <header style={desktop.header}>
            <div style={desktop.topLine} />
            <div style={desktop.headerContent}>
              <div style={desktop.breadcrumb}>
                <span style={desktop.slash}>/</span>
                <span style={desktop.page}>
                  {activePage === "meses" && "rutina"}
                  {activePage === "calentamiento" && "entrada-en-calor"}
                  {activePage === "info" && "programa"}
                </span>
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

  // ── MÓVIL ──────────────────────────────────────────────────
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
            <span style={mobile.page}>
              {activePage === "meses" && "rutina"}
              {activePage === "calentamiento" && "entrada-en-calor"}
              {activePage === "info" && "programa"}
            </span>
          </div>
        </div>
      </header>
      <main style={mobile.main}><Content /></main>
      <BottomNav activePage={activePage} onNavigate={navigate} />
    </div>
  );
}

const shared = {
  mono: { fontFamily: "'JetBrains Mono', monospace" },
};

const layout = {
  screen: { padding: "20px 24px", paddingBottom: "40px" },
  monthSelector: {
    display: "flex", gap: "6px", overflowX: "auto",
    scrollbarWidth: "none", paddingBottom: "16px", flexWrap: "wrap",
  },
  monthBtn: {
    flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center",
    padding: "8px 14px", borderRadius: "8px",
    border: "1px solid #2a2a2a", background: "#111",
    cursor: "pointer", fontFamily: "inherit", gap: "1px",
    transition: "all 250ms cubic-bezier(0.16,1,0.3,1)",
  },
  monthBtnActive: {
    background: "#fff", border: "1px solid #fff",
    boxShadow: "0 0 20px rgba(255,255,255,0.12)",
  },
  monthBtnNum: { ...shared.mono, fontSize: "16px", fontWeight: "700", color: "#555", lineHeight: 1 },
  monthBtnNumActive: { ...shared.mono, fontSize: "16px", fontWeight: "700", color: "#000", lineHeight: 1 },
  monthBtnLabel: { ...shared.mono, fontSize: "8px", color: "#444", letterSpacing: "0.1em" },
  monthBtnLabelActive: { ...shared.mono, fontSize: "8px", color: "#666", letterSpacing: "0.1em" },
};

const desktop = {
  root: { display: "flex", minHeight: "100vh", background: "#0a0a0a" },
  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  header: {
    position: "sticky", top: 0, zIndex: 50,
    background: "rgba(10,10,10,0.85)",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid #1e1e1e",
  },
  topLine: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #333 30%, #555 50%, #333 70%, transparent)",
  },
  headerContent: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 32px",
  },
  breadcrumb: { display: "flex", alignItems: "center", gap: "4px" },
  slash: { ...shared.mono, fontSize: "14px", color: "#333" },
  page:  { ...shared.mono, fontSize: "12px", color: "#666", fontWeight: "500" },
  tags: { display: "flex", gap: "6px" },
  tag: {
    ...shared.mono, fontSize: "10px", fontWeight: "700", color: "#444",
    padding: "3px 8px", border: "1px solid #222", borderRadius: "4px", letterSpacing: "0.08em",
  },
  content: { maxWidth: "860px", width: "100%" },
};

const mobile = {
  wrapper: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    background: "#0a0a0a", maxWidth: "480px", margin: "0 auto",
  },
  header: {
    position: "sticky", top: 0, zIndex: 50,
    background: "rgba(10,10,10,0.88)",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid #1e1e1e",
  },
  topLine: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #333 30%, #555 50%, #333 70%, transparent)",
  },
  headerContent: {
    display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px",
  },
  logo: { display: "flex", alignItems: "center", gap: "6px" },
  dot: {
    width: "6px", height: "6px", borderRadius: "50%",
    background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.5)", flexShrink: 0,
    animation: "pulseGlow 2.5s ease-in-out infinite",
  },
  logoText: { ...shared.mono, fontSize: "15px", fontWeight: "700", color: "#f0f0f0", letterSpacing: "0.06em" },
  logoSub:  { ...shared.mono, fontSize: "15px", fontWeight: "400", color: "#444",   letterSpacing: "0.06em" },
  breadcrumb: { display: "flex", alignItems: "center", gap: "3px" },
  slash: { ...shared.mono, fontSize: "13px", color: "#333" },
  page:  { ...shared.mono, fontSize: "11px", color: "#555", fontWeight: "500" },
  main: { flex: 1, overflowY: "auto" },
};
