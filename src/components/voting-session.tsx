'use client';

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

import type { CategoryResponse } from './voting-questionnaire/survey-data';

type CompletedSurvey = { slug: string; completedAt: string };
const VotingSession = createContext<{ history: Record<string,CategoryResponse>; completed: Record<string,string>; completedProfiles: Record<string,string[]>; recentCompletions: CompletedSurvey[]; finish: (category: string, slug: string | string[], response?: CategoryResponse) => boolean } | null>(null);

// One in-memory demo participant. Reload resets this state; no authentication/API/storage.
export function VotingSessionProvider({children}: {children: ReactNode}) {
  const [completed,setCompleted] = useState<Record<string,string>>({});
  const [completedProfiles,setCompletedProfiles] = useState<Record<string,string[]>>({});
  const [recentCompletions,setRecentCompletions] = useState<CompletedSurvey[]>([]);
  const [history,setHistory] = useState<Record<string,CategoryResponse>>({});
  const recorded = useRef<Record<string,string>>({});
  function finish(category: string, slug: string | string[], response?: CategoryResponse) {
    const slugs = [...new Set(Array.isArray(slug)?slug:[slug])];
    if (!slugs.length || recorded.current[category]) return false;
    recorded.current = {...recorded.current,[category]:slugs[0]};
    setCompleted(recorded.current);
    if(response) setHistory(previous=>({...previous,[category]:{...response,selected:[...response.selected],ratings:{...response.ratings},completed:true}}));
    setCompletedProfiles(previous=>({...previous,[category]:slugs}));
    const completedAt=new Date().toISOString();
    setRecentCompletions(previous => [...slugs.map(slug=>({slug,completedAt})),...previous]);
    return true;
  }
  return <VotingSession.Provider value={{history,completed,completedProfiles,recentCompletions,finish}}>{children}</VotingSession.Provider>;
}

export function useVotingSession() {
  const session = useContext(VotingSession);
  if (!session) throw new Error('VotingSessionProvider is required');
  return session;
}
