'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  onClose: () => void;
}

const COMMANDS = [
  // Navigation
  { id: 'nav-about',      label: 'Go to About',        icon: '👤', category: 'Navigate', identity: 'developer', action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-projects',   label: 'Go to Projects',     icon: '🚀', category: 'Navigate', identity: 'developer', action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-skills',     label: 'Go to Skills',       icon: '⚡', category: 'Navigate', identity: 'developer', action: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-contact',    label: 'Go to Contact',      icon: '📩', category: 'Navigate', identity: 'both',      action: () => document.querySelector('#contact,#booking')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-experience', label: 'Go to Experience',   icon: '🎯', category: 'Navigate', identity: 'developer', action: () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'nav-github',     label: 'Go to GitHub Stats', icon: '🐙', category: 'Navigate', identity: 'developer', action: () => document.querySelector('#github')?.scrollIntoView({ behavior: 'smooth' }) },
  // Links
  { id: 'link-github',   label: 'Open GitHub Profile',  icon: '🐙', category: 'Links',    identity: 'both', action: () => window.open('https://github.com/sanathpedapudi24', '_blank') },
  { id: 'link-linkedin', label: 'Open LinkedIn',        icon: '💼', category: 'Links',    identity: 'both', action: () => window.open('https://linkedin.com/in/sanath24', '_blank') },
  { id: 'link-resume',   label: 'Download Resume',      icon: '📄', category: 'Links',    identity: 'both', action: () => window.open('/resume.pdf', '_blank') },
  // Easter eggs
  // Easter eggs
  { id: 'easter-matrix', label: 'Enter the Matrix',    icon: '🟩', category: 'Fun',      identity: 'both', action: () => {
    // Trigger konami shortcut via direct canvas creation
    const event = new CustomEvent('matrix-activate');
    window.dispatchEvent(event);
  }},
  { id: 'easter-scroll',  label: 'Scroll to top',      icon: '⬆️', category: 'Fun',      identity: 'both', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
];

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelected(0);
  };

  const execute = (cmd: typeof COMMANDS[0]) => {
    cmd.action();
    onClose();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected]);
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="command-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="command-palette"
        initial={{ opacity: 0, scale: 0.96, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: 18, opacity: 0.5 }}>⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search commands, projects, skills..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 14,
              color: 'var(--text-primary)',
              cursor: 'text',
            }}
          />
          <kbd style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '2px 8px',
            fontSize: 11,
            color: 'var(--text-muted)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 360, overflowY: 'auto', padding: '8px 0' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>
              No results for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((cmd, idx) => (
              <div
                key={cmd.id}
                onClick={() => execute(cmd)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 20px',
                  cursor: 'none',
                  background: idx === selected ? 'rgba(0,212,255,0.06)' : 'transparent',
                  borderLeft: idx === selected ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                  transition: 'all 0.1s',
                }}
                onMouseEnter={() => setSelected(idx)}
              >
                <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{cmd.icon}</span>
                <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--text-primary)' }}>{cmd.label}</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  color: 'var(--accent-cyan)',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.15)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  letterSpacing: '0.05em',
                }}>{cmd.category}</span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: 20,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: 'var(--text-muted)',
        }}>
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
