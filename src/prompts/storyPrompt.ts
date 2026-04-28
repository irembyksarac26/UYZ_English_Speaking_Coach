export const storyPrompt = (level: string, length: string, category: string, topic?: string) => `
Generate a parallel English and Turkish story for an adult learner.
Level: ${level}
Length: ${length}
Category: ${category}
${topic ? `Topic Description: ${topic}` : ''}

Strictly follow this JSON format:
{
  "title": { "english": "...", "turkish": "..." },
  "content": [
    { "english": "Sentence 1...", "turkish": "Cümle 1..." },
    ...
  ],
  "highFrequencyWords": [
    { "english": "word", "turkish": "kelime" },
    ...
  ],
  "patterns": [
    { "english": "pattern", "turkish": "kalıp" },
    ...
  ],
  "keySentences": [
    { "english": "key sentence", "turkish": "anahtar cümle" },
    ...
  ]
}

Instructions:
1. Turkish translations must be natural and perfectly aligned sentence-by-sentence.
2. For A1-A2, use simple vocabulary and present continuous/simple tenses.
3. For B1-B2, use more complex structures and varied tenses.
4. For C1, use formal language and idiomatic expressions.
5. If topic description is provided, use it as the core seed.
`;

export const analysisPrompt = (storyText: string) => `
Analyze the following English story and provide linguistic artifacts for a learner.
Story: ${storyText}

Strictly follow this JSON format:
{
  "keywords": [
    { "word": "...", "definition": "simple English definition", "turkish": "Turkish meaning", "category": "one of: Me, Family, Environment, Action, Emotion, Time" },
    ... (8-15 keywords)
  ],
  "mindMap": [
    { "title": "Me", "keywords": ["word1", "word2"] },
    ... (mapping keywords to categories)
  ],
  "tenses": {
    "now": { "english": "Rewrite a short summary in Present tense", "turkish": "Şimdiki zaman özeti" },
    "past": { "english": "Rewrite as speculation in Past tense", "turkish": "Geçmiş zaman kurgusu" },
    "future": { "english": "Rewrite as prediction in Future tense", "turkish": "Gelecek zaman tahmini" }
  },
  "paraphrases": [
    { 
      "original": "...", 
      "variants": ["paraphrase 1", "paraphrase 2"], 
      "highlights": ["word_swapped_1", "word_swapped_2"] 
    },
    ... (5-8 sentences)
  ],
  "orderChanges": [
    ["category1", "category2", "category3"],
    ["category2", "category3", "category1"],
    ["category3", "category1", "category2"]
  ]
}
`;
