'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PLANS = [
  {
    name: 'Starter',
    price: '₹5,000',
    period: 'per video',
    color: 'rgba(255,255,255,0.7)',
    accentColor: 'rgba(255,255,255,0.2)',
    features: [
      'Up to 3 min video',
      'Basic color grading',
      '2 revision rounds',
      '1080p export',
      '5-day delivery',
      'Background music',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹15,000',
    period: 'per video',
    color: '#d4af37',
    accentColor: 'rgba(212,175,55,0.2)',
    features: [
      'Up to 10 min video',
      'Professional color grading',
      '4 revision rounds',
      '4K export',
      '3-day delivery',
      'Custom sound design',
      'Motion graphics',
      'Thumbnail included',
    ],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'based on scope',
    color: '#f5e6a3',
    accentColor: 'rgba(245,230,163,0.15)',
    features: [
      'Unlimited length',
      'Cinema-grade color',
      'Unlimited revisions',
      '4K / 6K export',
      'Priority delivery',
      'Full production support',
      'Custom VFX',
      'Dedicated support',
    ],
    cta: 'Contact Me',
    popular: false,
  },
];

export default function EditorPricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="pricing" ref={ref} style={{ padding: '120px 0', background: '#0a0a0a' }}>
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
            Pricing
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
          }}>
            Transparent Pricing
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          maxWidth: 1000,
          margin: '0 auto',
        }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                position: 'relative',
                background: plan.popular ? 'rgba(212,175,55,0.04)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${plan.popular ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 20,
                padding: '40px 32px',
                transform: plan.popular ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#d4af37',
                  color: '#000',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '4px 16px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                }}>
                  Most Popular
                </div>
              )}

              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 22,
                fontWeight: 600,
                color: plan.color,
                marginBottom: 8,
                letterSpacing: '0.05em',
              }}>{plan.name}</h3>

              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 44,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1,
                marginBottom: 4,
              }}>{plan.price}</div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 32,
                letterSpacing: '0.1em',
              }}>{plan.period}</div>

              <div style={{ width: '100%', height: 1, background: `${plan.accentColor}`, marginBottom: 28 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {plan.features.map(feature => (
                  <div key={feature} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                    <span style={{ color: plan.color, fontSize: 16 }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href="#booking"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 0',
                  background: plan.popular ? '#d4af37' : 'transparent',
                  color: plan.popular ? '#000' : plan.color,
                  border: `1px solid ${plan.popular ? '#d4af37' : plan.color + '44'}`,
                  borderRadius: 8,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  if (plan.popular) {
                    e.currentTarget.style.background = '#f5e6a3';
                  } else {
                    e.currentTarget.style.background = `${plan.color}15`;
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = plan.popular ? '#d4af37' : 'transparent';
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: 40,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          color: 'rgba(255,255,255,0.25)',
        }}>
          Prices are indicative. Contact for exact quotes based on project scope.
        </p>
      </div>
    </section>
  );
}
