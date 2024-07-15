import AsyncStorage from '@react-native-async-storage/async-storage';

type DeviceStorageResponse = {
  error?: null | Error;
  value?: string | null;
};

export const deviceStorage = {
  async saveItem(key: string, value: string): Promise<DeviceStorageResponse> {
    try {
      await AsyncStorage.setItem(key, value);
      return {value: value};
    } catch (err) {
      const error = err as Error;
      return {error};
    }
  },

  async deleteItem(key: string): Promise<DeviceStorageResponse> {
    try {
      await AsyncStorage.removeItem(key);
      return {};
    } catch (err) {
      const error = err as Error;
      return {error};
    }
  },

  async getItem(key: string): Promise<DeviceStorageResponse> {
    try {
      const value = await AsyncStorage.getItem(key);
      return {value};
    } catch (err) {
      const error = err as Error;
      return {error};
    }
  },
};
