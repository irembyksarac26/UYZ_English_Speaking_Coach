import { AppState, EnglishLevel, StoryCategory, StoryLength } from '../types';

export const MOCK_STORY = {
  title: { english: "A Peaceful Morning in the Village", turkish: "Köyde Huzurlu Bir Sabah" },
  content: [
    { english: "The old man slowly opened the blue shutters of his house.", turkish: "Yaşlı adam evinin mavi panjurlarını yavaşça açtı." },
    { english: "The smell of fresh bread was coming from the bakery across the street.", turkish: "Caddenin karşısındaki fırından taze ekmek kokusu geliyordu." },
    { english: "It was a cold but sunny morning in the village.", turkish: "Köyde soğuk ama güneşli bir sabahtı." },
    { english: "He greeted his neighbor with a warm smile.", turkish: "Komşusunu sıcak bir gülümsemeyle selamladı." }
  ],
  highFrequencyWords: [
    { english: "Shutters", turkish: "Panjurlar" },
    { english: "Bakery", turkish: "Fırın" },
    { english: "Neighbor", turkish: "Komşu" }
  ],
  patterns: [
    { english: "It was a ... morning", turkish: "... bir sabahtı" },
    { english: "Coming from ...", turkish: "...'dan geliyordu" }
  ],
  keySentences: [
    { english: "The smell of fresh bread was coming from the bakery.", turkish: "Fırından taze ekmek kokusu geliyordu." }
  ]
};

export const MOCK_ANALYSIS = {
  keywords: [
    { word: "Shutters", definition: "A pair of wooden or metal covers on the outside of a window.", turkish: "Panjurlar", category: "Environment" },
    { word: "Bakery", definition: "A place where bread and cakes are made and sold.", turkish: "Fırın", category: "Environment" },
    { word: "Neighbor", definition: "A person living near or next door.", turkish: "Komşu", category: "Family" },
    { word: "Greeted", definition: "To say hello to someone.", turkish: "Selamladı", category: "Action" },
    { word: "Warm", definition: "Having a pleasant degree of heat.", turkish: "Sıcak", category: "Emotion" }
  ],
  mindMap: [
    { title: "Environment", keywords: ["Shutters", "Bakery"] },
    { title: "Family", keywords: ["Neighbor"] },
    { title: "Action", keywords: ["Greeted"] }
  ],
  tenses: {
    now: { english: "He is opening the shutters right now.", turkish: "Şu an panjurları açıyor." },
    past: { english: "He opened the shutters yesterday morning.", turkish: "Dün sabah panjurları açtı." },
    future: { english: "He will open the shutters tomorrow as well.", turkish: "Yarın da panjurları açacak." }
  },
  paraphrases: [
    { 
      original: "He greeted his neighbor with a warm smile.", 
      variants: ["He said hello to his neighbor happily.", "With a friendly look, he welcomed his neighbor."], 
      highlights: ["happily", "welcomed"] 
    }
  ],
  orderChanges: [
    ["Environment", "Action", "Family"],
    ["Family", "Environment", "Action"],
    ["Action", "Family", "Environment"]
  ]
};

export const MOCK_FEEDBACK = {
  strengths: "Your logic is very clear and the flow of sentences is natural.",
  areasToImprove: "Try to use more descriptive adjectives to enrich the story.",
  errors: [
    { rule: "Use 'the' before specific locations", example: "He went to THE bakery." }
  ],
  mistakes: ["Spelling tip: Neighbors (US) vs Neighbours (UK)"],
  nextStep: "Practice describing your own room using at least 5 adjectives."
};

export const MOCK_WORD_DESCRIPTION = {
  word: "Bakery",
  phonetic: "/ˈbeɪkəri/",
  turkish: "Fırın",
  definition: "A place where bread and cakes are made and sold.",
  examples: [
    { english: "I bought fresh bagels from the bakery.", turkish: "Fırından taze simit aldım." }
  ],
  synonyms: ["Bakehouse", "Pantry"]
};
