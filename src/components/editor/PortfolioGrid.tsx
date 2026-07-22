'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Wedding', 'Invitation', 'Reels', 'Commercial', 'Corporate'];

const PORTFOLIO_ITEMS = [
  { id: 1, title: 'Priya & Raj Wedding Film', category: 'Wedding', duration: '8:45', color: '#8b5e3c', emoji: '💍' },
  { id: 2, title: 'TechCorp Brand Reveal', category: 'Commercial', duration: '1:30', color: '#1a1a2e', emoji: '🎬' },
  { id: 3, title: 'Digital Wedding Invite', category: 'Invitation', duration: '0:45', color: '#d4af37', emoji: '✉️' },
  { id: 4, title: 'Fitness Brand Reel', category: 'Reels', duration: '0:30', color: '#e74c3c', emoji: '💪' },
  { id: 5, title: 'Annual Report 2024', category: 'Corporate', duration: '4:20', color: '#2c3e50', emoji: '🏢' },
  { id: 6, title: 'Food Brand Commercial', category: 'Commercial', duration: '0:60', color: '#e67e22', emoji: '🍽️' },
  { id: 7, title: 'Meera & Kiran Highlights', category: 'Wedding', duration: '12:00', color: '#8e44ad', emoji: '👰' },
  { id: 8, title: 'Travel Vlog Edit', category: 'Reels', duration: '3:20', color: '#27ae60', emoji: '✈️' },
  { id: 9, title: 'Corporate Event Recap', category: 'Corporate', duration: '5:15', color: '#34495e', emoji: '🎪' },
];

function PortfolioCard({ item, index }: { item: typeof PORTFOLIO_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      style={{
        position: 'relative',
        aspectRatio: index % 3 === 0 ? '4/5' : '3/4',
        background: `linear-gradient(135deg, ${item.color}44 0%, #111 100%)`,
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'none',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 80,
        opacity: 0.15,
      }}>
        {item.emoji}
      </div>

      {/* Overlay on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px 20px',
            }}
          >
            {/* Play button */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -60%)',
              width: 56, height: 56,
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: '#000',
            }}>▶</div>

            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#d4af37',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>{item.category}</div>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 16,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.95)',
              }}>{item.title}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)',
                marginTop: 4,
              }}>{item.duration}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category badge */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        padding: '3px 10px',
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(212,175,55,0.3)',
        borderRadius: 4,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10,
        color: '#d4af37',
        letterSpacing: '0.1em',
      }}>{item.category}</div>
    </motion.div>
  );
}

export default function EditorPortfolioGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = PORTFOLIO_ITEMS.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section id="portfolio" ref={ref} style={{ padding: '120px 0', background: '#0a0a0a' }}>
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
            Portfolio
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            marginBottom: 40,
          }}>
            Selected Works
          </h2>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  background: activeCategory === cat ? '#d4af37' : 'transparent',
                  color: activeCategory === cat ? '#000' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${activeCategory === cat ? '#d4af37' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 40,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: activeCategory === cat ? 600 : 400,
                  cursor: 'none',
                  transition: 'all 0.25s ease',
                  letterSpacing: '0.05em',
                }}
              >{cat}</button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
