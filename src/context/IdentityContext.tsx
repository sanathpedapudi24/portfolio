'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type Identity = 'developer' | 'editor';

interface IdentityContextValue {
  identity: Identity;
  setIdentity: (id: Identity) => void;
  isTransitioning: boolean;
  toggleIdentity: () => void;
}

const IdentityContext = createContext<IdentityContextValue>({
  identity: 'developer',
  setIdentity: () => {},
  isTransitioning: false,
  toggleIdentity: () => {},
});

export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const [identity, setIdentityState] = useState<Identity>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sanath-identity') as Identity;
        if (stored === 'developer' || stored === 'editor') {
          return stored;
        }
      } catch {}
    }
    return 'developer';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setIdentity = useCallback((id: Identity) => {
    if (id === identity) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIdentityState(id);
      try { localStorage.setItem('sanath-identity', id); } catch {}
      setTimeout(() => setIsTransitioning(false), 600);
    }, 300);
  }, [identity]);

  const toggleIdentity = useCallback(() => {
    setIdentity(identity === 'developer' ? 'editor' : 'developer');
  }, [identity, setIdentity]);

  return (
    <IdentityContext.Provider value={{ identity, setIdentity, isTransitioning, toggleIdentity }}>
      {children}
    </IdentityContext.Provider>
  );
}

export const useIdentity = () => useContext(IdentityContext);
