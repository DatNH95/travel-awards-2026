export type SurveyStep = Readonly<{
  id: string;
  title: string;
  description?: string;
}>;

export type SurveyConfig = Readonly<{
  title: string;
  description: string;
  steps: readonly SurveyStep[];
}>;
