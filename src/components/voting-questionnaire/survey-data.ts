export type SurveyProfile = Readonly<{ id: string; name: string; location: string; image?: string }>;
export type CategoryResponse = { selected: string[]; noneUsed: boolean; ratings: Record<string, number>; completed: boolean };

export const ratingLevels = [
  {
    "value": 1,
    "label": "Rất không hài lòng"
  },
  {
    "value": 2,
    "label": "Không hài lòng"
  },
  {
    "value": 3,
    "label": "Bình thường"
  },
  {
    "value": 4,
    "label": "Hài lòng"
  },
  {
    "value": 5,
    "label": "Rất hài lòng"
  }
] as const;

export function emptyResponse(): CategoryResponse {
  return { selected: [], noneUsed: false, ratings: {}, completed: false };
}
