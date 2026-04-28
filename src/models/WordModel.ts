import { GeminiClient } from './GeminiClient';
import { wordPrompt } from '../prompts/coachPrompt';
import { CacheModel } from './CacheModel';
import { MOCK_WORD_DESCRIPTION } from './MockData';

export class WordModel {
  static async getWordDescription(word: string) {
    if (!GeminiClient.hasApiKey()) {
      return MOCK_WORD_DESCRIPTION;
    }

    const cacheKey = `word_${word.toLowerCase().trim()}`;
    const cached = CacheModel.get<any>(cacheKey);
    
    if (cached) return cached;

    const prompt = wordPrompt(word);
    const response = await GeminiClient.generate(prompt);
    try {
      const description = JSON.parse(response);
      CacheModel.set(cacheKey, description);
      return description;
    } catch (parseError) {
      console.error('Failed to parse word description JSON:', response);
      return MOCK_WORD_DESCRIPTION;
    }
  }
}
