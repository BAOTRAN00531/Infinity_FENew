// src/components/inmutable-components/CRUD/form/QuestionForm.tsx
import React, { useEffect, useState, FormEvent, useRef } from 'react';
import {
    OptionCreateDto,
    AnswerCreateDto,
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
// REMOVED: import { mapQuestionDtoToUIQuestion } from '@/api/index';
import WordSuggestion from '@/pages/Management/WordSuggestion';
import { BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/reuseables/Management/build/dialog';
import api from '@/api/api';
// REMOVED: import { specialQuestionApi } from '@/api/specialQuestionApi';
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

// ADD: unified question API
import { createQuestion as createQ, updateQuestion as updateQ } from '@/api/Management/questionAdmin';
import {AxiosResponse} from "axios";

interface QuestionFormProps {
    initialData?: UIQuestion;
    modules: ModuleLite[]; // vẫn giữ để tương thích, nhưng ta dùng state cục bộ
    lessons: Lesson[];     // vẫn giữ để tương thích, nhưng ta dùng state cục bộ
    onModuleChange: (moduleId: number) => void;
    onSubmit: (question: AxiosResponse<any>) => void;
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

    // Question form
    const [formData, setFormData] = useState<FormState>({
        questionText: initialData?.questionText ?? '',
        questionTypeId: initialData?.questionTypeId ?? 1,
        difficulty: (initialData?.difficulty as 'easy' | 'medium' | 'hard') ?? 'easy',
        points: initialData?.points ?? 10,
        moduleId: initialData?.moduleId ?? 0,
        lessonId: initialData?.lessonId ?? 0,
        ipa: initialData?.ipa ?? '',
        hint: initialData?.hint ?? '',
        explanation: initialData?.explanation ?? '',
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

    const [listeningData, setListeningData] = useState<any>({
        ttsText: '', // Text riêng cho TTS
        languageCode: 'en-US',
        voice: 'en-US-Neural2-A',
        speed: 1.0,
        pitch: 0,
        audioUrl: undefined,
        audioFile: undefined,
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
                setLanguages([]);
                setSelectedLanguage('en-US');
                toast.error('Không thể tải danh sách ngôn ngữ', { autoClose: 1200 });
            }
        };
        loadLanguages();
    }, []); // once

    // ===== Khi initialData đổi: sync form & word order =====
    useEffect(() => {
        if (!initialData) return;
        
        // Debug: Log initialData để kiểm tra payload
        console.log('🔍 Loading question data:', {
            id: initialData.id,
            questionTypeId: initialData.questionTypeId,
            payload: (initialData as any).payload,
            audioUrl: initialData.audioUrl
        });
        setFormData({
            questionText: initialData.questionText ?? '',
            questionTypeId: initialData.questionTypeId ?? 1,
            difficulty: (initialData.difficulty as 'easy' | 'medium' | 'hard') ?? 'easy',
            points: initialData.points ?? 10,
            moduleId: initialData.moduleId ?? 0,
            lessonId: initialData.lessonId ?? 0,
            ipa: (initialData as any).ipa ?? '',
            hint: (initialData as any).hint ?? '',
            explanation: (initialData as any).explanation ?? '',
        });

        // Load Word Order data (Type 3)
        if (
            initialData.questionTypeId === 3 &&
            Array.isArray(initialData.options)
        ) {
            const words = initialData.options.map((opt) => opt.optionText || '');
            let correctOrder: string[] = [];
            if (
                (initialData as any).answers &&
                (initialData as any).answers.length > 0 &&
                (initialData as any).answers[0].answerText
            ) {
                correctOrder = (initialData as any).answers[0].answerText.split(' ');
            } else {
                correctOrder = [...words];
            }
            setWordOrderData({ words, correctOrder });
        }

        // Load Fill in the Blank data (Type 5)
        if (initialData.questionTypeId === 5) {
            const fillInData = (initialData as any).payload || {};
            setFillInTheBlankData({
                template: fillInData.template || initialData.questionText || '',
                correctAnswers: fillInData.blanks?.map((b: any) => b.answers?.[0] || '') || [],
                caseInsensitive: fillInData.caseInsensitive ?? true,
                trimWhitespace: fillInData.trimWhitespace ?? true,
                acceptSynonyms: fillInData.acceptSynonyms ?? false,
            });
        }

        // Load Speaking data (Type 6)
        if (initialData.questionTypeId === 6) {
            const speakingPayload = (initialData as any).payload || {};
            setSpeakingData({
                targetSentence: speakingPayload.reference_text || initialData.questionText || '',
                languageCode: speakingPayload.languageCode || 'en-US',
                audioUrl: initialData.audioUrl,
                audioFile: undefined,
                pronunciationTips: speakingPayload.pronunciationTips || '',
                difficulty: initialData.difficulty || 'easy',
                timeLimit: speakingPayload.maxDurationSec || 15,
            });
        }

        // Load Matching data (Type 7)
        if (initialData.questionTypeId === 7) {
            const matchingPayload = (initialData as any).payload || {};
            const pairs = matchingPayload.left?.map((left: any, index: number) => ({
                leftItem: left.text || '',
                rightItem: matchingPayload.right?.[index]?.text || '',
            })) || [];
            setMatchingData({
                pairs,
                instructions: matchingPayload.instructions || '',
                shuffleOptions: matchingPayload.shuffleOptions ?? false,
            });
        }

        // Load Listening data (Type 9)
        if (initialData.questionTypeId === 9) {
            const listeningPayload = (initialData as any).payload || {};
            setListeningData({
                ttsText: listeningPayload.tts_text || initialData.questionText || '',
                languageCode: listeningPayload.voice?.languageCode || 'en-US',
                voice: listeningPayload.voice?.voice || 'en-US-Neural2-A',
                speed: listeningPayload.voice?.speed || 1.0,
                pitch: listeningPayload.voice?.pitch || 0,
                audioUrl: initialData.audioUrl,
                audioFile: undefined,
            });
        }

        // Load options data (for single choice questions)
        if (initialData.questionTypeId === 1 || initialData.questionTypeId === 8) {
            const optionsData = (initialData as any).options || [];
            setOptions(optionsData.map((opt: any) => ({
                id: opt.id,
                optionText: opt.contentText || opt.optionText || '',
                correct: opt.isCorrect || false,
                position: opt.orderIndex || opt.position || 1,
                imageUrl: opt.imageUrl || ''
            })));
        }

        // Load answers data (for text input, listening, etc.)
        if (initialData.questionTypeId === 4 || initialData.questionTypeId === 9) {
            const answersData = (initialData as any).answers || [];
            setAnswers(answersData.map((ans: any) => ({
                id: ans.id,
                answerText: ans.answerText || ans.contentText || '',
                correct: ans.isCorrect || true,
                position: ans.orderIndex || ans.position || 1
            })));
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
        const FALLBACK_QT: QuestionType[] = [
            { id: 1, code: 'single_choice', description: 'Multiple Choice' },
            { id: 3, code: 'word_order', description: 'Word Order' },
            { id: 4, code: 'text_input', description: 'Text Input' },
            { id: 5, code: 'fill_in_blank', description: 'Fill in the blank' },
            { id: 6, code: 'speaking', description: 'Speaking' },
            { id: 7, code: 'matching', description: 'Matching' },
            { id: 8, code: 'image_choice', description: 'Image choice' },
            { id: 9, code: 'listening', description: 'Listening' },
        ];

        const fetchQuestionTypes = async () => {
            try {
                const res = await api.get('/test/question-types'); // Sửa endpoint để khớp với backend
                const data = Array.isArray(res.data) ? res.data : res.data?.result;
                if (!Array.isArray(data)) throw new Error('bad payload');
                setQuestionTypes(data);
            } catch {
                setQuestionTypes(FALLBACK_QT);
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
        }
    };

    // load suggestions khi language đổi
    useEffect(() => {
        if (selectedLanguage) loadSuggestions(selectedLanguage);
    }, [selectedLanguage]);

    // ====== ADD: map typeId -> type name & build payload ======
    type QType =
        | 'single_choice' | 'single_choice_image'
        | 'reorder_words' | 'text_input' | 'fill_in_blank'
        | 'matching' | 'listening' | 'speaking';

    const idToType = (id: number): QType => {
        switch (id) {
            case 1: return 'single_choice';
            case 3: return 'reorder_words';
            case 4: return 'text_input';
            case 5: return 'fill_in_blank';
            case 6: return 'speaking';
            case 7: return 'matching';
            case 8: return 'single_choice';
            case 9: return 'listening';
            default: return 'single_choice';
        }
    };

    const buildUIQuestion = (): any => {
        const difficultyUpper = (formData.difficulty || 'easy').toUpperCase();
        const type = idToType(formData.questionTypeId);
        const actorUserId = Number(localStorage.getItem('userId') || '1');

        const normalizedOptions = (type === 'single_choice' || formData.questionTypeId === 8)
            ? options.map((o, i) => ({
                contentText: o.optionText || '',
                isCorrect: !!o.correct,
                orderIndex: i + 1,
                imageUrl: (o as any).imageUrl || undefined,
            }))
            : [];

        let payload: any = undefined;

        if (type === 'reorder_words') {
            const seq = Array.isArray(wordOrderData.correctOrder)
                ? wordOrderData.correctOrder
                : (wordOrderData.words || []).map((_: string, idx: number) => idx);
            payload = {
                tokens: wordOrderData.words || [], // Backend yêu cầu 'tokens' thay vì 'words'
                answer: seq.map((idx: number) => wordOrderData.words?.[idx] ?? ''), // Backend yêu cầu 'answer' thay vì 'correct'
                caseSensitive: false,
                allowPunctuation: true,
            };
        }

        if (type === 'text_input') {
            const accepted = (answers || [])
                .map(a => (a.answerText || '').trim())
                .filter(Boolean);
            payload = {
                accepted: Array.from(new Set(accepted)), // Backend yêu cầu 'accepted' thay vì 'expected'
                minLength: 1,
                maxLength: 200,
                caseInsensitive: true,
                stripPunctuation: true,
            };
        }

        if (type === 'fill_in_blank') {
            const blanksArr: string[] = fillInTheBlankData?.correctAnswer?.blanks || [];
            const template = fillInTheBlankData?.template || formData.questionText || '';
            payload = {
                template: template, // Backend yêu cầu 'template'
                blanks: blanksArr.map((txt: string, i: number) => ({ index: i + 1, answers: [txt] })),
                caseInsensitive: true,
                trimWhitespace: true,
                acceptSynonyms: false,
            };
        }

        if (type === 'matching') {
            const pairs: any[] = Array.isArray(matchingData?.pairs) ? matchingData.pairs : [];
            const left = pairs.map((p, i) => ({ id: `L${i+1}`, text: p.leftItem || '' }));
            const right = pairs.map((p, i) => ({ id: `R${i+1}`, text: p.rightItem || '' }));
            const answerKey = Object.fromEntries(pairs.map((_: any, i: number) => [`L${i+1}`, `R${i+1}`]));
            payload = { 
                left, 
                right, 
                pairs: answerKey // Backend yêu cầu 'pairs' thay vì 'answerKey'
            };
        }

        if (type === 'listening') {
            // Sử dụng listeningData.ttsText nếu có, nếu không thì dùng questionText
            const ttsText = listeningData?.ttsText || formData.questionText || '';
            payload = {
                tts_text: ttsText, // Backend yêu cầu 'tts_text' thay vì 'tts.text'
                voice: { 
                    languageCode: listeningData?.languageCode || 'en-US', 
                    voice: listeningData?.voice || 'en-US-Neural2-A', 
                    speed: listeningData?.speed || 1.0, 
                    pitch: listeningData?.pitch || 0, 
                    encoding: 'MP3' 
                },
                answer: answers?.[0]?.answerText || '',
                generateAudioOnCreate: true,
            };
        }

        if (type === 'speaking') {
            payload = {
                prompt: 'Please read the sentence clearly.',
                reference_text: speakingData?.targetSentence || formData.questionText || '', // Backend yêu cầu 'reference_text' thay vì 'referenceText'
                languageCode: speakingData?.languageCode || 'en-US',
                maxDurationSec: speakingData?.timeLimit || 15,
                scoring: {
                    mode: 'pronunciation',
                    rubricId: 1,
                    ai: { enabled: true, model: 'gpt-4o-mini', threshold: 0.75 },
                },
            };
        }

        const ui: any = {
            id: (initialData as any)?.id,
            lessonId: formData.lessonId || 1,
            questionTypeId: formData.questionTypeId || 1,
            type,
            actorUserId,
            questionText: formData.questionText || '',
            difficulty: difficultyUpper,
            points: formData.points || 0,
            options: normalizedOptions,
            payload,
        };

        return ui;
    };

    // ===== Submit =====
    const isSubmittingRef = useRef(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        
        console.log('🚀 Starting form submission...');

        try {
            // Validate tối thiểu
            if (!formData.lessonId) { toast.error('Chưa chọn Part/Lesson'); return; }
            if (!formData.questionText?.trim()) { toast.error('Chưa nhập nội dung câu hỏi'); return; }
            if ([1, 8].includes(formData.questionTypeId)) {
                if (!options?.length) { toast.error('Cần ít nhất 1 lựa chọn'); return; }
                if (!options.some(o => o.correct)) { toast.error('Phải có 1 đáp án đúng'); return; }
            }
            if (formData.questionTypeId === 3 && (!wordOrderData.words || wordOrderData.words.length < 3)) {
                toast.error('Sắp xếp từ cần ≥ 3 từ'); return;
            }
            if (formData.questionTypeId === 5 && (!fillInTheBlankData?.correctAnswer?.blanks?.length)) {
                toast.error('Điền chỗ trống cần ≥ 1 blank'); return;
            }
            if (formData.questionTypeId === 6 && !(speakingData?.targetSentence || '').trim()) {
                toast.error('Luyện nói cần câu mục tiêu'); return;
            }

            const uiQuestion = buildUIQuestion();
            console.log('🚀 Payload to send:', JSON.stringify(uiQuestion, null, 2));
            console.log('🚀 Form data:', formData);
            console.log('🚀 Options:', options);
            const isEdit = !!(initialData as any)?.id;
            const res = isEdit
                ? await updateQ((initialData as any).id as number, uiQuestion)
                : await createQ(uiQuestion);

            toast.success(isEdit ? 'Cập nhật câu hỏi thành công!' : 'Tạo câu hỏi thành công!', { autoClose: 1200 });
            onSubmit?.(res);

        } catch (err: any) {
            console.error('Submit lỗi:', err);
            console.error('Error response:', err?.response?.data);
            console.error('Error status:', err?.response?.status);
            toast.error(err?.response?.data?.message || 'Có lỗi xảy ra khi gửi câu hỏi.', { autoClose: 1500 });
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
                    value={String(formData.questionTypeId ?? '')}
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
                    value={formData.questionText ?? ''}
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
                    value={formData.ipa ?? ''}
                    onChange={(e) => setFormData({ ...formData, ipa: e.target.value })}
                    className="rounded-xl border-2 border-gray-200 h-12 text-base"
                    placeholder="e.g. /həˈloʊ/"
                />
            </div>

            {/* Language */}
            <div className="mb-2">
                <Label className="text-base font-semibold mb-1 block">Language</Label>
                <Select
                    value={selectedLanguage ?? ''}
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
                        value={formData.moduleId != null ? String(formData.moduleId) : ''}
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
                        value={formData.difficulty ?? 'easy'}
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
                        value={formData.points ?? 0}
                        onChange={(e) =>
                            setFormData({ ...formData, points: parseInt(e.target.value ?? '0', 10) || 0 })
                        }
                        className="rounded-xl border-2 border-gray-200 h-12 text-base"
                    />
                </div>
            </div>

            {/* Part (Lesson) */}
            <div className="mb-2">
                <Label className="text-base font-semibold mb-1 block">Part</Label>
                <Select
                    value={formData.lessonId != null ? String(formData.lessonId) : ''}
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

            {/* Editors - Hiển thị editor dựa trên question type */}
            {(() => {
                const questionTypeId = formData.questionTypeId;

                // Text Input (Type 4) - Nhập câu trả lời từ bàn phím
                if (questionTypeId === 4) {
                    return (
                        <div className="mb-2">
                            <Label className="text-base font-semibold mb-1 block">Correct Answer</Label>
                            <div className="flex gap-3">
                                <Input_admin
                                    value={answers[0]?.answerText ?? ''}
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
                    );
                }

                // Fill in the Blank (Type 5) - Điền vào chỗ trống
                if (questionTypeId === 5) {
                    return <FillInTheBlankEditor data={fillInTheBlankData} onChange={setFillInTheBlankData} />;
                }

                // Speaking (Type 6) - Luyện nói
                if (questionTypeId === 6) {
                    return <SpeakingEditor data={speakingData} onChange={setSpeakingData} />;
                }

                // Matching (Type 7) - Ghép cặp
                if (questionTypeId === 7) {
                    return <MatchingEditor data={matchingData} onChange={setMatchingData} />;
                }

                // Word Order (Type 3) - Sắp xếp từ thành câu đúng
                if (questionTypeId === 3) {
                    return <WordOrderEditor initialData={wordOrderData} onChange={setWordOrderData} />;
                }

                // Image Choice (Type 8) - Câu hỏi trắc nghiệm hình
                if (questionTypeId === 8) {
                    return (
                        <ImageChoiceEditor
                            options={options}
                            onAddOption={addOption}
                            onRemoveOption={removeOption}
                            onChangeOption={handleOptionChange}
                            onOpenSuggest={(i) => setSuggestOpen({ type: 'option', index: i })}
                        />
                    );
                }

                // Listening (Type 9) - Luyện nghe
                if (questionTypeId === 9) {
                    return (
                        <ListeningInputEditor
                            answers={answers}
                            onAnswersChange={setAnswers}
                            audioUrl={listeningData?.audioUrl}
                            onAudioChange={(file, url) => {
                                setListeningData((prev: any) => ({ ...prev, audioFile: file, audioUrl: url }));
                            }}
                            listeningData={listeningData}
                            onListeningDataChange={setListeningData}
                        />
                    );
                }

                // Multiple Choice (Type 1) - Câu hỏi trắc nghiệm - 1 đáp án đúng (default)
                return (
                    <MultipleChoiceEditor
                        options={options}
                        onAddOption={addOption}
                        onRemoveOption={removeOption}
                        onChangeOption={handleOptionChange}
                        onOpenSuggest={(i) => setSuggestOpen({ type: 'option', index: i })}
                    />
                );
            })()}

            {/* Hint & Explanation */}
            <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                    <Label className="text-base font-semibold mb-1 block">Hint (Optional)</Label>
                    <Textarea
                        value={formData.hint ?? ''}
                        onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                        className="rounded-xl border-2 border-gray-200 h-12 text-base"
                        placeholder="Provide a helpful hint..."
                    />
                </div>
                <div>
                    <Label className="text-base font-semibold mb-1 block">Explanation (Optional)</Label>
                    <Textarea
                        value={formData.explanation ?? ''}
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
                        <DialogTitle className="text-lg font-bold mb-2">Suggestions</DialogTitle>
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
