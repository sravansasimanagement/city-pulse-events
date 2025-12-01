import { useState, useEffect, createContext, useContext } from "react";
import { Storage } from "../utils/storage";
import * as I18nManager from "react-native/Libraries/I18n/I18nManager";

type Language = "en" | "ar";
interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    Storage.getLanguage().then(setLanguageState);
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await Storage.setLanguage(lang);

    // Toggle RTL layout
    const isRTL = lang === "ar";
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);

    // *In a real-world app, you'd prompt a full app reload here
    // *or use a library like `react-i18next` for soft reload.
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, isRTL, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
