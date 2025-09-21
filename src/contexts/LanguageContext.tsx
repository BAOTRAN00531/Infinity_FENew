import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchEnglishLanguage, fetchLanguages } from "../api/languageService";
import { Language } from "../api/types";

// Mock data generator for languages
const generateMockLanguages = (): Language[] => {
  return [
    {
      id: 1,
      code: "en",
      name: "English",
      flag: "🇺🇸",
      difficulty: "Beginner",
      popularity: "High"
    },
    {
      id: 2,
      code: "es",
      name: "Spanish",
      flag: "🇪🇸",
      difficulty: "Beginner",
      popularity: "High"
    },
    {
      id: 3,
      code: "fr",
      name: "French",
      flag: "🇫🇷",
      difficulty: "Intermediate",
      popularity: "Medium"
    },
    {
      id: 4,
      code: "de",
      name: "German",
      flag: "🇩🇪",
      difficulty: "Intermediate",
      popularity: "Medium"
    },
    {
      id: 5,
      code: "ja",
      name: "Japanese",
      flag: "🇯🇵",
      difficulty: "Advanced",
      popularity: "Low"
    }
  ];
};

interface LanguageContextType {
  currentLanguage: Language | null;
  languages: Language[];
  setCurrentLanguage: (language: Language) => void;
  loading: boolean;
  error: string | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeLanguages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Lấy danh sách ngôn ngữ
        const allLanguages = await fetchLanguages();
        setLanguages(allLanguages);

        // Mặc định chọn tiếng Anh (United States)
        const english = await fetchEnglishLanguage();
        setCurrentLanguage(english);
      } catch (err) {
        // Silently fallback to mock data to avoid console spam
        console.log("[Languages API] Using mock data for languages");
        
        // Fallback to mock data
        const mockLanguages = generateMockLanguages();
        setLanguages(mockLanguages);
        setCurrentLanguage(mockLanguages[0]); // Set first language as default
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    initializeLanguages();
  }, []);

  const value = {
    currentLanguage,
    languages,
    setCurrentLanguage,
    loading,
    error
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};