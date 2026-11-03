'use client';

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

type CompletedSurvey = { slug: string; completedAt: string };
const VotingSession = createContext<{ completed: Record<string,string>; completedProfiles: Record<string,string[]>; recentCompletions: CompletedSurvey[]; finish: (category: string, slug: string | string[]) => boolean } | null>(null);

// One in-memory demo participant. Reload resets this state; no authentication/API/storage.
export function VotingSessionProvider({children}: {children: ReactNode}) {
  const [completed,setCompleted] = useState<Record<string,string>>({});
  const [completedProfiles,setCompletedProfiles] = useState<Record<string,string[]>>({});
  const [recentCompletions,setRecentCompletions] = useState<CompletedSurvey[]>([]);
  const recorded = useRef<Record<string,string>>({});
  function finish(category: string, slug: string | string[]) {
    const slugs = [...new Set(Array.isArray(slug)?slug:[slug])];
    if (!slugs.length || recorded.current[category]) return false;
    recorded.current = {...recorded.current,[category]:slugs[0]};
    setCompleted(recorded.current);
    setCompletedProfiles(previous=>({...previous,[category]:slugs}));
    const completedAt=new Date().toISOString();
    setRecentCompletions(previous => [...slugs.map(slug=>({slug,completedAt})),...previous]);
    return true;
  }
  return <VotingSession.Provider value={{completed,completedProfiles,recentCompletions,finish}}>{children}</VotingSession.Provider>;
}

export function useVotingSession() {
  const session = useContext(VotingSession);
  if (!session) throw new Error('VotingSessionProvider is required');
  return session;
}
