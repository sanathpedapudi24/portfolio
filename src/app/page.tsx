'use client';

import { useEffect, useState } from 'react';
import { useIdentity } from '@/context/IdentityContext';
import CustomCursor from '@/components/shared/CustomCursor';
import LoadingScreen from '@/components/shared/LoadingScreen';
import Navigation from '@/components/shared/Navigation';
import CommandPalette from '@/components/shared/CommandPalette';
import EasterEggs from '@/components/shared/EasterEggs';

// Developer Identity
import DevHero from '@/components/developer/HeroSection';
import DevAbout from '@/components/developer/AboutSection';
import DevProjects from '@/components/developer/ProjectsSection';
import DevSkills from '@/components/developer/SkillsSection';
import DevExperience from '@/components/developer/ExperienceSection';
import DevGitHub from '@/components/developer/GitHubSection';
import DevTerminal from '@/components/developer/TerminalSection';
import DevContact from '@/components/developer/ContactSection';

// Editor Identity
import EditorHero from '@/components/editor/HeroSection';
import EditorShowreel from '@/components/editor/ShowreelSection';
import EditorServices from '@/components/editor/ServicesSection';
import EditorPortfolio from '@/components/editor/PortfolioGrid';
import EditorTestimonials from '@/components/editor/TestimonialsSection';
import EditorPricing from '@/components/editor/PricingSection';
import EditorWorkflow from '@/components/editor/WorkflowSection';
import EditorBooking from '@/components/editor/BookingSection';

export default function Home() {
  const { identity, isTransitioning } = useIdentity();
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Apply identity to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-identity', identity);
  }, [identity]);

  // Command palette shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <EasterEggs />

      {/* Identity transition overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9990,
          pointerEvents: isTransitioning ? 'all' : 'none',
          opacity: isTransitioning ? 1 : 0,
          background: identity === 'developer'
            ? 'radial-gradient(ellipse at center, #c95f3d 0%, #1a1410 70%)'
            : 'radial-gradient(ellipse at center, #d4af37 0%, #000 70%)',
          transition: 'opacity 0.3s ease',
        }}
      />

      {!loading && (
        <main style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <Navigation onCommandPalette={() => setCmdOpen(true)} />

          {identity === 'developer' ? (
            <>
              <DevHero />
              <DevAbout />
              <DevProjects />
              <DevSkills />
              <DevExperience />
              <DevGitHub />
              <DevTerminal />
              <DevContact />
            </>
          ) : (
            <>
              <EditorHero />
              <EditorShowreel />
              <EditorServices />
              <EditorPortfolio />
              <EditorTestimonials />
              <EditorPricing />
              <EditorWorkflow />
              <EditorBooking />
            </>
          )}

          {/* Footer */}
          <footer style={{
            padding: '28px 80px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
              © 2025 <span style={{ color: 'var(--accent-cyan)' }}>Sanath Pedapudi</span>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              {identity === 'developer'
                ? 'Built with Next.js · TypeScript · Framer Motion'
                : 'Crafted with Passion · Premiere Pro · After Effects'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              Press <kbd style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: 'var(--accent-cyan)' }}>Ctrl+K</kbd> to search
            </span>
          </footer>
        </main>
      )}

      {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
    </>
  );
}
