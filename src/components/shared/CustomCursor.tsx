'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const timer = setTimeout(() => setVisible(true), 0);

    const onMove = (e: MouseEvent) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 5}px`;
        cursorRef.current.style.top = `${e.clientY - 5}px`;
      }
    };

    const animate = () => {
      const { mx, my, rx, ry } = posRef.current;
      const nx = rx + (mx - rx - 18) * 0.13;
      const ny = ry + (my - ry - 18) * 0.13;
      posRef.current.rx = nx;
      posRef.current.ry = ny;
      if (ringRef.current) {
        ringRef.current.style.left = `${nx}px`;
        ringRef.current.style.top = `${ny}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(2.5)';
      if (ringRef.current) ringRef.current.style.transform = 'scale(1.6)';
    };
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)';
      if (ringRef.current) ringRef.current.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10,
          borderRadius: '50%',
          background: 'var(--cursor-color, #00d4ff)',
          pointerEvents: 'none', zIndex: 99999,
          transition: 'transform 0.12s ease',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1px solid var(--cursor-ring, rgba(0,212,255,0.3))',
          pointerEvents: 'none', zIndex: 99998,
          transition: 'transform 0.2s ease',
        }}
      />
    </>
  );
}
