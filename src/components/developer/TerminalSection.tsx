'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Circle, MapPin, Clock, Zap, Rocket, Coffee } from 'lucide-react';

const TERMINAL_MESSAGES = [
  { cmd: 'whoami', output: 'Sanath Pedapudi — Software Developer & Automation Engineer' },
  { cmd: 'cat skills.txt', output: '.NET | Angular | Python | Playwright | AI | SQL | Docker' },
  { cmd: 'ls projects/', output: 'investment-planner/  invoicefi/  ble-tracker/  whatsapp-bot/  llm-lab/' },
  { cmd: 'cat status.json', output: JSON.stringify({ available: true, location: 'India', openTo: ['Full-time', 'Freelance', 'Remote'] }, null, 2) },
  { cmd: 'git log --oneline -5', output: 'a3f2c1d feat: add AI automation pipeline\n9b8d4e2 fix: optimize SQL query performance\n2c7a1f3 feat: WhatsApp bot v2\n5e9b0a8 chore: update dependencies\n1d4c3b7 feat: portfolio dual identity' },
  { cmd: 'fortune', output: '"The best way to predict the future is to implement it." — Alan Kay' },
  { cmd: 'uptime', output: 'up 2 years, learning continuously, 99.9% passion uptime' },
];

export default function DevTerminalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayed, setDisplayed] = useState<{ cmd: string; output: string }[]>([]);
  const [typing, setTyping] = useState('');
  const [phase, setPhase] = useState<'typing' | 'output' | 'pause'>('pause');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView) return;

    const current = TERMINAL_MESSAGES[msgIdx % TERMINAL_MESSAGES.length];

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('typing'), 800);
      return () => clearTimeout(t);
    }

    if (phase === 'typing') {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= current.cmd.length) {
          setTyping(current.cmd.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setPhase('output');
        }
      }, 60);
      return () => clearInterval(interval);
    }

    if (phase === 'output') {
      const t1 = setTimeout(() => {
        setDisplayed(prev => [...prev.slice(-4), { cmd: current.cmd, output: current.output }]);
        setTyping('');
      }, 0);
      const t2 = setTimeout(() => {
        setMsgIdx(i => i + 1);
        setPhase('pause');
      }, 3000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [inView, phase, msgIdx]);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayed, typing]);

  return (
    <section id="terminal" ref={ref} style={{ padding: '120px 0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">06 / Dashboard</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}>
            Developer dashboard.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'start' }}>
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: 'linear-gradient(145deg, rgba(37,31,26,0.92), rgba(70,48,35,0.85))',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: 'var(--glass-shadow)',
            }}
          >
            {/* Terminal header */}
            <div style={{
              padding: '14px 20px',
              background: 'rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#c95f3d' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#d98a55' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#8e5b35' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,248,240,0.4)' }}>
                sanath@portfolio:~
              </span>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              style={{
                padding: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                height: 420,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {displayed.map((msg, i) => (
                <div key={i}>
                  <div>
                    <span style={{ color: '#d98a55' }}>sanath</span>
                    <span style={{ color: 'rgba(255,248,240,0.4)' }}>@portfolio</span>
                    <span style={{ color: 'rgba(255,248,240,0.4)' }}>:~$ </span>
                    <span style={{ color: '#fff7ec' }}>{msg.cmd}</span>
                  </div>
                  <pre style={{
                    color: 'rgba(255,248,240,0.65)',
                    marginTop: 6,
                    whiteSpace: 'pre-wrap',
                    fontSize: 12,
                    lineHeight: 1.6,
                  }}>{msg.output}</pre>
                </div>
              ))}

              {/* Current typing line */}
              <div>
                <span style={{ color: '#d98a55' }}>sanath</span>
                <span style={{ color: 'rgba(255,248,240,0.4)' }}>@portfolio</span>
                <span style={{ color: 'rgba(255,248,240,0.4)' }}>:~$ </span>
                <span style={{ color: '#fff7ec' }}>{typing}</span>
                <span style={{
                  display: 'inline-block',
                  width: 8, height: 14,
                  background: '#c95f3d',
                  animation: 'terminal-cursor 1s ease infinite',
                  marginLeft: 1,
                  verticalAlign: 'text-bottom',
                }} />
              </div>
            </div>
          </motion.div>

          {/* Right: Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {[
              { label: 'Current Status', value: 'Open to Work', color: '#8e5b35', Icon: Circle },
              { label: 'Location', value: 'India', color: '#c95f3d', Icon: MapPin },
              { label: 'Experience', value: '2+ Years', color: '#d98a55', Icon: Clock },
              { label: 'Specialization', value: '.NET + Automation', color: '#c95f3d', Icon: Zap },
              { label: 'Side Projects', value: '10+ Active', color: '#a97244', Icon: Rocket },
              { label: 'Coffee/Day', value: '3-4 cups', color: '#8b5e3c', Icon: Coffee },
            ].map(item => (
              <div
                key={item.label}
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 18,
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backdropFilter: 'var(--glass-blur)',
                  boxShadow: 'var(--glass-shadow)',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.56)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <item.Icon size={14} color={item.color} strokeWidth={2} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 800 }}>{item.label}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 600, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
