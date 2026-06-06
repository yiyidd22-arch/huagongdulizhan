"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const visible = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        glowRef.current.style.opacity = visible.current ? "1" : "0";
      }

      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      visible.current = true;
    };

    const onLeave = () => {
      visible.current = false;
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
      aria-hidden
    >
      <div className="absolute -inset-4 rounded-full bg-cyan-400/15 blur-xl" />
      <div className="absolute -inset-1.5 rounded-full bg-cyan-400/25 blur-md" />
      <div className="relative h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(34,211,238,0.6)]" />
    </div>
  );
}
