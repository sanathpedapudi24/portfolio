'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Zap, Target, Globe, Coffee, Gamepad2 } from 'lucide-react';

const SKILLS = [
  { name: 'Python', pct: 82, color: '#3572a5' },
  { name: 'TypeScript / Angular', pct: 78, color: '#8e5b35' },
  { name: 'Playwright / Selenium', pct: 88, color: '#8e5b35' },
  { name: 'REST APIs', pct: 85, color: '#d98a55' },
  { name: 'AI / LLM Integration', pct: 72, color: '#c95f3d' },
  { name: 'SQL / Databases', pct: 75, color: '#d98a55' },
];

const INTERESTS = [
  { Icon: Cpu, label: 'AI Automation' },
  { Icon: Zap, label: 'Performance' },
  { Icon: Target, label: 'Clean Code' },
  { Icon: Globe, label: 'Open Source' },
  { Icon: Coffee, label: 'Coffee' },
  { Icon: Gamepad2, label: 'Gaming' },
];

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 8,
        fontFamily: 'var(--font-mono)', fontSize: 12,
      }}>
        <span style={{ color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ color: 'var(--text-muted)' }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(201,95,61,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 2 }}
        />
      </div>
    </div>
  );
}

export default function DevAboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} style={{
      padding: 'clamp(58px, 8vw, 96px) 0',
      borderTop: '1px solid rgba(232,154,108,0.16)',
      borderBottom: '1px solid rgba(232,154,108,0.12)',
    }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 0.65fr) minmax(0, 1fr)', gap: 'clamp(24px, 6vw, 72px)' }}>

          {/* Left: Profile heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">Profile</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 4.2rem)',
              fontWeight: 700, lineHeight: 1, marginBottom: 0,
              color: 'var(--text-primary)',
            }}>
              Developer with a builder&apos;s bias.
            </h2>
          </motion.div>

          {/* Right: Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            Sanath&apos;s public GitHub shows a hands-on mix of automation scripts, web interfaces, reinforcement learning
            experiments, and personal Linux tooling. This portfolio presents that range as a focused story:
            useful tools, fast experiments, and a willingness to learn close to the metal.
          </motion.p>
        </div>

        {/* Skills + Interests below */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 64, alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="section-label" style={{ marginBottom: 24 }}>Core Skills</div>
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 0.07} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="section-label" style={{ marginBottom: 24 }}>Interests</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {INTERESTS.map(({ Icon, label }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 14px',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 999,
                  background: 'linear-gradient(135deg, rgba(255,248,240,0.64), rgba(245,220,196,0.2)), rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 850,
                  color: 'var(--text-secondary)',
                  backdropFilter: 'var(--glass-blur)',
                  boxShadow: '0 10px 24px rgba(95,62,39,0.08), inset 0 1px 0 rgba(255,255,255,0.72)',
                }}>
                  <Icon size={14} strokeWidth={2.5} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Currently Learning */}
            <div style={{
              marginTop: 32, padding: '20px 24px',
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: 18, borderLeft: '3px solid var(--accent-cyan)',
              backdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 900,
                color: 'var(--accent-blue)', letterSpacing: 0, textTransform: 'uppercase', marginBottom: 10,
              }}>Currently Learning</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Docker', 'Kubernetes', 'AWS', 'LangChain', 'n8n'].map(tech => (
                  <span key={tech} style={{
                    padding: '6px 14px',
                    border: '1px solid var(--glass-border)', borderRadius: 999,
                    background: 'linear-gradient(135deg, rgba(255,248,240,0.64), rgba(245,220,196,0.2)), rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                    color: 'var(--text-secondary)',
                  }}>{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
