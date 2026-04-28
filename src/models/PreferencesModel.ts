import { EnglishLevel, StoryCategory, StoryLength } from '../types';

export class PreferencesModel {
  private static KEYS = {
    LEVEL: 'uyz_pref_level',
    CATEGORY: 'uyz_pref_category',
    LENGTH: 'uyz_pref_length'
  };

  static saveLevel(level: EnglishLevel): void {
    try {
      localStorage.setItem(this.KEYS.LEVEL, level);
    } catch (e) {}
  }

  static getLevel(): EnglishLevel {
    try {
      return (localStorage.getItem(this.KEYS.LEVEL) as EnglishLevel) || EnglishLevel.A1_A2;
    } catch (e) {
      return EnglishLevel.A1_A2;
    }
  }

  static saveCategory(category: StoryCategory): void {
    try {
      localStorage.setItem(this.KEYS.CATEGORY, category);
    } catch (e) {}
  }

  static getCategory(): StoryCategory {
    try {
      return (localStorage.getItem(this.KEYS.CATEGORY) as StoryCategory) || StoryCategory.DAILY_LIFE;
    } catch (e) {
      return StoryCategory.DAILY_LIFE;
    }
  }

  static saveLength(length: StoryLength): void {
    try {
      localStorage.setItem(this.KEYS.LENGTH, length);
    } catch (e) {}
  }

  static getLength(): StoryLength {
    try {
      return (localStorage.getItem(this.KEYS.LENGTH) as StoryLength) || StoryLength.SHORT;
    } catch (e) {
      return StoryLength.SHORT;
    }
  }
}
