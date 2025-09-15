import api from '@/api/api';

// Dictionary API Types
export interface DictionaryResponse {
  word: string;
  language: string;
  pronunciation: string;
  meanings: string[];
  audioUrl: string;
  error: string | null;
  kanji?: string;
  radicals?: string;
  strokeCount?: string;
  partOfSpeech?: string;
  examples?: string[];
}

export interface DictionarySearchParams {
  lang: string;
  word: string;
}

// Language codes mapping
export const SUPPORTED_LANGUAGES = {
  // English
  'en': {
    name: 'Tiếng Anh',
    apiSource: 'DictionaryAPI.dev',
    features: ['Định nghĩa', 'phát âm', 'ví dụ']
  },
  // Japanese
  'ja': {
    name: 'Tiếng Nhật',
    apiSource: 'KanjiAPI + JMdict',
    features: ['Kanji info', 'radicals', 'stroke count']
  },
  // Chinese
  'cmn-cn': {
    name: 'Tiếng Trung (Giản thể)',
    apiSource: 'CC-CEDICT',
    features: ['Pinyin', 'nghĩa']
  },
  // Korean
  'ko': {
    name: 'Tiếng Hàn',
    apiSource: 'Wiktionary API',
    features: ['Định nghĩa', 'ví dụ']
  },
  // German
  'de': {
    name: 'Tiếng Đức',
    apiSource: 'dictionaryapi.dev',
    features: ['Định nghĩa']
  },
  // Russian
  'ru': {
    name: 'Tiếng Nga',
    apiSource: 'dictionaryapi.dev',
    features: ['Định nghĩa']
  },
  // French
  'fr': {
    name: 'Tiếng Pháp',
    apiSource: 'dictionaryapi.dev',
    features: ['Định nghĩa']
  },
  // Spanish
  'es': {
    name: 'Tiếng Tây Ban Nha',
    apiSource: 'dictionaryapi.dev',
    features: ['Định nghĩa']
  }
} as const;

export type SupportedLanguageCode = keyof typeof SUPPORTED_LANGUAGES;

// Dictionary API
export const dictionaryApi = {
  // Main dictionary search endpoint
  search: async (params: DictionarySearchParams): Promise<DictionaryResponse> => {
    const response = await api.get('/api/dictionary', { params });
    return response.data;
  },

  // Search with language and word separately
  searchByLanguage: async (languageCode: string, word: string): Promise<DictionaryResponse> => {
    const response = await api.get('/api/dictionary', {
      params: {
        lang: languageCode,
        word: word
      }
    });
    return response.data;
  },

  // Get suggestions from backend API
  getSuggestions: async (languageCode: string, query: string): Promise<string[]> => {
    // NOTE: Tạm thời vô hiệu hóa gọi BE để tránh lỗi 500 và double /api
    // Trả về gợi ý local cho đến khi backend sẵn sàng
    return dictionaryHelpers.generateLocalSuggestions(query, languageCode);
  },

  // Get supported languages
  getSupportedLanguages: (): typeof SUPPORTED_LANGUAGES => {
    return SUPPORTED_LANGUAGES;
  },

  // Check if language is supported
  isLanguageSupported: (languageCode: string): languageCode is SupportedLanguageCode => {
    return languageCode in SUPPORTED_LANGUAGES;
  },

  // Get language info
  getLanguageInfo: (languageCode: string) => {
    return SUPPORTED_LANGUAGES[languageCode as SupportedLanguageCode];
  },

  // Test endpoint
  test: async (): Promise<string> => {
    const response = await api.get('/api/dictionary/test');
    return response.data;
  },

  // Health check
  health: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await api.get('/api/dictionary/health');
    return response.data;
  }
};

// Helper functions for dictionary
export const dictionaryHelpers = {
  // Normalize language code (remove country suffix for backend compatibility)
  normalizeLanguageCode: (languageCode: string): string => {
    return languageCode.split('-')[0];
  },

  // Format pronunciation for display
  formatPronunciation: (pronunciation: string, language: string): string => {
    switch (language) {
      case 'ja':
        return `[${pronunciation}]`;
      case 'cmn-cn':
        return `拼音: ${pronunciation}`;
      case 'ko':
        return `발음: ${pronunciation}`;
      default:
        return pronunciation;
    }
  },

  // Get language display name
  getLanguageDisplayName: (languageCode: string): string => {
    return SUPPORTED_LANGUAGES[languageCode as SupportedLanguageCode]?.name || languageCode;
  },

  // Validate search parameters
  validateSearchParams: (params: DictionarySearchParams): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!params.lang) {
      errors.push('Language code is required');
    } else if (!dictionaryApi.isLanguageSupported(params.lang)) {
      errors.push(`Language '${params.lang}' is not supported`);
    }
    
    if (!params.word || params.word.trim().length === 0) {
      errors.push('Search word is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Generate local suggestions as fallback (when API is not available)
  generateLocalSuggestions: (input: string, language: string): string[] => {
    // This is now only used as fallback when backend API fails
    let suggestions: string[] = [];
    
    if (input.length > 0) {
      // Add common words for the language
      switch (language) {
        case 'ja':
          suggestions.push('こんにちは', 'ありがとう', 'おはよう', 'さようなら');
          break;
        case 'cmn-cn':
          suggestions.push('你好', '谢谢', '再见', '早上好');
          break;
        case 'ko':
          suggestions.push('안녕하세요', '감사합니다', '안녕히 가세요', '좋은 아침');
          break;
        case 'fr':
          suggestions.push('bonjour', 'merci', 'au revoir', 'bonne journée');
          break;
        case 'es':
          suggestions.push('hola', 'gracias', 'adiós', 'buenos días');
          break;
        case 'de':
          suggestions.push('hallo', 'danke', 'auf wiedersehen', 'guten morgen');
          break;
        case 'ru':
          suggestions.push('привет', 'спасибо', 'до свидания', 'доброе утро');
          break;
        case 'en':
        default:
          // English suggestions with common patterns
          const commonWords = [
            'national', 'nationwide', 'nationality', 'nationalize', 'nationalism',
            'international', 'multinational', 'transnational', 'supranational',
            'natural', 'nature', 'naturally', 'naturalize', 'naturalization',
            'native', 'nativity', 'nativism', 'nativist',
            'navigate', 'navigation', 'navigator', 'navigable',
            'narrative', 'narrate', 'narrator', 'narration',
            'necessary', 'necessity', 'necessitate', 'necessarily',
            'negative', 'negate', 'negation', 'negatively',
            'neutral', 'neutralize', 'neutrality', 'neutrally',
            'normal', 'normalize', 'normality', 'normally',
            'notable', 'notably', 'notation', 'notate',
            'novel', 'novelty', 'novelist', 'novelize'
          ];
          
          // Filter words that start with or contain the input
          const filteredWords = commonWords.filter(word => 
            word.toLowerCase().startsWith(input.toLowerCase()) ||
            word.toLowerCase().includes(input.toLowerCase())
          );
          
          suggestions.push(...filteredWords);
          break;
      }
      
      // Filter suggestions that start with input
      suggestions = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
    }
    
    return suggestions.slice(0, 8); // Return max 8 suggestions
  },

  // Generate search suggestions based on input - now calls backend API
  generateSuggestions: async (input: string, language: string): Promise<string[]> => {
    if (input.length < 2) {
      return [];
    }
    // Tạm thời dùng local thay vì gọi BE
    return dictionaryHelpers.generateLocalSuggestions(input, language);
  }
};

export default dictionaryApi;
