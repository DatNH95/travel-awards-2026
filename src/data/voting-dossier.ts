import 'server-only';
import dossiers from './voting-public-dossiers.json';
import type { VotingProfile } from './voting';
export type DossierEntry = { label: string; value: string };
type Dossier = { intro:string; highlights:{label:string;value:string}[]; common:DossierEntry[]; destination:DossierEntry|null; nomination:DossierEntry[]; professional:DossierEntry[]; narratives:DossierEntry[] };
export function getVotingDossier(profile: VotingProfile): Dossier {
  return (dossiers as Record<string,Dossier>)[profile.code];
}
