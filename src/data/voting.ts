import records from './voting-profiles.json';
import { demoProfileGalleries } from './voting-demo';
// Public projection of the supplied export; survey totals are not provided.
// Requested review treatment: demo images only; the imported public content stays intact.
export const votingProfiles = records.map((record,index) => {
  const images = demoProfileGalleries[index % demoProfileGalleries.length];
  const offset = index % images.length;
  const gallery = [...images.slice(offset), ...images.slice(0,offset)].map(image => ({
    ...image, caption: `Ảnh demo minh họa. ${image.caption}`,
  }));
  return {...record, image:gallery[0], gallery, surveyCount:null as number | null};
});
export type VotingProfile = (typeof votingProfiles)[number];
