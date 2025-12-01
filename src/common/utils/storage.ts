import AsyncStorage from "@react-native-async-storage/async-storage";

import { Event } from "../../types";

const FAVORITES_KEY = "@CityPulse:Favorites";
const LANGUAGE_KEY = "@CityPulse:Language";

export const Storage = {
  getFavorites: async (): Promise<Event[]> => {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  },
  saveFavorites: async (events: Event[]): Promise<void> => {
    const jsonValue = JSON.stringify(events);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
  },
  getLanguage: async (): Promise<"en" | "ar"> => {
    const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return lang === "ar" || lang === "en" ? lang : "en";
  },
  setLanguage: async (lang: "en" | "ar"): Promise<void> => {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  },
};
