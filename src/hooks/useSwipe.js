// ============================================================
// HOOK: useSwipe
// Detecta gestos de swipe táctil (izquierda/derecha).
// Uso: const { handlers } = useSwipe({ onLeft, onRight })
// Aplicá {...handlers} al contenedor que quieras hacer swipeable.
// ============================================================
import { useRef } from "react";

export function useSwipe({ onLeft, onRight, threshold = 50 }) {
  const startX = useRef(null);
  const startY = useRef(null);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (startX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - startX.current;
    const deltaY = e.changedTouches[0].clientY - startY.current;

    // Solo disparar si el movimiento horizontal supera al vertical
    // (evita conflictos con scroll vertical)
    if (Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    if (Math.abs(deltaX) < threshold) return;

    if (deltaX < 0 && onLeft)  onLeft();   // swipe izquierda → siguiente
    if (deltaX > 0 && onRight) onRight();  // swipe derecha → anterior

    startX.current = null;
    startY.current = null;
  };

  return {
    handlers: {
      onTouchStart,
      onTouchEnd,
    },
  };
}
