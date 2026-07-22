'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  { name: 'Priya & Raj', role: 'Wedding Clients', text: 'Sanath captured our wedding day in the most cinematic way possible. Every frame felt like a movie scene. We cry every time we watch it.', rating: 5 },
  { name: 'TechCorp India', role: 'Corporate Client', text: 'Professional, creative, and delivered on time. The brand video exceeded our expectations. Our social media engagement tripled.', rating: 5 },
  { name: 'Meera Sharma', role: 'Instagram Creator', text: 'My reels went viral after Sanath edited them! The transitions, the sync, the energy — absolutely next level. Highly recommend.', rating: 5 },
  { name: 'FoodBites Brand', role: 'Commercial Client', text: 'Outstanding work on our product commercial. The color grading made everything look appetizing and premium. Will work again.', rating: 5 },
];

export default function EditorTestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" ref={ref} style={{ padding: '120px 0' }}>
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
            Testimonials
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
          }}>
            What Clients Say
          </h2>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Quote marks */}
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 80,
                color: 'rgba(212,175,55,0.2)',
                lineHeight: 0.6,
                marginBottom: 32,
              }}>&quot;</div>

              {/* Stars */}
              <div style={{ marginBottom: 24, color: '#d4af37', fontSize: 18 }}>
                {'★'.repeat(TESTIMONIALS[active].rating)}
              </div>

              {/* Text */}
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.7,
                marginBottom: 40,
              }}>{TESTIMONIALS[active].text}</p>

              {/* Author */}
              <div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#d4af37',
                  marginBottom: 4,
                }}>{TESTIMONIALS[active].name}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.1em',
                }}>{TESTIMONIALS[active].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 48 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 32 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? '#d4af37' : 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
