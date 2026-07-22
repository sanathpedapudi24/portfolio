'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIdentity } from '@/context/IdentityContext';

interface NavigationProps {
  onCommandPalette: () => void;
}

const DEV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

const EDITOR_LINKS = [
  { label: 'Showreel', href: '#showreel' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Book Now', href: '#booking' },
];

export default function Navigation({ onCommandPalette }: NavigationProps) {
  const { identity, setIdentity } = useIdentity();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDev = identity === 'developer';
  const links = isDev ? DEV_LINKS : EDITOR_LINKS;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px clamp(18px, 5vw, 48px)' : '18px clamp(18px, 5vw, 48px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isDev
          ? (scrolled ? 'rgba(255,255,255,0.56)' : 'transparent')
          : (scrolled ? 'rgba(5,5,5,0.85)' : 'transparent'),
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isDev
          ? (scrolled ? '1px solid var(--glass-border)' : '1px solid transparent')
          : (scrolled ? '1px solid var(--border)' : '1px solid transparent'),
        borderRadius: scrolled ? '0 0 22px 22px' : '0',
        boxShadow: isDev && scrolled
          ? '0 16px 46px rgba(109,73,46,0.08), inset 0 1px 0 rgba(255,255,255,0.78)'
          : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: isDev ? 'var(--font-display)' : 'Playfair Display, serif',
          fontSize: isDev ? 14 : 18,
          fontWeight: 800,
          letterSpacing: isDev ? '0.08em' : '0.05em',
          color: isDev ? 'var(--text-primary)' : 'var(--accent-cyan)',
          textDecoration: 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {isDev ? 'Sanath Pedapudi' : 'Sanath Films'}
      </a>

      {/* Desktop Nav Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        listStyle: 'none',
      }} className="hidden-mobile">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: isDev ? 'var(--font-mono)' : 'var(--font-body)',
              fontSize: isDev ? 12 : 13,
              letterSpacing: isDev ? '0.05em' : '0.02em',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '9px 14px',
              borderRadius: 999,
              border: '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              if (isDev) {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,248,240,0.72), rgba(245,220,196,0.3)), rgba(255,255,255,0.5)';
              } else {
                e.currentTarget.style.color = 'var(--accent-cyan)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right side — Identity Toggle + Cmd */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Command Palette Btn */}
        <button
          onClick={onCommandPalette}
          style={{
            background: isDev ? 'var(--glass-bg)' : 'rgba(255,255,255,0.04)',
            border: '1px solid var(--glass-border)',
            borderRadius: 12,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-muted)',
            cursor: 'none',
            transition: 'all 0.2s',
            backdropFilter: isDev ? 'var(--glass-blur)' : 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-accent)';
            e.currentTarget.style.color = 'var(--accent-cyan)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <span>⌘</span> <span>K</span>
        </button>

        {/* Identity Toggle */}
        <IdentityToggle setIdentity={setIdentity} isDev={isDev} />

        {/* Mobile menu */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-only"
          style={{
            background: 'transparent',
            border: '1px solid var(--glass-border)',
            borderRadius: 12,
            padding: '6px 10px',
            color: 'var(--text-primary)',
            cursor: 'none',
            fontSize: 18,
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0, right: 0,
              background: isDev ? 'rgba(255,255,255,0.9)' : 'rgba(5,5,5,0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--glass-border)',
              borderRadius: '0 0 22px 22px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: isDev ? 'var(--font-mono)' : 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(232,154,108,0.1)',
                  fontWeight: 700,
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}

function IdentityToggle({ setIdentity, isDev }: { setIdentity: (id: 'developer' | 'editor') => void; isDev: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: isDev ? 'var(--glass-bg)' : 'rgba(255,255,255,0.04)',
        border: '1px solid var(--glass-border)',
        borderRadius: 40,
        padding: '4px',
        gap: 2,
        cursor: 'none',
        backdropFilter: isDev ? 'var(--glass-blur)' : 'none',
      }}
    >
      {/* Sliding indicator */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        style={{
          position: 'absolute',
          top: 4,
          left: isDev ? 4 : 'calc(50% + 2px)',
          width: 'calc(50% - 6px)',
          height: 'calc(100% - 8px)',
          background: isDev
            ? 'linear-gradient(135deg, rgba(201,95,61,0.2), rgba(142,91,53,0.15))'
            : 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(201,162,39,0.2))',
          border: isDev ? '1px solid rgba(201,95,61,0.3)' : '1px solid rgba(212,175,55,0.3)',
          borderRadius: 36,
        }}
      />
      <button
        onClick={() => setIdentity('developer')}
        style={{
          position: 'relative', zIndex: 1,
          padding: '5px 14px',
          background: 'transparent',
          border: 'none',
          borderRadius: 36,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: isDev ? 700 : 400,
          color: isDev ? '#c95f3d' : 'var(--text-muted)',
          cursor: 'none',
          transition: 'color 0.3s',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        {'</>'} Dev
      </button>
      <button
        onClick={() => setIdentity('editor')}
        style={{
          position: 'relative', zIndex: 1,
          padding: '5px 14px',
          background: 'transparent',
          border: 'none',
          borderRadius: 36,
          fontFamily: isDev ? 'var(--font-mono)' : 'Playfair Display, serif',
          fontSize: 11,
          fontWeight: !isDev ? 700 : 400,
          color: !isDev ? '#d4af37' : 'var(--text-muted)',
          cursor: 'none',
          transition: 'color 0.3s',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        ▶ Editor
      </button>
    </div>
  );
}
