import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const MAX_WAIT_MS = 2000;        // máximo tiempo esperando que aparezca el elemento
const RETRY_EVERY_MS = 50;       // intervalo de reintento
const RECHECKS = [120, 240, 420]; // micro-ajustes por layout shift (carrusel/img/fonts)
const EPSILON_PX = 2;
const MAX_CORRECTION_PX = 6;

function decodeHash(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return hash.replace(/^#/, "");
  }
}

function withTempNoSmooth(fn: () => void) {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  try {
    fn();
  } finally {
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prev || "";
    });
  }
}

function getTopForId(id: string) {
  const el = document.getElementById(id);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return Math.max(0, rect.top + window.scrollY);
}

function snapTo(top: number) {
  withTempNoSmooth(() => {
    window.scrollTo({ top, behavior: "auto" });
  });
}

export default function ScrollToHash() {
  const location = useLocation();

  // clave: usa pathname+search+hash para no “bloquear” hashes repetidos al volver de otra ruta
  const lastKeyRef = useRef<string>("");

  useEffect(() => {
    // ✅ evita que el navegador “restaure” scroll raro al cambiar rutas
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const key = `${location.pathname}${location.search}${location.hash}`;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    // 1) Si NO hay hash: al cambiar ruta, vete arriba (evita caer al final)
    if (!location.hash) {
      // importante: sin smooth para que no se sienta “rebote”
      snapTo(0);
      return;
    }

    const id = decodeHash(location.hash);

    const startedAt = Date.now();
    let cancelled = false;
    let retryTimer: number | null = null;
    const timers: number[] = [];

    const tryScroll = () => {
      if (cancelled) return;

      const top = getTopForId(id);

      // Si todavía no existe el elemento (lazy/suspense), reintenta
      if (top == null) {
        if (Date.now() - startedAt < MAX_WAIT_MS) {
          retryTimer = window.setTimeout(tryScroll, RETRY_EVERY_MS);
        }
        return;
      }

      // 2) Snap inicial (sin smooth) para evitar “scroll en dirección opuesta”
      snapTo(top);

      // 3) Rechecks por layout shift (carrusel/imagenes/fonts)
      RECHECKS.forEach((delay) => {
        const t = window.setTimeout(() => {
          if (cancelled) return;

          const nextTop = getTopForId(id);
          if (nextTop == null) return;

          const current = window.scrollY;
          const diff = nextTop - current;

          if (Math.abs(diff) <= EPSILON_PX) return;

          if (Math.abs(diff) <= MAX_CORRECTION_PX) {
            withTempNoSmooth(() => {
              window.scrollTo({ top: current + diff, behavior: "auto" });
            });
            return;
          }

          snapTo(nextTop);
        }, delay);

        timers.push(t);
      });
    };

    tryScroll();

    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [location.pathname, location.search, location.hash]);

  return null;
}
