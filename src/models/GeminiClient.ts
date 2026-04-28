import { GoogleGenAI } from '@google/genai';

export class GeminiClient {
  private static instance: GoogleGenAI | null = null;

  private static getInstance(): GoogleGenAI {
    if (!this.instance) {
      // @ts-ignore
      const fromProcess = typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : '';
      // @ts-ignore
      const fromVite = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta as any).env.VITE_GEMINI_API_KEY : '';
      
      let apiKey = fromProcess || fromVite || '';
      
      // Normalize and validate API Key
      if (typeof apiKey !== 'string') apiKey = '';
      apiKey = apiKey.trim();

      if (!apiKey || apiKey === 'undefined' || apiKey === 'null' || apiKey.length < 10) {
        throw new Error('API_KEY_MISSING');
      }
      
      this.instance = new GoogleGenAI({ apiKey });
    }
    return this.instance;
  }

  static hasApiKey(): boolean {
    try {
      // @ts-ignore
      const fromProcess = typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : '';
      // @ts-ignore
      const fromVite = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta as any).env.VITE_GEMINI_API_KEY : '';
      
      let apiKey = fromProcess || fromVite || '';
      if (typeof apiKey !== 'string') return false;
      apiKey = apiKey.trim();
      return !!apiKey && apiKey !== 'undefined' && apiKey !== 'null' && apiKey.length > 10;
    } catch (e) {
      return false;
    }
  }

  static async generate(prompt: string, modelName: string = 'gemini-3-flash-preview'): Promise<string> {
    try {
      const ai = this.getInstance();
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
        }
      });
      
      let text = response.text;
      if (!text) throw new Error('EMPTY_RESPONSE');
      
      // Clean up markdown code blocks if present
      if (text.includes('```json')) {
        text = text.split('```json')[1].split('```')[0].trim();
      } else if (text.includes('```')) {
        text = text.split('```')[1].split('```')[0].trim();
      }
      
      return text;
    } catch (error: any) {
      if (error.message === 'API_KEY_MISSING') {
        throw error;
      }
      console.error('Gemini API Error:', error);
      throw new Error('FAILED_TO_GENERATE');
    }
  }
}
