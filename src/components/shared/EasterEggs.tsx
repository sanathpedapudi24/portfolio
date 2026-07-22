'use client';

import { useEffect, useRef, useCallback } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export default function EasterEggs() {
  const konamiRef = useRef<string[]>([]);
  const matrixRef = useRef<HTMLCanvasElement | null>(null);
  const matrixActiveRef = useRef(false);
  const animRef = useRef<number>(0);

  const activateMatrix = useCallback(() => {
    if (matrixActiveRef.current) return;
    matrixActiveRef.current = true;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `position:fixed;inset:0;z-index:99990;background:#000;`;
    document.body.appendChild(canvas);
    matrixRef.current = canvas;

    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ</>{}[]|\\';

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = '14px "JetBrains Mono", monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // Deactivate on any key
    const deactivate = () => {
      cancelAnimationFrame(animRef.current);
      canvas.remove();
      matrixActiveRef.current = false;
      document.removeEventListener('keydown', deactivate);
      document.removeEventListener('click', deactivate);
    };
    setTimeout(() => {
      document.addEventListener('keydown', deactivate);
      document.addEventListener('click', deactivate);
    }, 500);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-10);
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        activateMatrix();
        konamiRef.current = [];
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activateMatrix]);

  return null;
}
