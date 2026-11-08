import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Legacy multi-page routes (/experience, /blogs, …) redirect to the matching
 * anchor on the single-page home so old links keep working. The final URL
 * keeps the hash, making the deep link shareable.
 *
 * Robustness notes (each of these bit during testing):
 * - The component unmounts as soon as the route changes (Home takes over),
 *   so nothing here may rely on effect cleanup — the loop self-terminates.
 * - Chrome can adjust/restore scroll when the document finishes loading,
 *   and web fonts / section images shift layout above the target while the
 *   page is still settling. A correction loop therefore keeps the target
 *   anchored for a few seconds instead of scrolling exactly once.
 * - Scrolls use behavior "instant" so the global `scroll-behavior: smooth`
 *   can't leave a half-finished animation when layout shifts mid-flight.
 * - The hash guard only applies once the target section exists; before the
 *   route switch commits, navigate() may not have updated location.hash yet.
 * - The loop yields immediately to the user (wheel/touch/key/mouse), so
 *   nobody gets yanked back after they move on.
 * - The 96px landing offset comes from `scroll-padding-top: 6rem` on html.
 */
export default function LegacyRedirect({ hash }: { hash: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/#${hash}`, { replace: true });

    const IDLE_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    let userMoved = false;
    const markMoved = () => {
      userMoved = true;
    };
    for (const ev of IDLE_EVENTS) window.addEventListener(ev, markMoved, { passive: true });

    let ticks = 0;
    let stableTicks = 0;
    let interval = 0;
    const stop = () => {
      window.clearInterval(interval);
      for (const ev of IDLE_EVENTS) window.removeEventListener(ev, markMoved);
    };

    const correct = () => {
      ticks++;
      const el = document.getElementById(hash);
      if (!el) {
        // Route switch hasn't committed yet (or never will — give up after ~6s).
        stableTicks = 0;
        if (ticks >= 40) stop();
        return;
      }
      if (userMoved || location.hash !== `#${hash}`) return stop();
      const top = el.getBoundingClientRect().top;
      if (top > -80 && top < 120) {
        // Nicely anchored (0 for #top, 96px for scroll-padding sections).
        if (++stableTicks >= 16 || ticks >= 40) return stop(); // ~2.4s stable
      } else {
        stableTicks = 0;
        el.scrollIntoView({ behavior: "instant" });
      }
    };

    correct();
    interval = window.setInterval(correct, 150);
  }, [hash, navigate]);

  return null;
}
