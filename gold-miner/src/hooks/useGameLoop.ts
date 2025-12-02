import { useEffect, useRef } from 'react';

export function useGameLoop(callback: (dt: number, elapsed: number) => void, running: boolean) {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!running) return;

    const tick = (now: number) => {
      if (lastRef.current == null) {
        lastRef.current = now;
      }
      const dtMs = now - lastRef.current;
      lastRef.current = now;
      const dt = dtMs / 1000; // seconds
      elapsedRef.current += dt;
      callback(dt, elapsedRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [callback, running]);
}
