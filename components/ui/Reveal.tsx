"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle fade-up as content scrolls into view — implemented as *progressive
 * enhancement*. The content is fully visible by default (SSR / no-JS / if the
 * observer never fires) and only opts into the hidden→visible animation once
 * JS has mounted and can guarantee it will be revealed again. This matters on
 * the static export: nothing can get "stuck" at opacity:0 if a client-side
 * observer fails to fire. Respects `prefers-reduced-motion`.
 */
type RevealState = "static" | "hidden" | "shown";

export function Reveal({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Start "static" (= fully visible) so the very first paint is never hidden.
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /**
     * Reached-yet test. "Scrolled past" counts as reached: an instant jump — an in-page
     * anchor, or the Back button restoring scroll — can carry an element from below the
     * fold to above it without its intersection ratio ever leaving 0, so the observer
     * never fires and the content would stay at opacity:0 for good.
     */
    const reached = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight;
    };

    // Already on screen at mount → just show it (no hide-then-fade flash).
    if (reached()) {
      setState("shown");
      return;
    }

    // Below the fold → hide it, then fade up when it scrolls into view.
    setState("hidden");

    let settled = false;
    const show = () => {
      if (settled) return;
      settled = true;
      setState("shown");
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show();
      },
      { rootMargin: "-60px" },
    );
    // Backstop for the jump case the observer structurally cannot see. Both a programmatic
    // scrollTo and scroll restoration emit a scroll event, and this unsubscribes on first
    // reveal, so at most the handful of still-hidden blocks are ever listening.
    const onScroll = () => {
      if (reached()) show();
    };

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out",
        state === "hidden" ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
