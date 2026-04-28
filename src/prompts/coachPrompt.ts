export const wordPrompt = (word: string) => `
Provide a 5-layer description for the English word: "${word}"

Strictly follow this JSON format:
{
  "word": "${word}",
  "upperMeaning": "A broader category this word belongs to",
  "breakdown": "Types or variations within this category",
  "definition": "Simple English dictionary meaning",
  "genericExample": "A universal example sentence using the word",
  "personalPrompt": "A simple question in English to help the user relate the word to their life",
  "turkishTranslations": {
    "upperMeaning": "Turkish translation of upperMeaning",
    "breakdown": "Turkish translation of breakdown",
    "definition": "Turkish translation of definition",
    "genericExample": "Turkish translation of genericExample",
    "personalPrompt": "Turkish translation of personalPrompt"
  }
}
`;

export const coachPrompt = (userInput: string, targetLevel: string) => `
Act as a supportive English Speaking Coach for a Turkish-speaking adult learner.
Analyze the following input: "${userInput}"
Target Level: ${targetLevel}

Priority: Logic and flow first, language second.
Distinguish between 'Mistakes' (slips) and 'Errors' (systemic problems).

Strictly follow this JSON format:
{
  "strengths": "Feedback in English about what they did well (logic, examples, etc.)",
  "areasToImprove": "Feedback in English about structure and flow improvements",
  "errors": [
    { "rule": "Mini teaching note for the error", "example": "Fixed version of their error" }
  ],
  "mistakes": ["Short list of slips"],
  "nextStep": "1-2 practical suggestions for improvement"
}
`;
