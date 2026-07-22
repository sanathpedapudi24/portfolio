'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  '> Initializing system...',
  '> Loading identity matrix...',
  '> Connecting neural nodes...',
  '> Mounting portfolio v2.0...',
  '> Ready.',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[i]]);
        setProgress(((i + 1) / BOOT_LINES.length) * 100);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
        setTimeout(onComplete, 900);
      }
    }, 240);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 900,
              letterSpacing: '0.2em',
              color: '#c95f3d',
              textShadow: '0 0 30px rgba(201,95,61,0.5)',
              marginBottom: 48,
            }}
          >
            SANATH
          </motion.div>

          {/* Terminal Lines */}
          <div style={{
            width: 'min(480px, 90vw)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
          }}>
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: idx === lines.length - 1 ? '#d98a55' : 'rgba(255,248,240,0.5)',
                  marginBottom: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {line}
                {idx === lines.length - 1 && (
                  <span style={{ animation: 'terminal-cursor 1s ease infinite', display: 'inline-block', width: 8, height: 14, background: '#d98a55' }} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            width: 'min(480px, 90vw)',
            height: 2,
            background: 'rgba(255,248,240,0.08)',
            borderRadius: 2,
            marginTop: 32,
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #c95f3d, #d98a55)',
                borderRadius: 2,
                boxShadow: '0 0 12px rgba(201,95,61,0.5)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          <div style={{
            marginTop: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(255,248,240,0.3)',
            letterSpacing: '0.1em',
          }}>
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
