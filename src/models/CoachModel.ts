import { GeminiClient } from './GeminiClient';
import { coachPrompt } from '../prompts/coachPrompt';
import { MOCK_FEEDBACK } from './MockData';

export class CoachModel {
  static async getFeedback(userInput: string, targetLevel: string) {
    if (!GeminiClient.hasApiKey()) {
      return MOCK_FEEDBACK;
    }

    const prompt = coachPrompt(userInput, targetLevel);
    const response = await GeminiClient.generate(prompt);
    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error('Failed to parse coach feedback JSON:', response);
      return MOCK_FEEDBACK;
    }
  }
}
