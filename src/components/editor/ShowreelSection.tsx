'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function EditorShowreelSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="showreel" ref={ref} style={{ padding: '120px 0', background: '#0a0a0a' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'rgba(212,175,55,0.6)',
            textTransform: 'uppercase',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}>
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
            Showreel
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.9)',
          }}>
            Watch the Reel
          </h2>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.97 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'relative',
            maxWidth: 960,
            margin: '0 auto',
            aspectRatio: '16/9',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.05)',
          }}
        >
          {/* Placeholder video embed — replace with real YouTube/Vimeo URL */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0&modestbranding=1"
            title="Sanath — Video Editor Showreel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />

          {/* Cinematic bars */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8%', background: '#000', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8%', background: '#000', zIndex: 10, pointerEvents: 'none' }} />
        </motion.div>

        {/* Video info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            marginTop: 32,
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Duration', value: '2:30' },
            { label: 'Resolution', value: '4K / 1080p' },
            { label: 'Style', value: 'Cinematic' },
            { label: 'Software', value: 'Premiere Pro + AE' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#d4af37' }}>{item.value}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
