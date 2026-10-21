'use client';

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

type CompletedSurvey = { slug: string; completedAt: string };
const VotingSession = createContext<{ completed: Record<string,string>; recentCompletions: CompletedSurvey[]; finish: (category: string, slug: string) => boolean } | null>(null);

// One in-memory demo participant. Reload resets this state; no authentication/API/storage.
export function VotingSessionProvider({children}: {children: ReactNode}) {
  const [completed,setCompleted] = useState<Record<string,string>>({});
  const [recentCompletions,setRecentCompletions] = useState<CompletedSurvey[]>([]);
  const recorded = useRef<Record<string,string>>({});
  function finish(category: string, slug: string) {
    if (recorded.current[category]) return false;
    recorded.current = {...recorded.current,[category]:slug};
    setCompleted(recorded.current);
    setRecentCompletions(previous => [{slug,completedAt:new Date().toISOString()},...previous]);
    return true;
  }
  return <VotingSession.Provider value={{completed,recentCompletions,finish}}>{children}</VotingSession.Provider>;
}

export function useVotingSession() {
  const session = useContext(VotingSession);
  if (!session) throw new Error('VotingSessionProvider is required');
  return session;
}
