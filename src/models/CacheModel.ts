export class CacheModel {
  private static PREFIX = 'uyz_cache_';

  static set(key: string, data: any): void {
    try {
      const serialized = JSON.stringify({
        timestamp: Date.now(),
        data
      });
      localStorage.setItem(`${this.PREFIX}${key}`, serialized);
    } catch (e) {
      console.warn('Cache write failed', e);
    }
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(`${this.PREFIX}${key}`);
    if (!item) return null;
    
    try {
      const { data } = JSON.parse(item);
      return data as T;
    } catch (e) {
      return null;
    }
  }

  static clear(): void {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  static generateKey(params: any): string {
    try {
      const str = JSON.stringify(params);
      // encodeURIComponent handles non-Latin1 characters by converting them to %XX escapes
      return btoa(encodeURIComponent(str)).substring(0, 32);
    } catch (e) {
      // Fallback for key generation if encoding fails
      return Math.random().toString(36).substring(7);
    }
  }
}
