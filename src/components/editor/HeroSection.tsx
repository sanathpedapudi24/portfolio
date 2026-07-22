'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EditorHeroSection() {
  return (
    <section
      id="editor-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#080808',
      }}
    >
      {/* Background: Cinematic gradient + film grain */}
      <div
        className="film-grain"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 60%, rgba(212,175,55,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.02) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />

      {/* Horizontal light leak top */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(255,255,255,0.3), rgba(212,175,55,0.6), transparent)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
        zIndex: 1,
      }} />

      {/* Film edge markings */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            top: `${(i + 0.5) * (100 / 12)}%`,
            width: 16,
            height: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 2,
            zIndex: 1,
          }}
        />
      ))}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            right: 0,
            top: `${(i + 0.5) * (100 / 12)}%`,
            width: 16,
            height: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 2,
            zIndex: 1,
          }}
        />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.4em',
            color: 'rgba(212,175,55,0.7)',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          ✦ &nbsp; Cinematic Visual Storytelling &nbsp; ✦
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(64px, 12vw, 160px)',
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.95)',
            marginBottom: 8,
          }}
        >
          SANATH
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            width: 200,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
            margin: '0 auto 24px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 3vw, 32px)',
            color: 'rgba(212,175,55,0.85)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 56,
          }}
        >
          Video Editor
        </motion.div>

        {/* Profile in cinematic frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            margin: '0 auto 48px',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.3)',
          }} />
          <div style={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            border: '1px dashed rgba(212,175,55,0.1)',
          }} />
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(212,175,55,0.4)',
          }}>
            <Image
              src="/sanath.png"
              alt="Sanath Pedapudi"
              width={200}
              height={200}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'sepia(0.2) contrast(1.05)' }}
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#showreel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              background: '#d4af37',
              color: '#000',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: 4,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f5e6a3';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#d4af37';
              e.currentTarget.style.transform = '';
            }}
          >
            <span>▶</span> Watch Showreel
          </a>
          <a
            href="#booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              background: 'transparent',
              color: 'rgba(212,175,55,0.9)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: 4,
              textDecoration: 'none',
              border: '1px solid rgba(212,175,55,0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#d4af37';
              e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Book a Session
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: 13,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.2em',
        }}
      >
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)' }} />
        scroll
      </motion.div>
    </section>
  );
}
