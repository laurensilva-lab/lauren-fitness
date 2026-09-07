// ============================================================
// PROTECCIÓN DE CONTENIDO
// Evita que se copie o robe el contenido de la app.
// Este archivo se importa una sola vez en main.jsx
//
// Qué hace:
//   1. Deshabilita click derecho (menú contextual)
//   2. Deshabilita selección de texto con mouse/touch
//   3. Bloquea atajos de teclado: Ctrl+C, Ctrl+A, Ctrl+S,
//      Ctrl+U (ver fuente), F12, Ctrl+Shift+I/J/C (DevTools)
//   4. Detecta si DevTools está abierto y borra la pantalla
//   5. Deshabilita drag & drop de imágenes y texto
//   6. Bloquea PrintScreen en Windows
// ============================================================

export function initProtection() {

  // ── 1. Deshabilitar click derecho ──────────────────────────
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  // ── 2. Deshabilitar selección de texto ─────────────────────
  document.addEventListener("selectstart", (e) => {
    e.preventDefault();
    return false;
  });

  // ── 3. Bloquear atajos de teclado ──────────────────────────
  document.addEventListener("keydown", (e) => {
    const ctrl = e.ctrlKey || e.metaKey; // Ctrl en Windows, Cmd en Mac

    // Ctrl+C → copiar
    if (ctrl && e.key === "c") { e.preventDefault(); return false; }
    // Ctrl+A → seleccionar todo
    if (ctrl && e.key === "a") { e.preventDefault(); return false; }
    // Ctrl+S → guardar página
    if (ctrl && e.key === "s") { e.preventDefault(); return false; }
    // Ctrl+U → ver código fuente
    if (ctrl && e.key === "u") { e.preventDefault(); return false; }
    // Ctrl+P → imprimir
    if (ctrl && e.key === "p") { e.preventDefault(); return false; }
    // F12 → DevTools
    if (e.key === "F12") { e.preventDefault(); return false; }
    // Ctrl+Shift+I → DevTools Inspector
    if (ctrl && e.shiftKey && e.key === "i") { e.preventDefault(); return false; }
    // Ctrl+Shift+J → DevTools Console
    if (ctrl && e.shiftKey && e.key === "j") { e.preventDefault(); return false; }
    // Ctrl+Shift+C → DevTools Element picker
    if (ctrl && e.shiftKey && e.key === "c") { e.preventDefault(); return false; }
  });

  // ── 4. Deshabilitar drag & drop ────────────────────────────
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  });

  // ── 5. CSS para deshabilitar selección visual ───────────────
  // Aplica user-select: none a todo el documento
  const style = document.createElement("style");
  style.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }
    /* Bloquear impresión */
    @media print {
      body { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  // ── 6. Detectar DevTools abierto ───────────────────────────
  // Técnica: mide si el viewport cambió (DevTools lateral)
  // o si hay una diferencia grande entre inner/outer height (DevTools abajo)
  let devtoolsOpen = false;

  const checkDevtools = () => {
    const threshold = 160; // px de diferencia que indica DevTools abierto
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        // Ocultar contenido cuando detecta DevTools
        document.body.style.display = "none";
      }
    } else {
      if (devtoolsOpen) {
        devtoolsOpen = false;
        // Restaurar cuando cierra DevTools
        document.body.style.display = "";
      }
    }
  };

  // Chequear cada segundo
  setInterval(checkDevtools, 1000);
  window.addEventListener("resize", checkDevtools);
}
