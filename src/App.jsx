// ============================================================
// COMPONENTE PRINCIPAL: App
// Header tech con tipografía mono + línea de scan animada
// ============================================================
import { useState } from "react";
import { meses, warmupData, programInfo, gruposMusculares } from "./data/workoutData";
import MonthView from "./components/MonthView";
import WarmupScreen from "./components/WarmupScreen";
import InfoScreen from "./components/InfoScreen";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [activePage, setActivePage] = useState("meses");
  const [activeMes, setActiveMes] = useState(0);

  return (
    <div style={appStyles.wrapper}>

      {/* ══ HEADER ══════════════════════════════════════════ */}
      <header style={appStyles.header}>
        {/* Línea superior decorativa con gradiente */}
        <div style={appStyles.headerTopLine} />

        <div style={appStyles.headerContent}>
          <div style={appStyles.logo}>
            {/* Indicador de estado — punto pulsante */}
            <span style={appStyles.statusDot} />
            <span style={appStyles.logoText}>LAUREN</span>
            <span style={appStyles.logoSub}>.FIT</span>
          </div>

          {/* Breadcrumb estilo terminal */}
          <div style={appStyles.breadcrumb}>
            <span style={appStyles.breadcrumbSlash}>/</span>
            <span style={appStyles.breadcrumbPage}>
              {activePage === "meses"         && "rutina"}
              {activePage === "calentamiento" && "entrada-en-calor"}
              {activePage === "info"          && "programa"}
            </span>
          </div>
        </div>
      </header>

      {/* ══ CONTENIDO ════════════════════════════════════════ */}
      <main style={appStyles.main}>

        {/* ─── Rutina por meses ─── */}
        {activePage === "meses" && (
          <div style={appStyles.screen}>
            {/* Selector de mes */}
            <div style={appStyles.monthSelector}>
              {meses.map((mes, i) => (
                <button
                  key={mes.mes}
                  style={{ ...appStyles.monthBtn, ...(activeMes === i ? appStyles.monthBtnActive : {}) }}
                  onClick={() => setActiveMes(i)}
                >
                  <span style={activeMes === i ? appStyles.monthBtnNumActive : appStyles.monthBtnNum}>
                    {String(mes.mes).padStart(2, "0")}
                  </span>
                  <span style={activeMes === i ? appStyles.monthBtnLabelActive : appStyles.monthBtnLabel}>
                    MES
                  </span>
                </button>
              ))}
            </div>
            <MonthView mes={meses[activeMes]} warmups={warmupData.dias} />
          </div>
        )}

        {activePage === "calentamiento" && (
          <div style={appStyles.screen}>
            <WarmupScreen data={warmupData} />
          </div>
        )}

        {activePage === "info" && (
          <div style={appStyles.screen}>
            <InfoScreen
              programInfo={programInfo}
              meses={meses}
              gruposMusc={gruposMusculares}
            />
          </div>
        )}
      </main>

      {/* ══ NAV INFERIOR ═══════════════════════════════════ */}
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

const appStyles = {
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
  // Línea superior con gradiente
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
  // Punto de "activo" estilo LED
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#0a0a0a",
    flexShrink: 0,
    // Pulso simulado con border
    boxShadow: "0 0 0 2px rgba(10,10,10,0.12)",
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
  // Breadcrumb estilo CLI
  breadcrumb: { display: "flex", alignItems: "center", gap: "3px" },
  breadcrumbSlash: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    color: "#d1d1d1",
    fontWeight: "300",
  },
  breadcrumbPage: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: "#a8a8a8",
    fontWeight: "500",
    letterSpacing: "0.02em",
  },
  main: { flex: 1, overflowY: "auto" },
  screen: { padding: "16px" },
  // Selector de mes con estilo de tabs numéricos
  monthSelector: {
    display: "flex",
    gap: "5px",
    overflowX: "auto",
    scrollbarWidth: "none",
    paddingBottom: "14px",
  },
  monthBtn: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "7px 12px",
    borderRadius: "8px",
    border: "1px solid #e4e4e4",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    gap: "1px",
    transition: "all 150ms ease",
  },
  monthBtnActive: {
    background: "#0a0a0a",
    border: "1px solid #0a0a0a",
  },
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
