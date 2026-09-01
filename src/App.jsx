// ============================================================
// COMPONENTE PRINCIPAL: App
// Orquesta todas las pantallas y la navegación.
// Estructura:
//   - Header fijo arriba
//   - Contenido scrolleable en el medio
//   - BottomNav fijo abajo
//
// Para agregar una pantalla nueva:
//   1. Crear componente en /src/components/
//   2. Agregar tab en BottomNav.jsx
//   3. Agregar case en el switch de activePage aquí
// ============================================================

import { useState } from "react";
import { meses, warmupData, programInfo, gruposMusculares } from "./data/workoutData";
import MonthView from "./components/MonthView";
import WarmupScreen from "./components/WarmupScreen";
import InfoScreen from "./components/InfoScreen";
import BottomNav from "./components/BottomNav";

export default function App() {
  // Pantalla activa: "meses" | "calentamiento" | "info"
  const [activePage, setActivePage] = useState("meses");

  // Mes seleccionado en la pantalla de rutina
  const [activeMes, setActiveMes] = useState(0);

  return (
    <div style={appStyles.wrapper}>
      {/* ══════════════════════════════
          HEADER FIJO
          ══════════════════════════════ */}
      <header style={appStyles.header}>
        <div style={appStyles.headerContent}>
          {/* Logo / Nombre */}
          <div style={appStyles.logo}>
            <span style={appStyles.logoText}>Lauren</span>
            <span style={appStyles.logoDot}>.</span>
          </div>

          {/* Título de la pantalla actual */}
          <span style={appStyles.pageTitle}>
            {activePage === "meses" && "Mi Rutina"}
            {activePage === "calentamiento" && "Entrada en calor"}
            {activePage === "info" && "Información"}
          </span>
        </div>
      </header>

      {/* ══════════════════════════════
          CONTENIDO PRINCIPAL
          ══════════════════════════════ */}
      <main style={appStyles.main}>

        {/* ─── Pantalla: Rutina por meses ─── */}
        {activePage === "meses" && (
          <div style={appStyles.screenContainer}>
            {/* Selector de mes */}
            <div style={appStyles.monthSelector}>
              {meses.map((mes, i) => (
                <button
                  key={mes.mes}
                  style={{
                    ...appStyles.monthBtn,
                    ...(activeMes === i ? appStyles.monthBtnActive : {}),
                  }}
                  onClick={() => setActiveMes(i)}
                >
                  {mes.nombre}
                </button>
              ))}
            </div>

            {/* Vista del mes seleccionado */}
            <MonthView
              mes={meses[activeMes]}
              warmups={warmupData.dias}
            />
          </div>
        )}

        {/* ─── Pantalla: Calentamiento ─── */}
        {activePage === "calentamiento" && (
          <div style={appStyles.screenContainer}>
            <WarmupScreen data={warmupData} />
          </div>
        )}

        {/* ─── Pantalla: Info del programa ─── */}
        {activePage === "info" && (
          <div style={appStyles.screenContainer}>
            <InfoScreen
              programInfo={programInfo}
              meses={meses}
              gruposMusc={gruposMusculares}
            />
          </div>
        )}
      </main>

      {/* ══════════════════════════════
          NAVEGACIÓN INFERIOR
          ══════════════════════════════ */}
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

const appStyles = {
  // Contenedor raíz
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    maxWidth: "480px",   /* Máximo ancho para que no se deforme en desktop */
    margin: "0 auto",
  },

  // Header fijo
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "#fff",
    borderBottom: "1px solid #f0f0f0",
    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    gap: "12px",
  },
  logo: {
    display: "flex",
    alignItems: "baseline",
    gap: "1px",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#111",
    letterSpacing: "-0.03em",
  },
  logoDot: {
    fontSize: "22px",
    fontWeight: "900",
    color: "#111",
    lineHeight: 1,
  },
  pageTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#888",
    letterSpacing: "0.02em",
  },

  // Área de contenido
  main: {
    flex: 1,
    overflowY: "auto",
  },
  screenContainer: {
    padding: "16px",
  },

  // Selector de mes (scroll horizontal)
  monthSelector: {
    display: "flex",
    gap: "6px",
    overflowX: "auto",
    paddingBottom: "16px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  monthBtn: {
    flexShrink: 0,
    padding: "7px 14px",
    borderRadius: "99px",
    border: "1.5px solid #e0e0e0",
    background: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    color: "#666",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    letterSpacing: "0.02em",
  },
  monthBtnActive: {
    background: "#111",
    color: "#fff",
    border: "1.5px solid #111",
  },
};
