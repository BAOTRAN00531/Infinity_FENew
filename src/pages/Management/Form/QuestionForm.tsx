// src/components/inmutable-components/CRUD/form/QuestionForm.tsx
import React, { useEffect, useState, FormEvent, useRef } from 'react';
import {
  OptionCreateDto,
  AnswerCreateDto,
  QuestionDto,
  UIQuestion,
  Lesson,
} from '@/api/types';
import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input_admin } from '@/components/reuseables/Management/build/input_admin';
import { Label } from '@/components/reuseables/Management/build/label';
import { Textarea } from '@/components/reuseables/Management/build/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/reuseables/Management/build/select';
import { toast } from 'react-toastify';
import { mapQuestionDtoToUIQuestion } from '@/api/index';
import WordSuggestion from '@/pages/Management/WordSuggestion';
import { BookOpen } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/reuseables/Management/build/dialog';
import api from '@/api/api';
import {
  fetchModulesByLanguage,
  Language,
  ModuleLite,
  fetchLessonsByModule,
} from '@/api/Management/adminQuestionApi';
import { lexiconApi } from '@/api/Management/lexiconApi';

import MultipleChoiceEditor from './editors/MultipleChoiceEditor';
import FillInTheBlankEditor from './editors/FillInTheBlankEditor';
import SpeakingEditor from './editors/SpeakingEditor';
import MatchingEditor from './editors/MatchingEditor';
import WordOrderEditor from './editors/WordOrderEditor';
import ImageChoiceEditor from './editors/ImageChoiceEditor';
import ListeningInputEditor from './editors/ListeningInputEditor';

interface QuestionFormProps {
  initialData?: UIQuestion;
  modules: ModuleLite[]; // vẫn giữ để tương thích, nhưng ta dùng state cục bộ
  lessons: Lesson[];     // vẫn giữ để tương thích, nhưng ta dùng state cục bộ
  onModuleChange: (moduleId: number) => void;
  onSubmit: (question: UIQuestion) => void;
}

export interface OptionDto extends OptionCreateDto {
  id: number;
}

export interface AnswerDto extends AnswerCreateDto {
  id: number;
}

type FormState = {
  questionText: string;
  questionTypeId: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  moduleId: number;
  lessonId: number;
  ipa?: string;
  hint?: string;
  explanation?: string;
};

type QuestionType = {
  id: number;
  code: string;
  description: string;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  modules: _modulesProp,
  lessons: _lessonsProp,
  onModuleChange,
  onSubmit,
}) => {
  // --- state danh mục ---
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  // Modules/Lessons quản lý nội bộ để chủ động fetch
  const [localModules, setLocalModules] = useState<ModuleLite[]>([]);
  const [localLessons, setLocalLessons] = useState<Lesson[]>([]);

  // WordSuggestion
  const [suggestionUnits, setSuggestionUnits] = useState<any[]>([]);
  const [suggestionPhrases, setSuggestionPhrases] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Question form
  const [formData, setFormData] = useState<FormState>({
    questionText: initialData?.questionText || '',
    questionTypeId: initialData?.questionTypeId || 1,
    difficulty: (initialData?.difficulty as 'easy' | 'medium' | 'hard') || 'easy',
    points: initialData?.points || 10,
    moduleId: initialData?.moduleId || 0,
    lessonId: initialData?.lessonId || 0,
    ipa: initialData?.ipa || '',
    hint: initialData?.hint || '',
    explanation: initialData?.explanation || '',
  });

  // Question types
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);

  // Options/Answers
  const [options, setOptions] = useState<OptionCreateDto[]>(
    initialData?.options || []
  );
  const [answers, setAnswers] = useState<AnswerCreateDto[]>(
    initialData?.answers || []
  );

  // Editors data
  const [fillInTheBlankData, setFillInTheBlankData] = useState<any>({
    conversation: [
      { content: '', speaker: 'left', blankPositions: [] },
      { content: '', speaker: 'right', blankPositions: [] },
    ],
    correctAnswer: { blanks: [] },
  });

  const [speakingData, setSpeakingData] = useState<any>({
    targetSentence: '',
    languageCode: 'en',
    audioUrl: undefined,
    audioFile: undefined,
    pronunciationTips: '',
    difficulty: 'easy',
    timeLimit: undefined,
  });

  const [matchingData, setMatchingData] = useState<any>({
    pairs: [],
    instructions: '',
    shuffleOptions: false,
    showPreview: false,
  });

  const [wordOrderData, setWordOrderData] = useState<any>({
    words: [],
    correctOrder: [],
  });

  // ===== Helpers cho options/answers =====
  const addOption = () =>
    setOptions((prev) => [
      ...prev,
      {
        optionText: '',
        correct: false,
        position: prev.length + 1,
      },
    ]);

  const removeOption = (index: number) =>
    setOptions((prev) => prev.filter((_, i) => i !== index));

  const handleOptionChange = (
    index: number,
    field: keyof OptionCreateDto,
    value: OptionCreateDto[keyof OptionCreateDto]
  ) => {
    setOptions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addAnswer = () =>
    setAnswers((prev) => [
      ...prev,
      {
        answerText: '',
        caseSensitive: false,
        position: prev.length + 1,
      },
    ]);

  const removeAnswer = (index: number) =>
    setAnswers((prev) => prev.filter((_, i) => i !== index));

  const handleAnswerChange = (
    index: number,
    field: keyof AnswerCreateDto,
    value: AnswerCreateDto[keyof AnswerCreateDto]
  ) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ===== Load languages =====
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const langs = await lexiconApi.languages.getAll();
        setLanguages(langs || []);
        if (!selectedLanguage && Array.isArray(langs) && langs.length > 0) {
          setSelectedLanguage(langs[0].code); // set mặc định
        }
      } catch (err) {
        console.error('❌ Error loading languages:', err);
        toast.error('Không thể tải danh sách ngôn ngữ', { autoClose: 1200 });
      }
    };
    loadLanguages();
  }, []); // once

  // ===== Khi initialData đổi: sync form & word order =====
  useEffect(() => {
    if (!initialData) return;
    setFormData({
      questionText: initialData.questionText || '',
      questionTypeId: initialData.questionTypeId || 1,
      difficulty: (initialData.difficulty as 'easy' | 'medium' | 'hard') || 'easy',
      points: initialData.points || 10,
      moduleId: initialData.moduleId || 0,
      lessonId: initialData.lessonId || 0,
      ipa: initialData.ipa || '',
      hint: initialData.hint || '',
      explanation: initialData.explanation || '',
    });

    if (
      initialData.questionTypeId === 3 &&
      Array.isArray(initialData.options)
    ) {
      const words = initialData.options.map((opt) => opt.optionText || '');
      let correctOrder: string[] = [];
      if (
        initialData.answers &&
        initialData.answers.length > 0 &&
        initialData.answers[0].answerText
      ) {
        correctOrder = initialData.answers[0].answerText.split(' ');
      } else {
        correctOrder = [...words];
      }
      setWordOrderData({ words, correctOrder });
    }

    if (initialData.moduleId) {
      // load lessons cho module hiện tại
      fetchLessonsByModule(initialData.moduleId)
        .then((ls) => setLocalLessons(Array.isArray(ls) ? ls : []))
        .catch(() => setLocalLessons([]));
      // báo cho parent (nếu muốn giữ hành vi cũ)
      onModuleChange(initialData.moduleId);
    }
  }, [initialData, onModuleChange]);

  // ===== Load question types =====
  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const res = await api.get('/api/question-types');
        if (!Array.isArray(res.data)) {
          setQuestionTypes([]);
          toast.error('Dữ liệu question types không hợp lệ!', { autoClose: 1200 });
          return;
        }
        setQuestionTypes(res.data);
      } catch {
        setQuestionTypes([]);
        toast.error('Không thể tải question types', { autoClose: 1200 });
      }
    };
    fetchQuestionTypes();
  }, []);

  // ===== Khi language đổi: load modules theo ngôn ngữ =====
  useEffect(() => {
    const loadModulesByLang = async () => {
      if (!selectedLanguage) return;
      try {
        const mods = await fetchModulesByLanguage(selectedLanguage);
        const valid = (mods || []).filter((m) => Number.isInteger(m?.id));
        setLocalModules(valid);

        // reset selections downstream khi đổi ngôn ngữ
        setFormData((prev) => ({ ...prev, moduleId: 0, lessonId: 0 }));

        // auto pick module đầu
        if (valid.length > 0) {
          setFormData((prev) => ({ ...prev, moduleId: valid[0].id, lessonId: 0 }));
          // fetch lessons cho module đầu
          const ls = await fetchLessonsByModule(valid[0].id);
          setLocalLessons(Array.isArray(ls) ? ls : []);
        } else {
          setLocalLessons([]);
        }
      } catch (err) {
        console.error(err);
        toast.error('Không thể tải courses theo ngôn ngữ', { autoClose: 1200 });
      }
    };
    loadModulesByLang();
  }, [selectedLanguage]);

  // ===== Khi moduleId đổi: fetch lessons theo module =====
  useEffect(() => {
    const loadLessons = async () => {
      if (!formData.moduleId) {
        setLocalLessons([]);
        return;
      }
      try {
        const ls = await fetchLessonsByModule(formData.moduleId);
        const arr = Array.isArray(ls) ? ls : [];
        setLocalLessons(arr);
        setFormData((prev) => ({
          ...prev,
          lessonId: arr.length > 0 ? (arr[0].id as number) : 0,
        }));
      } catch (e) {
        setLocalLessons([]);
        setFormData((prev) => ({ ...prev, lessonId: 0 }));
        toast.error('Không tải được danh sách parts', { autoClose: 1200 });
      }
    };
    loadLessons();
  }, [formData.moduleId]);

  // ===== Suggestion loader =====
  const loadSuggestions = async (languageCode: string) => {
    if (!languageCode) return;
    try {
      setLoadingSuggestions(true);

      // Units
      let units: any[] = [];
      try {
        const unitsResponse = await lexiconApi.units.getByLanguage(languageCode);
        if (Array.isArray(unitsResponse) && unitsResponse.length > 0) {
          units = unitsResponse;
        } else {
          const allUnitsResponse = await lexiconApi.units.getAll();
          if (
            allUnitsResponse &&
            allUnitsResponse.result &&
            Array.isArray(allUnitsResponse.result)
          ) {
            units = allUnitsResponse.result.filter((unit: any) => {
              const lang = unit.language;
              if (typeof lang === 'string')
                return lang === languageCode || lang.startsWith(languageCode);
              if (lang && typeof lang === 'object') {
                const code = lang.code || '';
                const name = (lang.name || '').toLowerCase();
                return (
                  code === languageCode ||
                  code.startsWith(languageCode) ||
                  name.includes(languageCode.toLowerCase())
                );
              }
              return false;
            });
          }
        }
      } catch {
        try {
          const allUnitsResponse = await lexiconApi.units.getAll();
          if (
            allUnitsResponse &&
            allUnitsResponse.result &&
            Array.isArray(allUnitsResponse.result)
          ) {
            units = allUnitsResponse.result.filter((unit: any) => {
              const lang = unit.language;
              if (typeof lang === 'string')
                return lang === languageCode || lang.startsWith(languageCode);
              if (lang && typeof lang === 'object') {
                const code = lang.code || '';
                const name = (lang.name || '').toLowerCase();
                return (
                  code === languageCode ||
                  code.startsWith(languageCode) ||
                  name.includes(languageCode.toLowerCase())
                );
              }
              return false;
            });
          }
        } catch {
          // ignore
        }
      }

      // Phrases
      let phrases: any[] = [];
      try {
        const phrasesResponse = await lexiconApi.units.getPhrases();
        if (
          phrasesResponse &&
          phrasesResponse.result &&
          Array.isArray(phrasesResponse.result)
        ) {
          phrases = phrasesResponse.result.filter((phrase: any) => {
            const pl = phrase.language;
            if (typeof pl === 'string')
              return pl === languageCode || pl.startsWith(languageCode);
            if (pl && typeof pl === 'object') {
              const code = pl.code || '';
              const name = (pl.name || '').toLowerCase();
              return (
                code === languageCode ||
                code.startsWith(languageCode) ||
                name.includes(languageCode.toLowerCase())
              );
            }
            return false;
          });
        }
      } catch {
        // ignore
      }

      setSuggestionUnits(units);
      setSuggestionPhrases(phrases);
    } catch (error) {
      console.error('❌ Error loading suggestions:', error);
      toast.error('Không thể tải danh sách từ vựng và cụm từ', { autoClose: 1200 });
      setSuggestionUnits([]);
      setSuggestionPhrases([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // load suggestions khi language đổi
  useEffect(() => {
    if (selectedLanguage) loadSuggestions(selectedLanguage);
  }, [selectedLanguage]);

  // ===== Submit =====
  const isSubmittingRef = useRef(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      if ([1, 2].includes(formData.questionTypeId) && options.length === 0) {
        toast.error('Câu hỏi trắc nghiệm cần ít nhất 1 phương án!', { autoClose: 1200 });
        return;
      }
      if ([1, 2].includes(formData.questionTypeId) && !options.some((o) => o.correct)) {
        toast.error('Phải chọn ít nhất 1 đáp án đúng!', { autoClose: 1200 });
        return;
      }
      if (formData.questionTypeId === 4 && answers.length === 0) {
        toast.error('Bạn cần nhập ít nhất 1 câu trả lời!', { autoClose: 1200 });
        return;
      }
      if (
        formData.questionTypeId === 1004 &&
        (!matchingData.pairs || matchingData.pairs.length < 2)
      ) {
        toast.error('Câu hỏi ghép cặp cần ít nhất 2 cặp!', { autoClose: 1200 });
        return;
      }
      if (
        formData.questionTypeId === 3 &&
        (!wordOrderData.words || wordOrderData.words.length < 3)
      ) {
        toast.error('Câu hỏi sắp xếp từ cần ít nhất 3 từ!', { autoClose: 1200 });
        return;
      }

      const filteredOptions = options.filter((opt, idx, arr) => {
        const key = `${opt.optionText.trim().toLowerCase()}|${opt.position}`;
        return arr.findIndex(
          (o) =>
            `${o.optionText.trim().toLowerCase()}|${o.position}` === key
        ) === idx;
      });

      let finalOptions = filteredOptions;

      // Matching → chuyển cặp thành options
      if (
        formData.questionTypeId === 1004 &&
        matchingData?.pairs &&
        Array.isArray(matchingData.pairs) &&
        matchingData.pairs.length > 0
      ) {
        finalOptions = matchingData.pairs.map((pair: any, i: number) => ({
          optionText: `${pair.leftItem} → ${pair.rightItem}`,
          correct: true,
          position: i + 1,
          ...(initialData?.id ? { questionId: initialData.id } : {}),
        }));
      }

      // Word order → mỗi từ là option, đáp án đúng là thứ tự
      if (
        formData.questionTypeId === 3 &&
        wordOrderData?.words &&
        Array.isArray(wordOrderData.words) &&
        wordOrderData.words.length > 0
      ) {
        finalOptions = wordOrderData.words.map((word: string, i: number) => ({
          optionText: word,
          correct: true,
          position: i + 1,
          ...(initialData?.id ? { questionId: initialData.id } : {}),
        }));

        // Build answers as correct sequence with positions 1..N
        const seq: number[] = Array.isArray(wordOrderData.correctOrder)
          ? wordOrderData.correctOrder
          : wordOrderData.words.map((_, idx) => idx);
        const seqAnswers: AnswerCreateDto[] = seq.map((wordIdx, i) => ({
          answerText: wordOrderData.words[wordIdx] ?? '',
          caseSensitive: false,
          position: i + 1,
          ...(initialData?.id ? { questionId: initialData.id } : {}),
        }));
        while (answers.length) answers.pop();
        seqAnswers.forEach(a => answers.push(a));
      }

      // Fill in the blank (1002): map blanks to answers in order
      if (
        formData.questionTypeId === 1002 &&
        Array.isArray(fillInTheBlankData?.correctAnswer?.blanks)
      ) {
        const blanks: string[] = fillInTheBlankData.correctAnswer.blanks;
        const blankAnswers: AnswerCreateDto[] = blanks.map((txt: string, i: number) => ({
          answerText: txt ?? '',
          caseSensitive: false,
          position: i + 1,
          ...(initialData?.id ? { questionId: initialData.id } : {}),
        }));
        while (answers.length) answers.pop();
        blankAnswers.forEach(a => answers.push(a));
      }

      const dto = new QuestionDto({
        ...(initialData?.id ? { id: initialData.id } : {}),
        questionText: formData.questionText,
        questionTypeId: formData.questionTypeId,
        lessonId: formData.lessonId,
        difficulty: formData.difficulty,
        points: formData.points,
        ipa: formData.ipa,
        hint: formData.hint,
        explanation: formData.explanation,
        options: finalOptions.map((o, i) => ({
          ...(o as any).id ? { id: (o as any).id } : {},
          optionText: o.optionText,
          correct: o.correct,
          position: i + 1,
          imageUrl: (o as any).imageUrl,
          ...(initialData?.id ? { questionId: initialData.id } : {}),
        })),
        answers:
          [4, 3, 1002, 1006].includes(formData.questionTypeId)
            ? answers.map((a, i) => ({
                ...(a as any).id ? { id: (a as any).id } : {},
                answerText: a.answerText,
                caseSensitive: a.caseSensitive,
                position: i + 1,
                ...(initialData?.id ? { questionId: initialData.id } : {}),
              }))
            : [],
      });

      const uiQuestion = mapQuestionDtoToUIQuestion(dto);
      onSubmit(uiQuestion);
    } catch (err) {
      console.error('Submit lỗi:', err);
      toast.error('Có lỗi xảy ra khi gửi câu hỏi.', { autoClose: 1200 });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  // ===== Suggest modal =====
  const [suggestOpen, setSuggestOpen] = useState<{ type: 'answer' | 'option'; index?: number } | null>(null);

  const handleWordSuggestion = (item: any, optionIndex?: number) => {
    if (formData.questionTypeId === 4) {
      if (answers.length === 0) addAnswer();
      handleAnswerChange(0, 'answerText', item.text);
      if (!formData.ipa && item.ipa) setFormData((prev) => ({ ...prev, ipa: item.ipa }));
    } else if (typeof optionIndex === 'number') {
      handleOptionChange(optionIndex, 'optionText', item.text);
    }
    setSuggestOpen(null);
  };

  return (
    <form
      className="w-full max-w-[1200px] min-w-[960px] mx-auto bg-white rounded-2xl shadow-2xl p-10 space-y-6"
      onSubmit={handleSubmit}
    >
      {/* Question Type */}
      <div className="mb-2">
        <Label className="text-base font-semibold mb-1 block">Question Type</Label>
        <Select
          value={String(formData.questionTypeId || '')}
          onValueChange={(val) => setFormData({ ...formData, questionTypeId: parseInt(val, 10) })}
        >
          <SelectTrigger className="rounded-xl border-2 border-gray-200 h-12 text-base">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {Array.isArray(questionTypes) &&
              questionTypes
                .filter((qt) => Number.isInteger(qt?.id))
                .map((qt) => (
                  <SelectItem key={qt.id} value={String(qt.id)}>
                    {qt.description}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </div>

      {/* Question Content */}
      <div className="mb-2">
        <Label className="text-base font-semibold mb-1 block">Question Content</Label>
        <Textarea
          value={formData.questionText}
          onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
          className="rounded-xl border-2 border-gray-200 h-20 text-base"
          placeholder="Enter your question here... (Markdown supported: **bold**, *italic*, [link](url))"
          required
        />
        <div className="flex gap-3 mt-3">
          <Button_admin type="button" className="flex-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700">
            Upload Image
          </Button_admin>
          <Button_admin type="button" className="flex-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700">
            Upload Audio
          </Button_admin>
          <Button_admin type="button" className="flex-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700">
            Test TTS
          </Button_admin>
        </div>
      </div>

      {/* IPA */}
      <div className="mb-2">
        <Label className="text-base font-semibold mb-1 block">IPA Pronunciation (Optional)</Label>
        <Input_admin
          value={formData.ipa || ''}
          onChange={(e) => setFormData({ ...formData, ipa: e.target.value })}
          className="rounded-xl border-2 border-gray-200 h-12 text-base"
          placeholder="e.g. /həˈloʊ/"
        />
      </div>

      {/* Language */}
      <div className="mb-2">
        <Label className="text-base font-semibold mb-1 block">Language</Label>
        <Select
          value={selectedLanguage}
          onValueChange={(val) => setSelectedLanguage(val)}
        >
          <SelectTrigger className="rounded-xl border-2 border-gray-200 h-12 text-base">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {Array.isArray(languages) &&
              languages
                .filter((lg) => !!lg?.code)
                .map((lg) => (
                  <SelectItem key={lg.code} value={lg.code}>
                    {lg.name}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </div>

      {/* Module / Difficulty / Points */}
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div>
          <Label className="text-base font-semibold mb-1 block">Module</Label>
          <Select
            value={formData.moduleId ? String(formData.moduleId) : ''}
            onValueChange={async (val) => {
              const moduleId = parseInt(val, 10);
              setFormData((prev) => ({ ...prev, moduleId, lessonId: 0 }));
              onModuleChange(moduleId); // giữ tương thích bên ngoài
              try {
                const ls = await fetchLessonsByModule(moduleId);
                const arr = Array.isArray(ls) ? ls : [];
                setLocalLessons(arr);
                setFormData((prev) => ({
                  ...prev,
                  lessonId: arr.length > 0 ? (arr[0].id as number) : 0,
                }));
              } catch {
                setLocalLessons([]);
                setFormData((prev) => ({ ...prev, lessonId: 0 }));
              }
            }}
          >
            <SelectTrigger className="rounded-xl border-2 border-gray-200 h-12 text-base">
              <SelectValue placeholder="Select a module" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Array.isArray(localModules) && localModules.length > 0 ? (
                localModules
                  .filter((m) => Number.isInteger(m?.id))
                  .map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.name}
                    </SelectItem>
                  ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">No modules available</div>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-semibold mb-1 block">Difficulty</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(val) => setFormData({ ...formData, difficulty: val as any })}
          >
            <SelectTrigger className="rounded-xl border-2 border-gray-200 h-12 text-base">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-semibold mb-1 block">Points</Label>
          <Input_admin
            type="number"
            value={formData.points}
            onChange={(e) =>
              setFormData({ ...formData, points: parseInt(e.target.value || '0', 10) || 0 })
            }
            className="rounded-xl border-2 border-gray-200 h-12 text-base"
          />
        </div>
      </div>

      {/* Part (Lesson) */}
      <div className="mb-2">
        <Label className="text-base font-semibold mb-1 block">Part</Label>
        <Select
          value={formData.lessonId ? String(formData.lessonId) : ''}
          onValueChange={(val) => setFormData({ ...formData, lessonId: parseInt(val, 10) })}
          disabled={!formData.moduleId}
        >
          <SelectTrigger className="rounded-xl border-2 border-gray-200 h-12 text-base">
            <SelectValue placeholder="Select a part" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {Array.isArray(localLessons) && localLessons.length > 0 ? (
              localLessons
                .filter((l) => Number.isInteger(l?.id))
                .map((l) => (
                  <SelectItem key={l.id} value={String(l.id)}>
                    {l.name}
                  </SelectItem>
                ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">No parts available</div>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Editors */}
      {formData.questionTypeId === 4 ? (
        <div className="mb-2">
          <Label className="text-base font-semibold mb-1 block">Correct Answer</Label>
          <div className="flex gap-3">
            <Input_admin
              value={answers[0]?.answerText || ''}
              onChange={(e) => {
                const val = e.target.value;
                if (answers.length === 0) addAnswer();
                handleAnswerChange(0, 'answerText', val);
              }}
              className="flex-1 rounded-xl border-2 border-gray-200 h-12 text-base"
              placeholder="Enter the correct answer..."
            />
            <button
              type="button"
              className="rounded-xl border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 px-4 py-2 text-sm font-semibold flex items-center gap-1"
              onClick={() => setSuggestOpen({ type: 'answer' })}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Suggest
            </button>
          </div>
        </div>
      ) : formData.questionTypeId === 1002 ? (
        <FillInTheBlankEditor data={fillInTheBlankData} onChange={setFillInTheBlankData} />
      ) : formData.questionTypeId === 1003 ? (
        <SpeakingEditor data={speakingData} onChange={setSpeakingData} />
      ) : formData.questionTypeId === 1004 ? (
        <MatchingEditor data={matchingData} onChange={setMatchingData} />
      ) : formData.questionTypeId === 3 ? (
        <WordOrderEditor data={wordOrderData} onChange={setWordOrderData} />
      ) : formData.questionTypeId === 1005 ? (
        <ImageChoiceEditor
          options={options}
          onAddOption={addOption}
          onRemoveOption={removeOption}
          onChangeOption={handleOptionChange}
          onOpenSuggest={(i) => setSuggestOpen({ type: 'option', index: i })}
        />
      ) : formData.questionTypeId === 1006 ? (
        <ListeningInputEditor
          answers={answers}
          onAnswersChange={setAnswers}
          audioUrl={initialData?.audioUrl}
          onAudioChange={(file, url) => {
            setSpeakingData((prev: any) => ({ ...prev, audioFile: file, audioUrl: url }));
          }}
        />
      ) : (
        <MultipleChoiceEditor
          options={options}
          onAddOption={addOption}
          onRemoveOption={removeOption}
          onChangeOption={handleOptionChange}
          onOpenSuggest={(i) => setSuggestOpen({ type: 'option', index: i })}
        />
      )}

      {/* Hint & Explanation */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <Label className="text-base font-semibold mb-1 block">Hint (Optional)</Label>
          <Textarea
            value={formData.hint || ''}
            onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
            className="rounded-xl border-2 border-gray-200 h-12 text-base"
            placeholder="Provide a helpful hint..."
          />
        </div>
        <div>
          <Label className="text-base font-semibold mb-1 block">Explanation (Optional)</Label>
          <Textarea
            value={formData.explanation || ''}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            className="rounded-xl border-2 border-gray-200 h-12 text-base"
            placeholder="Explain why this is the correct answer..."
          />
        </div>
      </div>

      {/* Preview & Submit */}
      <div className="flex justify-between mt-6 gap-4">
        <Button_admin
          type="button"
          className="rounded-xl border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 flex-1 h-12 text-base font-semibold"
        >
          Preview Question
        </Button_admin>
        <Button_admin
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white flex-1 h-12 text-base font-semibold hover:from-blue-600 hover:to-green-600"
        >
          {initialData ? 'Update Question' : 'Create Question'}
        </Button_admin>
      </div>

      {/* Modal WordSuggestion */}
      {suggestOpen && (
        <Dialog open={!!suggestOpen} onOpenChange={(open) => !open && setSuggestOpen(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] rounded-3xl">
            <div className="text-lg font-bold mb-2">Suggestions</div>
            <WordSuggestion
              units={suggestionUnits}
              phrases={suggestionPhrases}
              onSelect={(item) =>
                suggestOpen.type === 'answer'
                  ? handleWordSuggestion(item)
                  : handleWordSuggestion(item, suggestOpen.index)
              }
            />
          </DialogContent>
        </Dialog>
      )}
    </form>
  );
};

export default QuestionForm;

