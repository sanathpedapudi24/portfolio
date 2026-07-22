'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, GitFork } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572a5',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C#': '#512bd4',
  'Jupyter Notebook': '#da5b0b',
  default: '#c95f3d',
};

// Categorize repos by language/type for filter buttons
function getCategory(repo: GitHubRepo): string[] {
  const cats: string[] = [];
  const lang = repo.language?.toLowerCase() || '';
  const name = repo.name.toLowerCase();

  if (lang === 'python' || lang === 'jupyter notebook') cats.push('Python');
  if (['html', 'css', 'javascript', 'typescript'].includes(lang) || name.includes('web')) cats.push('Web');
  if (lang === 'css' && name.includes('dotfiles')) cats.push('Systems');
  if (name.includes('dotfiles') || name.includes('config') || name.includes('linux')) cats.push('Systems');

  if (cats.length === 0) cats.push('Web'); // default fallback
  return cats;
}

const FALLBACK_REPOS: GitHubRepo[] = [
  { id: 1, name: 'swingging', description: 'Recent Python project — fast-moving automation or experimentation space.', language: 'Python', html_url: 'https://github.com/sanathpedapudi24/swingging', updated_at: '2026-05-01', stargazers_count: 0, forks_count: 0, topics: [] },
  { id: 2, name: 'AutoCert', description: 'A custom application for completing certifications, showing a practical automation instinct.', language: 'Python', html_url: 'https://github.com/sanathpedapudi24/AutoCert', updated_at: '2026-03-01', stargazers_count: 0, forks_count: 0, topics: [] },
  { id: 3, name: 'carousel_tool', description: 'A Python utility for content, media, or UI automation workflows.', language: 'Python', html_url: 'https://github.com/sanathpedapudi24/carousel_tool', updated_at: '2026-05-01', stargazers_count: 0, forks_count: 0, topics: [] },
  { id: 4, name: 'rlpingpong', description: 'Browser-based reinforcement learning and game experiment with interactive UI.', language: 'HTML', html_url: 'https://github.com/sanathpedapudi24/rlpingpong', updated_at: '2026-04-01', stargazers_count: 0, forks_count: 0, topics: [] },
  { id: 5, name: 'web3', description: 'TypeScript project exploring Web3 concepts and modern JavaScript patterns.', language: 'TypeScript', html_url: 'https://github.com/sanathpedapudi24/web3', updated_at: '2026-03-01', stargazers_count: 0, forks_count: 0, topics: [] },
  { id: 6, name: 'dotfiles', description: 'Arch Linux setup — environment ownership, Linux fluency, and developer ergonomics.', language: 'CSS', html_url: 'https://github.com/sanathpedapudi24/dotfiles', updated_at: '2026-03-01', stargazers_count: 0, forks_count: 0, topics: [] },
];

const FILTERS = ['All', 'Python', 'Web', 'Systems'] as const;

function ProjectCard({ repo, index, featured }: { repo: GitHubRepo; index: number; featured: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const langColor = LANG_COLORS[repo.language || ''] || LANG_COLORS.default;

  const date = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(repo.updated_at));

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: 260,
        border: '1px solid var(--glass-border)',
        borderRadius: 22,
        padding: 22,
        background: featured
          ? 'linear-gradient(135deg, rgba(255,248,240,0.78), rgba(245,220,196,0.24), rgba(232,154,108,0.08)), var(--glass-bg-strong)'
          : 'linear-gradient(145deg, rgba(255,248,240,0.66), rgba(245,220,196,0.14) 52%, rgba(255,255,255,0.36)), var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        boxShadow: 'var(--glass-shadow)',
        transition: 'transform 180ms ease, border-color 180ms ease',
        cursor: 'default',
      }}
      whileHover={{
        y: -4,
        borderColor: 'rgba(255,255,255,0.56)',
      }}
    >
      {/* Meta: language + date */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 18,
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.8rem, 0.76rem + 0.18vw, 0.9rem)',
        fontWeight: 800,
        color: 'var(--text-muted)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: langColor, flexShrink: 0 }} />
          {repo.language || 'Unknown'}
        </span>
        <span>{date}</span>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.12rem, 1rem + 0.6vw, 1.35rem)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.15,
        marginBottom: 12,
      }}>{repo.name}</h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        lineHeight: 1.75,
        color: 'var(--text-secondary)',
        flex: 1,
      }}>{repo.description || 'No description available.'}</p>

      {/* Stats + Link */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          {repo.stargazers_count > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} /> {repo.stargazers_count}</span>}
          {repo.forks_count > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><GitFork size={12} /> {repo.forks_count}</span>}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 900,
            color: 'var(--accent-cyan)',
            textDecoration: 'none',
          }}
        >
          Open repo →
        </a>
      </div>
    </motion.article>
  );
}

export default function DevProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/sanathpedapudi24/repos?sort=updated&per_page=12');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data);
          }
        }
      } catch {
        // Use fallback data
      }
    };
    fetchRepos();
  }, []);

  const filteredRepos = activeFilter === 'All'
    ? repos
    : repos.filter(repo => getCategory(repo).includes(activeFilter));

  return (
    <section id="projects" ref={ref} style={{ padding: '120px 0' }}>
      <div className="container-custom">
        {/* Header with filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 24,
            alignItems: 'flex-end',
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div className="section-label">02 / Projects</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: 0,
            }}>
              Projects from GitHub
            </h2>
          </div>

          {/* Filter buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  border: '1px solid transparent',
                  borderRadius: 999,
                  padding: '9px 14px',
                  color: activeFilter === filter ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.88rem, 0.84rem + 0.18vw, 1rem)',
                  fontWeight: 700,
                  background: activeFilter === filter
                    ? 'linear-gradient(135deg, rgba(255,248,240,0.72), rgba(245,220,196,0.3)), rgba(255,255,255,0.5)'
                    : 'transparent',
                  borderColor: activeFilter === filter ? 'var(--glass-border)' : 'transparent',
                  boxShadow: activeFilter === filter ? 'inset 0 1px 0 rgba(255,255,255,0.62)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 16,
        }}>
          {filteredRepos.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} featured={i === 0} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: 64 }}
        >
          <a
            href="https://github.com/sanathpedapudi24"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dev-primary"
            style={{ display: 'inline-flex' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All on GitHub →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #projects .container-custom > div:nth-child(2) {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 480px) {
          #projects .container-custom > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
