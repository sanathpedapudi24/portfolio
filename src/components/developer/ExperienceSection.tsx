'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, GraduationCap, Star } from 'lucide-react';

const TIMELINE = [
  {
    date: '2023 — Present',
    role: 'Automation & AI Projects',
    org: 'Self-Directed',
    type: 'project',
    color: '#c95f3d',
    Icon: Rocket,
    details: [
      'Built WhatsApp automation pipelines using Playwright',
      'Experimented with local LLMs using Ollama and Unsloth',
      'Created n8n workflows for productivity automation',
      'Developed web scraping tools for data collection',
    ],
    tech: ['Python', 'Playwright', 'Ollama', 'n8n'],
  },
  {
    date: '2022 — 2024',
    role: 'B.Tech Graduate',
    org: 'Engineering College',
    type: 'education',
    color: '#8e5b35',
    Icon: GraduationCap,
    details: [
      'Computer Science & Engineering degree',
      'Built Investment Planner as final year project',
      'Active in hackathons and coding competitions',
      'Learned fundamentals: DSA, OS, DBMS, Networks',
    ],
    tech: ['C', 'Java', 'Python', 'SQL'],
  },
  {
    date: '2021',
    role: 'First Line of Code',
    org: 'Self-taught',
    type: 'milestone',
    color: '#d98a55',
    Icon: Star,
    details: [
      'Started learning Python and web development',
      'Built first automation script',
      'Discovered love for problem-solving through code',
    ],
    tech: ['Python', 'HTML', 'CSS', 'JavaScript'],
  },
];

function TimelineItem({ item, index, isLast }: { item: typeof TIMELINE[0]; index: number; isLast: boolean }) {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, margin: '-60px' });
  const { Icon } = item;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: itemInView ? 1 : 0, x: itemInView ? 0 : -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        position: 'relative',
        paddingLeft: 60,
        paddingBottom: isLast ? 0 : 64,
      }}
    >
      <div style={{
        position: 'absolute', left: 11, top: 4,
        width: 20, height: 20, borderRadius: '50%',
        background: item.color, border: '3px solid var(--bg-primary)',
        boxShadow: `0 0 16px ${item.color}44`,
        zIndex: 1,
      }} />

      <div style={{
        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
        borderRadius: 22, padding: '28px 32px',
        borderLeft: `3px solid ${item.color}`,
        backdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)',
        transition: 'border-color 0.3s',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{item.date}</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{item.role}</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: item.color, marginTop: 4, fontWeight: 600 }}>{item.org}</div>
          </div>
          <Icon size={24} color={item.color} strokeWidth={1.5} />
        </div>

        <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {item.details.map((d, di) => (
            <li key={di} style={{
              fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-secondary)',
              lineHeight: 1.6, display: 'flex', gap: 10,
            }}>
              <span style={{ color: item.color, flexShrink: 0, marginTop: 2 }}>›</span>
              {d}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
          {item.tech.map(t => (
            <span key={t} style={{
              padding: '4px 12px',
              border: `1px solid ${item.color}33`, borderRadius: 999,
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
              color: item.color, background: `${item.color}0a`,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function DevExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="experience" ref={ref} style={{ padding: 'clamp(58px, 8vw, 96px) 0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <div className="section-label">Momentum</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 4.2rem)',
            fontWeight: 700, lineHeight: 1,
            color: 'var(--text-primary)',
          }}>
            Recent build pattern
          </h2>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 800 }}>
          <div style={{
            position: 'absolute', left: 20, top: 0, bottom: 0, width: 1,
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--border) 70%, transparent)',
          }} />
          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} isLast={i === TIMELINE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
