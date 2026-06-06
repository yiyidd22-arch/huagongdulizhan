"use client";

import { useRef, useCallback } from "react";

interface SmoothHorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function SmoothHorizontalScroll({
  children,
  className = "",
}: SmoothHorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumRaf = useRef(0);

  const stopMomentum = useCallback(() => {
    if (momentumRaf.current) cancelAnimationFrame(momentumRaf.current);
  }, []);

  const startMomentum = useCallback(() => {
    stopMomentum();
    const step = () => {
      const el = scrollRef.current;
      if (!el || Math.abs(velocity.current) < 0.3) return;
      el.scrollLeft -= velocity.current;
      velocity.current *= 0.92;
      momentumRaf.current = requestAnimationFrame(step);
    };
    momentumRaf.current = requestAnimationFrame(step);
  }, [stopMomentum]);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    stopMomentum();
    drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !scrollRef.current) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = ((e.clientX - lastX.current) / dt) * 16;
    }
    lastX.current = e.clientX;
    lastTime.current = now;
    scrollRef.current.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    scrollRef.current?.releasePointerCapture(e.pointerId);
    startMomentum();
  };

  const onWheel = (e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    stopMomentum();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    el.scrollLeft += delta;
  };

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto pb-2"
        style={{ WebkitOverflowScrolling: "touch" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      >
        {children}
      </div>
    </div>
  );
}
