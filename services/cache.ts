// services/cache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cacheData = async (key: string, data: any) => {
  try {
    const item = {
      data,
      timestamp: Date.now()
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Cache error:', error);
  }
};

export const getCachedData = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    const now = Date.now();

    if (now - parsed.timestamp > CACHE_DURATION) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};