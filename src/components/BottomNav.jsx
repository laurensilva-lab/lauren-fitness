// ============================================================
// COMPONENTE: BottomNav
// Barra de navegación inferior — fija en la parte de abajo
// Optimizada para pulgar en celular
// Props:
//   activePage  — página activa ("meses" | "calentamiento" | "info")
//   onNavigate  — función para cambiar de página
// ============================================================

export default function BottomNav({ activePage, onNavigate }) {
  // Definición de las pestañas de navegación
  const tabs = [
    { id: "meses",         icon: "💪", label: "Rutina"    },
    { id: "calentamiento", icon: "🔥", label: "Entrada"   },
    { id: "info",          icon: "📋", label: "Info"      },
  ];

  return (
    <nav style={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          style={{
            ...styles.tab,
            ...(activePage === tab.id ? styles.tabActive : {}),
          }}
          onClick={() => onNavigate(tab.id)}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span
            style={{
              ...styles.label,
              ...(activePage === tab.id ? styles.labelActive : {}),
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "64px",
    background: "#fff",
    borderTop: "1px solid #e8e8e8",
    display: "flex",
    alignItems: "stretch",
    /* Soporte para el "safe area" en iPhone con notch */
    paddingBottom: "env(safe-area-inset-bottom)",
    zIndex: 100,
    boxShadow: "0 -2px 12px rgba(0,0,0,0.05)",
  },
  // Cada tab
  tab: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: "8px 0",
    position: "relative",
    "-webkit-tap-highlight-color": "transparent",
  },
  tabActive: {
    // Indicador superior en el tab activo
    "::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "20%",
      right: "20%",
      height: "2px",
      background: "#111",
      borderRadius: "0 0 2px 2px",
    },
  },
  icon: {
    fontSize: "20px",
    lineHeight: 1,
  },
  label: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#aaa",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  },
  labelActive: {
    color: "#111",
  },
};
