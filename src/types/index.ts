export enum EnglishLevel {
  A1_A2 = 'A1-A2',
  B1_B2 = 'B1-B2',
  C1 = 'C1'
}

export enum StoryLength {
  SHORT = 'Short',
  MEDIUM = 'Medium',
  LONG = 'Long'
}

export enum StoryCategory {
  DAILY_LIFE = 'Daily Life',
  TRAVEL = 'Travel',
  NEWS = 'News',
  BOOK = 'Book',
  BUSINESS = 'Business',
  ACADEMIC = 'Academic',
  MOVIE_SERIES = 'Movie/Series',
  PODCAST = 'Podcast',
  CUSTOM = 'Custom'
}

export interface ParallelSentence {
  english: string;
  turkish: string;
}

export interface Keyword {
  word: string;
  definition: string;
  turkish: string;
  category?: string;
}

export interface MindMapCategory {
  title: string;
  keywords: string[];
}

export interface TenseVariant {
  now: ParallelSentence;
  past: ParallelSentence;
  future: ParallelSentence;
}

export interface ParaphraseGroup {
  original: string;
  variants: string[];
  highlights: string[];
}

export interface WordAnalysis {
  word: string;
  upperMeaning: string;
  breakdown: string;
  definition: string;
  genericExample: string;
  personalPrompt: string;
  turkishTranslations: {
    upperMeaning: string;
    breakdown: string;
    definition: string;
    genericExample: string;
    personalPrompt: string;
  };
}

export interface CoachFeedback {
  strengths: string;
  areasToImprove: string;
  errors: { rule: string; example: string }[];
  mistakes: string[];
  nextStep: string;
}

export interface AppState {
  level: EnglishLevel;
  length: StoryLength;
  category: StoryCategory;
  customTopic: string;
  story: {
    title: ParallelSentence;
    content: ParallelSentence[];
    highFrequencyWords: ParallelSentence[];
    patterns: ParallelSentence[];
    keySentences: ParallelSentence[];
  } | null;
  analysis: {
    keywords: Keyword[];
    mindMap: MindMapCategory[];
    tenses: TenseVariant;
    paraphrases: ParaphraseGroup[];
    orderChanges: string[][];
  } | null;
  isLoading: boolean;
  error: string | null;
}
