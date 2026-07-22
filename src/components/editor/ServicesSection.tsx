'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  { icon: '💍', title: 'Wedding Films', desc: 'Cinematic wedding documentaries that capture every emotion, from the vows to the dance floor. Timeless, beautiful, unforgettable.' },
  { icon: '✉️', title: 'Wedding Invitations', desc: 'Stunning digital invitation videos with custom motion graphics, music, and personalized animation for your special day.' },
  { icon: '📱', title: 'Instagram Reels', desc: 'Viral-worthy reels with trending transitions, sound design, and captions optimized for maximum engagement and reach.' },
  { icon: '▶️', title: 'YouTube Editing', desc: 'Long-form video editing with dynamic cuts, B-roll, color grading, and thumbnail-ready thumbnails for YouTube creators.' },
  { icon: '🎬', title: 'Commercial Videos', desc: 'Professional brand commercials and product showcases that tell your story and convert viewers into customers.' },
  { icon: '🎨', title: 'Motion Graphics', desc: 'Custom After Effects animations, title sequences, lower thirds, and motion graphics for any production.' },
  { icon: '🎞️', title: 'Color Grading', desc: 'Professional color grading with LUTs, skin tone correction, cinematic color science for film-quality results.' },
  { icon: '🏢', title: 'Corporate Videos', desc: 'Professional corporate presentations, event recaps, employee spotlights, and training video production.' },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: itemInView ? 1 : 0, y: itemInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '32px 28px',
        transition: 'all 0.3s ease',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(212,175,55,0.25)';
        el.style.background = 'rgba(212,175,55,0.03)';
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 0 40px rgba(212,175,55,0.05)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.06)';
        el.style.background = 'rgba(255,255,255,0.02)';
        el.style.transform = '';
        el.style.boxShadow = '';
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 20 }}>{service.icon}</div>
      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 20,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 12,
      }}>{service.title}</h3>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 13.5,
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.75,
      }}>{service.desc}</p>

      {/* Bottom gold accent */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 28,
        width: 40, height: 1,
        background: 'rgba(212,175,55,0.4)',
      }} />
    </motion.div>
  );
}

export default function EditorServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" ref={ref} style={{ padding: '120px 0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
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
            Services
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            marginBottom: 16,
          }}>
            What I Create
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            color: 'rgba(255,255,255,0.4)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            From intimate wedding films to high-energy commercial content — every frame is crafted with intention.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
