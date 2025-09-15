// LexiconForm.tsx (AI Suggest + nghĩa TIẾNG VIỆT)
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/reuseables/Management/build/button';
import { Input } from '@/components/reuseables/Management/build/input';
import { Label } from '@/components/reuseables/Management/build/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/reuseables/Management/build/select';
import { Volume2, Search, Loader2, BookOpen, Info } from 'lucide-react';
import { LexiconUnit } from '@/pages/Management/CRUD/LexiconCRUD';
import { lexiconApi, Language } from '@/api/Management/lexiconApi';
import {
  dictionaryApi,
  DictionaryResponse,
  dictionaryHelpers
} from '@/api/Management/dictionaryApi';

/* ---------------- AI Suggest types ---------------- */
type AiSuggestItem = {
  word: string;
  pos?: string;
  ipa?: string;
  glossVi?: string;
  popularity?: number;
  confidence?: number;
};
type AiSuggestResp = { suggestions: AiSuggestItem[] };

// Call BE AI suggest
async function aiSuggest(prefix: string, lang: string, level = 'beginner'): Promise<AiSuggestResp> {
  const res = await fetch('http://localhost:8080/api/ai/lexicon/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ prefix, lang, level })
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI suggest failed: ${res.status} ${text}`);
  }
  return res.json();
}
/* -------------------------------------------------- */

interface LexiconFormProps {
  onSubmit: (data: Omit<LexiconUnit, 'id'>) => void;
  initialData?: LexiconUnit;
  type: 'units' | 'phrases';
  units: LexiconUnit[];
}

const LexiconForm: React.FC<LexiconFormProps> = ({ onSubmit, initialData, type, units }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  const enableDictionary = true;
  const enableAISuggest = true; // Tạm tắt gọi BE AI suggest để tránh 401

  const [formData, setFormData] = useState<any>({
    text: initialData?.text || '',
    ipa: initialData?.ipa || '',
    // Lưu nghĩa tiếng Việt vào meaning_en để không phải sửa FE khác
    meaning_en: initialData?.meaning_en || '',
    image: initialData?.image || '',
    type: initialData?.type || (type === 'units' ? 'vocabulary' : 'phrase'),
    partOfSpeech: initialData?.partOfSpeech || '',
    language: initialData?.language || 'en',
    difficulty: initialData?.difficulty || 'beginner'
  });

  // Dictionary / Suggest states
  const [dictionarySuggestions, setDictionarySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingDictionary, setSearchingDictionary] = useState(false);
  const [dictionaryResult, setDictionaryResult] = useState<DictionaryResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Map từ → thông tin AI (để autofill)
  const [aiMap, setAiMap] = useState<Record<string, AiSuggestItem>>({});

  // Cache cục bộ cho AI suggest
  const localCache = useRef<Map<string, AiSuggestResp>>(new Map());

  // Fetch languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const languagesResponse = await lexiconApi.languages.getAll();
        setLanguages(languagesResponse);
      } catch {
        // fallback list
        setLanguages([
          { id: 1, name: 'Vietnamese', code: 'vi' },
          { id: 2, name: 'Thailand', code: 'th-TH' },
          { id: 3, name: 'Malaysia', code: 'ms-MY' },
          { id: 4, name: 'French', code: 'fr-FR' },
          { id: 5, name: 'China', code: 'zh-CN' },
          { id: 6, name: 'Vietnam', code: 'vi-VN' },
          { id: 7, name: 'Egypt', code: 'ar-EG' },
          { id: 8, name: 'Russia', code: 'ru-RU' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  /* ---------------- Suggest flow ---------------- */
  const handleTextInputChange = (value: string) => {
    setFormData({ ...formData, text: value });
    setSearchQuery(value);

    if (!enableDictionary || type === 'phrases') return;

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if ((value || '').trim().length < 2) {
      setShowSuggestions(false);
      setDictionarySuggestions([]);
      return;
    }
    searchTimeoutRef.current = setTimeout(() => {
      searchDictionarySuggestions(value);
    }, 250);
  };

  const searchDictionarySuggestions = async (query: string) => {
    if (!enableDictionary || type === 'phrases') return;

    setSearchingDictionary(true);
    try {
      const normalizedLang = dictionaryHelpers.normalizeLanguageCode(formData.language);

      // 1) AI suggest trước (có cache)
      let aiList: AiSuggestItem[] = [];
      let aiWords: string[] = [];
      if (enableAISuggest) {
        const cacheKey = `${normalizedLang}|${query}|${formData.difficulty}`;
        try {
          let resp: AiSuggestResp | undefined = localCache.current.get(cacheKey);
          if (!resp) {
            resp = await aiSuggest(query, normalizedLang, formData.difficulty);
            localCache.current.set(cacheKey, resp);
          }
          aiList = resp.suggestions || [];
          aiWords = aiList.map(s => s.word);
          const map: Record<string, AiSuggestItem> = {};
          aiList.forEach(s => { map[s.word.toLowerCase()] = s; });
          setAiMap(map);
        } catch {
          setAiMap({});
        }
      }

      // 2) Fallback dictionary
      let dictWords: string[] = [];
      try {
        dictWords = await dictionaryHelpers.generateSuggestions(query, normalizedLang);
      } catch {
        dictWords = dictionaryHelpers.generateLocalSuggestions(query, normalizedLang);
      }

      // 3) Gợi ý từ units đã có
      const existing = units
        .filter(u => u.language === formData.language && u.text.toLowerCase().includes(query.toLowerCase()))
        .map(u => u.text);

      // 4) Merge (ưu tiên AI đứng trước) & unique
      const merged = Array.from(new Set([...aiWords, ...dictWords, ...existing])).slice(0, 20);

      setDictionarySuggestions(merged);
      setShowSuggestions(merged.length > 0);
    } finally {
      setSearchingDictionary(false);
    }
  };

  const selectSuggestion = async (suggestion: string) => {
    if (!enableDictionary || type === 'phrases') return;

    setFormData({ ...formData, text: suggestion });
    setSearchQuery(suggestion);
    setShowSuggestions(false);

    const hit = aiMap[suggestion.toLowerCase()];
    if (hit) {
      setFormData((prev: any) => ({
        ...prev,
        text: hit.word,
        ipa: hit.ipa || prev.ipa,
        partOfSpeech: hit.pos || prev.partOfSpeech,
        meaning_en: hit.glossVi || prev.meaning_en, // ĐỔ NGHĨA TIẾNG VIỆT
        type: 'vocabulary'
      }));
      setDictionaryResult(null);
      return;
    }

    // Nếu không có AI info → dùng dictionary
    await searchDictionaryWord(suggestion);
  };

  const searchDictionaryWord = async (word: string) => {
    if (!enableDictionary || type === 'phrases') return;

    setSearchingDictionary(true);
    try {
      const existingUnit = units.find(
        u => u.text.toLowerCase() === word.toLowerCase() && u.language === formData.language
      );
      if (existingUnit) {
        setFormData({
          ...formData,
          text: existingUnit.text,
          ipa: existingUnit.ipa,
          meaning_en: existingUnit.meaning_en || '',
          partOfSpeech: existingUnit.partOfSpeech || '',
          type: existingUnit.type,
          difficulty: existingUnit.difficulty
        });
        setDictionaryResult(null);
        return;
      }

      const normalizedLanguage = dictionaryHelpers.normalizeLanguageCode(formData.language);
      if (dictionaryApi.isLanguageSupported(normalizedLanguage)) {
        const result = await dictionaryApi.searchByLanguage(normalizedLanguage, word);
        if (result && !result.error) {
          setDictionaryResult(result);
          setFormData({
            ...formData,
            text: result.word,
            ipa: result.pronunciation || '',
            meaning_en: result.meanings?.length ? result.meanings.join(', ') : '',
            partOfSpeech: result.partOfSpeech || '',
            type: 'vocabulary'
          });
        }
      }
    } finally {
      setSearchingDictionary(false);
    }
  };
  /* ---------------- end Suggest flow ---------------- */

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileUpload = (field: 'image', file: File) => {
    const url = URL.createObjectURL(file);
    setFormData({ ...formData, [field]: url });
  };

  // TTS test
  const testTTS = async () => {
    try {
      const params = new URLSearchParams({
        text: formData.text,
        languageCode: formData.language
        // nếu bạn có UI chọn voice: thêm voiceName vào đây
        // voiceName: selectedVoice
      }).toString();

      const response = await fetch(`http://localhost:8080/api/tts/synthesize?${params}`, { credentials: 'omit' });
      if (response.ok) {
        const audioData = await response.text();
        const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
        audio.play().catch(() => fallbackToBrowserTTS());
      } else {
        fallbackToBrowserTTS();
      }
    } catch {
      fallbackToBrowserTTS();
    }
  };

  const fallbackToBrowserTTS = () => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(formData.text);
    utterance.lang = formData.language || 'en-US';
    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      const v = voices.find(x => x.lang === utterance.lang) ||
                voices.find(x => x.lang.split('-')[0] === utterance.lang.split('-')[0]);
      if (v) utterance.voice = v;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    };
    if (speechSynthesis.getVoices().length) setVoice();
    else speechSynthesis.onvoiceschanged = () => { setVoice(); speechSynthesis.onvoiceschanged = null; };
  };

  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const posOptions = ['prefix', 'suffix', 'main verb', 'adjective', 'adverb', 'conjunction', 'preposition', 'article', 'pronoun', 'interjection'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Label htmlFor="text">Text *</Label>
          <div className="relative">
            <Input
              id="text"
              value={formData.text}
              onChange={(e) => handleTextInputChange(e.target.value)}
              placeholder={type === 'phrases' ? "Enter phrase" : "Enter word or phrase"}
              required
              className="rounded-xl pr-10"
            />
            {enableDictionary && type === 'units' && searchingDictionary && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" />
            )}
            {enableDictionary && type === 'units' && !searchingDictionary && formData.text && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => searchDictionaryWord(formData.text)}
                  className="p-1 h-auto"
                  title="Search dictionary"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {enableDictionary && type === 'units' && showSuggestions && dictionarySuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
            >
              {dictionarySuggestions.map((sug, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => selectSuggestion(sug)}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{sug}</span>
                    {aiMap[sug.toLowerCase()]?.glossVi && (
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">AI</span>
                    )}
                  </div>
                  {aiMap[sug.toLowerCase()]?.glossVi && (
                    <div className="pl-6 pr-2 pb-1 text-xs text-gray-600">
                      {aiMap[sug.toLowerCase()].glossVi}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="ipa">IPA Pronunciation</Label>
          <div className="flex gap-2">
            <Input
              id="ipa"
              value={formData.ipa}
              onChange={(e) => setFormData({ ...formData, ipa: e.target.value })}
              placeholder="/həˈloʊ/"
              className="rounded-xl"
            />
            {type === 'units' && (
              <Button type="button" variant="outline" size="sm" onClick={testTTS} className="rounded-xl">
                <Volume2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="meaning_en">Nghĩa (Tiếng Việt)</Label>
        <Input
          id="meaning_en"
          value={formData.meaning_en}
          onChange={(e) => setFormData({ ...formData, meaning_en: e.target.value })}
          placeholder="Nhập nghĩa tiếng Việt ngắn"
          className="rounded-xl"
        />
      </div>

      <div>
        <Label htmlFor="partOfSpeech">Part of Speech</Label>
        <Select
          value={formData.partOfSpeech}
          onValueChange={(value) => setFormData({ ...formData, partOfSpeech: value })}
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Select a role in sentence" />
          </SelectTrigger>
          <SelectContent>
            {posOptions.map((item) => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vocabulary">Vocabulary</SelectItem>
              <SelectItem value="phrase">Phrase</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder={loading ? "Loading languages..." : "Select language"} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.code}>{lang.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((diff) => (
                <SelectItem key={diff} value={diff}>{diff}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {enableDictionary && type === 'units' && dictionaryResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Dictionary Information</h4>
          </div>
          <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <strong>Debug Info:</strong>
            <pre className="mt-1 text-xs overflow-auto">{JSON.stringify(dictionaryResult, null, 2)}</pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium text-gray-700">Word:</span><span className="ml-2 text-gray-900">{dictionaryResult.word}</span></div>
            <div><span className="font-medium text-gray-700">Pronunciation:</span><span className="ml-2 text-gray-900">{dictionaryHelpers.formatPronunciation(dictionaryResult.pronunciation, dictionaryResult.language)}</span></div>
            <div><span className="font-medium text-gray-700">Part of Speech:</span><span className="ml-2 text-gray-900">{dictionaryResult.partOfSpeech || 'N/A'}</span></div>
            <div><span className="font-medium text-gray-700">Language:</span><span className="ml-2 text-gray-900">{dictionaryHelpers.getLanguageDisplayName(dictionaryResult.language)}</span></div>
          </div>
          {dictionaryResult.meanings?.length ? (
            <div className="mt-3">
              <span className="font-medium text-gray-700">Meanings:</span>
              <div className="mt-1">
                {dictionaryResult.meanings.map((m, i) => (<div key={i} className="text-gray-900">• {m}</div>))}
              </div>
            </div>
          ) : null}
          {dictionaryResult.examples?.length ? (
            <div className="mt-3">
              <span className="font-medium text-gray-700">Examples:</span>
              <div className="mt-1">
                {dictionaryResult.examples.map((ex, i) => (<div key={i} className="text-gray-900 italic">"{ex}"</div>))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      <div>
        <Label htmlFor="image">Image File</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload('image', file);
          }}
          className="rounded-xl"
        />
        {formData.image && (<img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-xl mt-2" />)}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6 py-2 rounded-xl"
        >
          {initialData ? 'Update' : 'Create'} {type === 'units' ? 'Word' : 'Phrase'}
        </Button>
      </div>
    </form>
  );
};

export default LexiconForm;
