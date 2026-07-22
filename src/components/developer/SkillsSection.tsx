'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Bot, Wrench, Palette, Brain } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Languages & Frameworks',
    Icon: Code2,
    color: '#c95f3d',
    skills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'HTML / CSS', level: 'Advanced' },
    ],
  },
  {
    title: 'Backend & APIs',
    Icon: Server,
    color: '#8e5b35',
    skills: [
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'SQL / PostgreSQL', level: 'Intermediate' },
    ],
  },
  {
    title: 'Automation & AI',
    Icon: Bot,
    color: '#d98a55',
    skills: [
      { name: 'Playwright', level: 'Advanced' },
      { name: 'Selenium', level: 'Advanced' },
      { name: 'n8n Workflows', level: 'Intermediate' },
      { name: 'Prompt Engineering', level: 'Advanced' },
      { name: 'Local LLMs / Ollama', level: 'Intermediate' },
    ],
  },
  {
    title: 'Tools & DevOps',
    Icon: Wrench,
    color: '#a97244',
    skills: [
      { name: 'Git / GitHub', level: 'Advanced' },
      { name: 'VS Code', level: 'Advanced' },
      { name: 'Docker', level: 'Learning' },
      { name: 'Linux', level: 'Intermediate' },
    ],
  },
  {
    title: 'Creative Tools',
    Icon: Palette,
    color: '#b5764d',
    skills: [
      { name: 'Adobe Premiere Pro', level: 'Advanced' },
      { name: 'After Effects', level: 'Intermediate' },
      { name: 'Figma', level: 'Intermediate' },
    ],
  },
  {
    title: 'Soft Skills',
    Icon: Brain,
    color: '#c95f3d',
    skills: [
      { name: 'Problem Solving', level: 'Expert' },
      { name: 'Communication', level: 'Advanced' },
      { name: 'Adaptability', level: 'Expert' },
    ],
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Expert: '#8e5b35',
  Advanced: '#c95f3d',
  Intermediate: '#d98a55',
  Beginner: '#a97244',
  Learning: '#b5764d',
};

function SkillCategory({ cat, index }: { cat: typeof SKILL_CATEGORIES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { Icon } = cat;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
        borderRadius: 22, padding: '28px 24px',
        borderTop: `2px solid ${cat.color}`,
        backdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Icon size={20} color={cat.color} strokeWidth={2} />
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600, color: cat.color }}>{cat.title}</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cat.skills.map(skill => (
          <div key={skill.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{skill.name}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
              color: LEVEL_COLORS[skill.level] || '#c95f3d',
              background: `${LEVEL_COLORS[skill.level] || '#c95f3d'}0d`,
              border: `1px solid ${LEVEL_COLORS[skill.level] || '#c95f3d'}33`,
              borderRadius: 999, padding: '2px 10px',
            }}>{skill.level}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DevSkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="skills" ref={ref} style={{
      padding: 'clamp(58px, 8vw, 96px) 0',
      borderTop: '1px solid rgba(232,154,108,0.12)',
    }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 0.58fr) minmax(0, 1fr)', gap: 'clamp(24px, 6vw, 76px)', alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">Stack</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 4.2rem)',
              fontWeight: 700, lineHeight: 1, color: 'var(--text-primary)',
            }}>
              Tools Sanath reaches for
            </h2>
          </motion.div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 10,
          }}>
            {['Python', 'HTML', 'CSS', 'TypeScript', 'Automation', 'Reinforcement Learning', 'Arch Linux'].map(s => (
              <span key={s} style={{
                border: '1px solid var(--glass-border)', borderRadius: 999, padding: '10px 14px',
                background: 'linear-gradient(135deg, rgba(255,248,240,0.64), rgba(245,220,196,0.2)), rgba(255,255,255,0.5)',
                color: 'var(--text-secondary)', fontWeight: 850, fontSize: 14,
                backdropFilter: 'var(--glass-blur)',
                boxShadow: '0 10px 24px rgba(95,62,39,0.08), inset 0 1px 0 rgba(255,255,255,0.72)',
              }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16, marginTop: 64,
        }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategory key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
