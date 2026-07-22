'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function EditorBookingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  const SERVICES = ['Wedding Film', 'Wedding Invitation', 'Instagram Reels', 'YouTube Editing', 'Commercial Video', 'Motion Graphics', 'Color Grading', 'Corporate Video'];

  return (
    <section id="booking" ref={ref} style={{ padding: '120px 0', background: '#0a0a0a' }}>
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
            Book a Session
            <span style={{ width: 24, height: 1, background: '#d4af37' }} />
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            marginBottom: 16,
          }}>
            Let&apos;s Create Together
          </h2>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 20,
            color: 'rgba(212,175,55,0.7)',
          }}>
            Every story deserves to be told beautifully.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, maxWidth: 1000, margin: '0 auto' }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 40px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#d4af37', marginBottom: 12 }}>Inquiry Received!</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  I&apos;ll reach out within 24 hours to discuss your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  { id: 'phone', label: 'WhatsApp / Phone', type: 'tel', placeholder: '+91 98765 43210' },
                ].map(field => (
                  <div key={field.id}>
                    <label style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10,
                      color: 'rgba(212,175,55,0.6)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: 8,
                    }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        borderRadius: 8,
                        padding: '12px 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.85)',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        cursor: 'text',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(212,175,55,0.15)')}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10,
                    color: 'rgba(212,175,55,0.6)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 8,
                  }}>Service Needed</label>
                  <select
                    value={form.service}
                    onChange={e => setForm(prev => ({ ...prev, service: e.target.value }))}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(212,175,55,0.15)',
                      borderRadius: 8,
                      padding: '12px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      color: form.service ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                      outline: 'none',
                      cursor: 'none',
                    }}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10,
                    color: 'rgba(212,175,55,0.6)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 8,
                  }}>Project Details</label>
                  <textarea
                    placeholder="Tell me about your project, event date, any references..."
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(212,175,55,0.15)',
                      borderRadius: 8,
                      padding: '12px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.85)',
                      outline: 'none',
                      resize: 'vertical',
                      cursor: 'text',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(212,175,55,0.15)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: '14px 32px',
                    background: '#d4af37',
                    color: '#000',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: '0.08em',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'none',
                    opacity: sending ? 0.7 : 1,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#f5e6a3'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#d4af37'; }}
                >
                  {sending ? 'Sending...' : 'Send Inquiry →'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 22,
                fontWeight: 600,
                color: '#d4af37',
                marginBottom: 8,
              }}>Prefer to talk directly?</h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.7,
              }}>
                Reach out via WhatsApp for a quick conversation about your project.
              </p>
            </div>

            {[
              {
                label: 'WhatsApp',
                value: 'Chat Now',
                href: 'https://wa.me/919876543210',
                icon: '📱',
                color: '#25d366',
              },
              {
                label: 'Instagram',
                value: '@sanathpedapudi',
                href: 'https://instagram.com/sanathpedapudi',
                icon: '📸',
                color: '#e1306c',
              },
              {
                label: 'Email',
                value: 'sanathpedapudi24@gmail.com',
                href: 'mailto:sanathpedapudi24@gmail.com',
                icon: '✉️',
                color: '#d4af37',
              },
            ].map(contact => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 24px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${contact.color}44`;
                  e.currentTarget.style.background = `${contact.color}08`;
                  e.currentTarget.style.transform = 'translateX(8px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = '';
                }}
              >
                <span style={{ fontSize: 24 }}>{contact.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{contact.label}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: contact.color, fontWeight: 500 }}>{contact.value}</div>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>→</span>
              </a>
            ))}

            {/* Availability */}
            <div style={{
              padding: '18px 24px',
              background: 'rgba(212,175,55,0.04)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25d366', animation: 'pulse-glow 2s ease infinite' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#25d366', letterSpacing: '0.1em' }}>
                  Currently Accepting Projects
                </span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Book at least 2 weeks in advance for weddings and events. Quick turnaround available for reels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
