'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TYPING_TEXTS = [
  'Software Engineer',
  'Automation Builder',
  'AI Enthusiast',
  'Full Stack Developer',
  'Problem Solver',
];

function useTypingEffect(texts: string[], speed = 70, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setTextIdx(i => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

export default function DevHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const typedText = useTypingEffect(TYPING_TEXTS);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const COUNT = Math.min(40, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,95,61,0.18)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,95,61,${0.04 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(circle at 14% 8%, rgba(255,248,240,0.44), transparent 22%)',
      }} />

      <div
        className="container-custom"
        style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.02fr) minmax(320px, 0.8fr)',
          alignItems: 'center',
          gap: 'clamp(28px, 6vw, 80px)',
          paddingTop: 'clamp(44px, 8vw, 92px)',
          paddingBottom: 'clamp(28px, 5vw, 48px)',
        }}
      >
        {/* Left: Text */}
        <div style={{ maxWidth: 790 }}>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              margin: '0 0 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 0.68rem + 0.2vw, 0.82rem)',
              fontWeight: 900,
              color: 'var(--accent-blue)',
              textTransform: 'uppercase',
            }}
          >
            Python automation · Web experiments · Systems tinkering
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="gradient-text-dev"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 18,
              whiteSpace: 'nowrap',
            }}
          >
            Sanath Pedapudi
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              minHeight: 40,
            }}
          >
            <span style={{ color: 'var(--accent-cyan)' }}>{'>'}</span>
            <span>{typedText}</span>
            <span style={{
              display: 'inline-block', width: 2, height: '1.1em',
              background: 'var(--accent-cyan)',
              animation: 'terminal-cursor 1s ease infinite',
            }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              marginTop: 24, marginBottom: 28,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.08rem, 2vw, 1.35rem)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 650,
            }}
          >
            I build practical tools, playful web projects, and automation workflows that turn repetitive work into clean,
            repeatable systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a href="https://github.com/sanathpedapudi24" target="_blank" rel="noopener noreferrer" className="btn-dev-primary">
              View GitHub
            </a>
            <a href="#projects" className="btn-dev-ghost">
              Explore Projects
            </a>
          </motion.div>
        </div>

        {/* Right: Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-visual-container"
          style={{ display: 'grid', gap: 18, minWidth: 0 }}
        >
          <div style={{
            border: '1px solid rgba(255,255,255,0.28)',
            borderRadius: 22,
            overflow: 'hidden',
            background: 'linear-gradient(145deg, rgba(37,31,26,0.78), rgba(70,48,35,0.7))',
            color: 'var(--bg-primary)',
            backdropFilter: 'var(--glass-blur)',
            boxShadow: 'var(--glass-shadow)',
          }}>
            <div style={{
              display: 'flex', gap: 8, padding: 14,
              borderBottom: '1px solid rgba(255,255,255,0.16)',
              background: 'rgba(255,255,255,0.08)',
            }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#c95f3d' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#d98a55' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#8e5b35' }} />
            </div>
            <pre style={{
              padding: 'clamp(18px, 4vw, 30px)', margin: 0,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.7,
              fontFamily: 'var(--font-mono)',
              color: 'rgba(255,248,240,0.85)',
            }}>{`sanath@portfolio:~$ github stats
public_repos: 12
focus: automation, web, AI games
latest: swingging · Python
status: building, learning, shipping`}</pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            {['Python', 'TypeScript', 'HTML', 'CSS'].map(lang => (
              <span key={lang} style={{
                minHeight: 60, border: '1px solid var(--glass-border)',
                borderRadius: 18, padding: 18,
                background: 'var(--glass-bg)', color: 'var(--text-secondary)',
                fontWeight: 900, fontFamily: 'var(--font-mono)', fontSize: 13,
                backdropFilter: 'var(--glass-blur)',
                boxShadow: 'var(--glass-shadow)',
              }}>{lang}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
          color: 'var(--text-muted)', textTransform: 'uppercase',
        }}
      >
        <ChevronDown size={16} style={{ opacity: 0.5 }} />
        Scroll
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-visual-container { display: none !important; }
          #hero .container-custom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
