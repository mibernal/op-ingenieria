import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const MAX_HASH_SCROLL_ATTEMPTS = 10;
const HASH_SCROLL_RETRY_MS = 80;

const ScrollToHash = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    let attempt = 0;
    let timeoutId: number | undefined;

    const scrollToHash = () => {
      const hash = location.hash?.replace("#", "");
      if (!hash) return false;

      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (location.hash) {
      const tryScroll = () => {
        attempt += 1;
        if (scrollToHash()) return;
        if (attempt < MAX_HASH_SCROLL_ATTEMPTS) {
          timeoutId = window.setTimeout(tryScroll, HASH_SCROLL_RETRY_MS);
        }
      };

      requestAnimationFrame(tryScroll);
    } else if (prevPathRef.current !== location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    prevPathRef.current = location.pathname;

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location.hash, location.pathname]);

  return null;
};

export default ScrollToHash;
