import { GeminiClient } from './GeminiClient';
import { storyPrompt, analysisPrompt } from '../prompts/storyPrompt';
import { CacheModel } from './CacheModel';
import { MOCK_STORY, MOCK_ANALYSIS } from './MockData';

export class StoryModel {
  static async getStory(level: string, length: string, category: string, topic?: string) {
    if (!GeminiClient.hasApiKey()) {
      return MOCK_STORY;
    }

    const cacheKey = `story_${CacheModel.generateKey({ level, length, category, topic })}`;
    const cached = CacheModel.get<any>(cacheKey);
    
    if (cached) return cached;

    const prompt = storyPrompt(level, length, category, topic);
    const response = await GeminiClient.generate(prompt);
    try {
      const story = JSON.parse(response);
      CacheModel.set(cacheKey, story);
      return story;
    } catch (parseError) {
      console.error('Failed to parse story JSON:', response);
      return MOCK_STORY;
    }
  }

  static async analyzeStory(storyText: string) {
    if (!GeminiClient.hasApiKey()) {
      return MOCK_ANALYSIS;
    }

    const cacheKey = `analysis_${CacheModel.generateKey(storyText)}`;
    const cached = CacheModel.get<any>(cacheKey);
    
    if (cached) return cached;

    const prompt = analysisPrompt(storyText);
    const response = await GeminiClient.generate(prompt);
    try {
      const analysis = JSON.parse(response);
      CacheModel.set(cacheKey, analysis);
      return analysis;
    } catch (parseError) {
      console.error('Failed to parse analysis JSON:', response);
      return MOCK_ANALYSIS;
    }
  }
}
