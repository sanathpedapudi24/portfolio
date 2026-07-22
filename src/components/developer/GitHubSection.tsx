'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderOpen, Users, Eye, Star, GitFork, ArrowUpRight } from 'lucide-react';

function GithubIcon({ size = 14, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

const LANG_COLORS: Record<string, string> = {
  'C#': '#512bd4', TypeScript: '#3178c6', JavaScript: '#f7df1e',
  Python: '#3572a5', HTML: '#e34c26', CSS: '#563d7c',
  'Jupyter Notebook': '#da5b0b', default: '#c95f3d',
};

const FALLBACK_STATS = { public_repos: 15, followers: 20, following: 30 };
const FALLBACK_REPOS: GitHubRepo[] = [
  { id: 1, name: 'investment-planner', description: 'Full-stack investment management dashboard', stargazers_count: 3, forks_count: 1, language: 'TypeScript', html_url: 'https://github.com/sanathpedapudi24' },
  { id: 2, name: 'playwright-automation', description: 'WhatsApp and web automation toolkit using Playwright', stargazers_count: 5, forks_count: 2, language: 'JavaScript', html_url: 'https://github.com/sanathpedapudi24' },
  { id: 3, name: 'local-llm-lab', description: 'Local LLM experiments with Ollama and Unsloth', stargazers_count: 8, forks_count: 3, language: 'Python', html_url: 'https://github.com/sanathpedapudi24' },
  { id: 4, name: 'portfolio', description: 'Dual-identity portfolio — Developer + Video Editor', stargazers_count: 12, forks_count: 4, language: 'TypeScript', html_url: 'https://github.com/sanathpedapudi24' },
];

export default function DevGitHubSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_STATS);
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/sanathpedapudi24'),
          fetch('https://api.github.com/users/sanathpedapudi24/repos?sort=updated&per_page=4'),
        ]);
        if (userRes.ok) setStats(await userRes.json());
        if (reposRes.ok) {
          const data = await reposRes.json();
          if (Array.isArray(data) && data.length > 0) setRepos(data.slice(0, 4));
        }
      } catch {}
    };
    fetchGitHub();
  }, []);

  const STAT_ITEMS = [
    { label: 'Repositories', value: stats.public_repos, Icon: FolderOpen },
    { label: 'Followers', value: stats.followers, Icon: Users },
    { label: 'Following', value: stats.following, Icon: Users },
    { label: 'Profile Views', value: '500+', Icon: Eye },
  ];

  return (
    <section id="github" ref={ref} style={{
      padding: 'clamp(58px, 8vw, 96px) 0',
      borderTop: '1px solid rgba(232,154,108,0.12)',
    }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">Open Source</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 4.2rem)',
            fontWeight: 700, lineHeight: 1, color: 'var(--text-primary)',
          }}>
            GitHub activity
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 48 }}
        >
          {STAT_ITEMS.map(({ label, value, Icon }) => (
            <div key={label} style={{
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: 18, padding: '20px 24px', textAlign: 'center',
              backdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)',
            }}>
              <Icon size={20} color="var(--text-muted)" strokeWidth={1.5} style={{ marginBottom: 8 }} />
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
                color: 'var(--accent-cyan)', lineHeight: 1,
              }}>{value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800,
                color: 'var(--text-muted)', marginTop: 6, textTransform: 'uppercase',
              }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Repos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id || repo.name || i} href={repo.html_url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              style={{
                display: 'block', textDecoration: 'none',
                background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                borderRadius: 22, padding: '24px',
                backdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.56)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <GithubIcon size={14} color="var(--text-muted)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-cyan)', fontWeight: 600 }}>{repo.name}</span>
                </div>
                <ArrowUpRight size={14} color="var(--text-muted)" />
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16, minHeight: 40 }}>
                {repo.description || 'No description'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {repo.language && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: LANG_COLORS[repo.language] || LANG_COLORS.default, flexShrink: 0 }} />
                    {repo.language}
                  </span>
                )}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={11} /> {repo.stargazers_count}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <GitFork size={11} /> {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <a href="https://github.com/sanathpedapudi24" target="_blank" rel="noopener noreferrer"
            className="btn-dev-primary" style={{ display: 'inline-flex' }}>
            <GithubIcon size={16} color="currentColor" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
