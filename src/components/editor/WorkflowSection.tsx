'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  { num: '01', title: 'Discovery Call', desc: 'We discuss your vision, project requirements, timeline, and budget. Understanding your story is where great editing begins.', icon: '💬' },
  { num: '02', title: 'Script & Brief', desc: 'For narrative content, we create a script or detailed brief. For events, I review raw footage and plan the structure.', icon: '📝' },
  { num: '03', title: 'Editing & Assembly', desc: 'I cut, grade, and assemble your video with music, transitions, and graphics — bringing your vision to life frame by frame.', icon: '✂️' },
  { num: '04', title: 'Review & Revisions', desc: 'You review the first cut and share feedback. We refine until you\'re delighted — as many revisions as your plan includes.', icon: '👁️' },
  { num: '05', title: 'Final Delivery', desc: 'Your finished video is delivered in high resolution (4K/1080p) with all requested formats for social media, web, and broadcast.', icon: '🎬' },
];

function WorkflowStepCard({ step, index, total }: { step: typeof STEPS[number]; index: number; total: number }) {
  const stepRef = useRef(null);
  const stepInView = useInView(stepRef, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: stepInView ? 1 : 0, x: stepInView ? 0 : (isLeft ? -40 : 40) }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        marginBottom: index < total - 1 ? 48 : 0,
        position: 'relative',
      }}
    >
      {/* Center node */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 24,
        transform: 'translate(-50%, -50%)',
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#d4af37',
        border: '4px solid #080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        zIndex: 1,
        boxShadow: '0 0 20px rgba(212,175,55,0.3)',
      }}>
        {step.icon}
      </div>

      {/* Content card */}
      <div style={{
        width: 'calc(50% - 40px)',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(212,175,55,0.12)',
        borderRadius: 16,
        padding: '24px 28px',
        [isLeft ? 'marginRight' : 'marginLeft']: 0,
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: '#d4af37',
          letterSpacing: '0.2em',
          marginBottom: 8,
        }}>{step.num}</div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 20,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: 10,
        }}>{step.title}</h3>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13.5,
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.7,
        }}>{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function EditorWorkflowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="workflow" ref={ref} style={{ padding: '120px 0' }}>
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
            Process
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
          }}>
            How We Work Together
          </h2>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3) 20%, rgba(212,175,55,0.3) 80%, transparent)',
          }} />

          {STEPS.map((step, i) => (
            <WorkflowStepCard key={step.num} step={step} index={i} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
