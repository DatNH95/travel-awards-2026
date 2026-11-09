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
  const recorded = useRef<Record<string,string[]>>({});
  function finish(category: string, slug: string | string[], response?: CategoryResponse) {
    const slugs = [...new Set(Array.isArray(slug)?slug:[slug])];
    const existing=recorded.current[category]??[];
    if (!slugs.length || slugs.some(id=>existing.includes(id))) return false;
    const merged=[...existing,...slugs];
    recorded.current={...recorded.current,[category]:merged};
    setCompleted(previous=>({...previous,[category]:merged[0]}));
    setCompletedProfiles(recorded.current);
    if(response) setHistory(previous=>{
      const before=previous[category];
      return {...previous,[category]:{...response,selected:[...new Set([...(before?.selected??[]),...response.selected])],ratings:{...before?.ratings,...response.ratings},noneUsed:!before?.selected.length&&response.noneUsed,completed:true}};
    });
    const completedAt=new Date().toISOString();
    setRecentCompletions(previous => [...slugs.map(slug=>({slug,completedAt})),...previous]);
    return true;
  }  return <VotingSession.Provider value={{history,completed,completedProfiles,recentCompletions,finish}}>{children}</VotingSession.Provider>;
}

export function useVotingSession() {
  const session = useContext(VotingSession);
  if (!session) throw new Error('VotingSessionProvider is required');
  return session;
}
