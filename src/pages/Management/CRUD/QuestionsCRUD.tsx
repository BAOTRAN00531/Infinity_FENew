// file QuestionsCRUD.tsx

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button_admin } from '@/components/reuseables/Management/build/button_admin';
import { Input } from '@/components/reuseables/Management/build/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/reuseables/Management/build/dialog';
import { Badge } from '@/components/reuseables/Management/build/badge';
import QuestionForm from '@/pages/Management/Form/QuestionForm';
import QuestionDetails from '@/pages/Management/Detail/QuestionDetails';
import DeleteConfirmation from '@/pages/Management/DeleteConfirmation';

// ❗️Không import create/update nữa – form sẽ gọi API và trả AxiosResponse
import {
    fetchModules,
    fetchLessonsByModule,
    fetchQuestionsByLesson,
    deleteQuestion,
    fetchModulesByLanguage,
    ModuleLite,
} from '@/api/Management/adminQuestionApi';

import { fetchLanguages } from '@/api/languageService';
import { Lesson, UIQuestion, QUESTION_TYPE_MAP } from '@/api/types';
import { mapQuestionResponseToUIQuestion } from '@/api/index';
import type { AxiosResponse } from 'axios';

export const QUESTION_TYPE_DESCRIPTION_TO_ID: Record<string, number> =
    Object.entries(QUESTION_TYPE_MAP).reduce((acc, [id, desc]) => {
        acc[desc] = parseInt(id);
        return acc;
    }, {} as Record<string, number>);

const QuestionsCRUD = () => {
    const [modules, setModules] = useState<ModuleLite[]>([]);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [languages, setLanguages] = useState<{ code: string; name: string }[]>(
        []
    );
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
    const [questions, setQuestions] = useState<UIQuestion[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<UIQuestion | null>(
        null
    );

    useEffect(() => {
        fetchLanguages()
            .then(setLanguages)
            .catch(() => toast.error('Không thể tải ngôn ngữ', { autoClose: 1200 }));

        fetchModules()
            .then(setModules)
            .catch(() => toast.error('Không thể tải courses', { autoClose: 1200 }));
    }, []);

    const handleLanguageSelect = async (languageCode: string) => {
        try {
            setSelectedLanguage(languageCode);
            const mods = await fetchModulesByLanguage(languageCode);
            setModules(mods);
            setSelectedModule(null);
            setLessons([]);
            setSelectedLesson(null);
            setQuestions([]);
        } catch {
            toast.error('Không thể tải courses theo ngôn ngữ', { autoClose: 1200 });
        }
    };

    const handleModuleSelect = async (moduleId: number) => {
        try {
            const ls = await fetchLessonsByModule(moduleId);
            setLessons(ls);
            setSelectedModule(moduleId);
            setSelectedLesson(null);
            setQuestions([]);
        } catch {
            toast.error('Không thể tải danh sách bài học', { autoClose: 1200 });
        }
    };

    const refreshQuestions = async (lessonId: number) => {
        const qs = await fetchQuestionsByLesson(lessonId);
        const mapped = qs.map(mapQuestionResponseToUIQuestion);
        setQuestions(mapped);
    };

    const handleLessonSelect = async (lessonId: number) => {
        setSelectedLesson(lessonId);
        await refreshQuestions(lessonId);
    };

    // ✅ giờ 2 handler nhận AxiosResponse từ Form
    const handleCreate = async (_res: AxiosResponse<any>) => {
        if (selectedLesson) await refreshQuestions(selectedLesson);
        setIsCreateOpen(false);
    };

    const handleUpdate = async (_res: AxiosResponse<any>) => {
        if (selectedLesson) await refreshQuestions(selectedLesson);
        setIsEditOpen(false);
    };

    const handleDelete = async () => {
        if (!selectedQuestion?.id) return;
        await deleteQuestion(selectedQuestion.id);
        if (selectedLesson) await refreshQuestions(selectedLesson);
        setIsDeleteOpen(false);
    };

    const getDiffColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-green-100 text-green-700';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700';
            case 'hard':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const filtered = selectedLesson
        ? questions.filter((q) =>
            q.questionText.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl">
                        <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-800">
                            Questions Management
                        </h2>
                        <p className="text-gray-600">Create and manage quiz questions</p>
                    </div>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button_admin className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl shadow-lg">
                            <Plus className="w-5 h-5 mr-2" /> Add Question
                        </Button_admin>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw] max-w-[1280px] max-h-[85vh] rounded-3xl overflow-y-auto overflow-x-auto !left-1/2 !-translate-x-1/2">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                Create New Question
                            </DialogTitle>
                        </DialogHeader>
                        <QuestionForm
                            modules={modules}
                            lessons={lessons}
                            onModuleChange={handleModuleSelect}
                            onSubmit={handleCreate}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Language */}
                <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageSelect(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="">Chọn Ngôn ngữ</option>
                    {languages.map((lg) => (
                        <option key={lg.code} value={lg.code}>
                            {lg.name}
                        </option>
                    ))}
                </select>

                {/* Module */}
                <select
                    value={selectedModule ?? ''}
                    onChange={(e) => {
                        const id = Number(e.target.value);
                        if (!Number.isFinite(id)) return; // tránh NaN
                        handleModuleSelect(id);
                    }}
                    className="px-4 py-2 border rounded-lg"
                    disabled={!selectedLanguage}
                >
                    <option value="" disabled>
                        Chọn Courses
                    </option>
                    {modules.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
                    ))}
                </select>

                {/* Lesson */}
                <select
                    value={selectedLesson ?? ''}
                    onChange={(e) => {
                        const id = Number(e.target.value);
                        if (!Number.isFinite(id)) return; // tránh NaN
                        handleLessonSelect(id);
                    }}
                    className="px-4 py-2 border rounded-lg"
                    disabled={!selectedModule}
                >
                    <option value="" disabled>
                        Chọn Lesson
                    </option>
                    {lessons.map((l) => (
                        <option key={l.id} value={l.id}>
                            {l.name}
                        </option>
                    ))}
                </select>

                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-auto max-w-sm"
                />
            </div>

            {/* List */}
            {selectedLesson ? (
                filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtered.map((q) => (
                            <div
                                key={q.id}
                                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge className="text-xs bg-blue-100 text-blue-800">
                                        {QUESTION_TYPE_MAP[q.questionTypeId] ?? 'Unknown'}
                                    </Badge>
                                    <Badge className={`text-xs ${getDiffColor(q.difficulty)}`}>
                                        {q.difficulty}
                                    </Badge>
                                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full ml-auto">
                    {q.points} pts
                  </span>
                                </div>

                                <h3 className="text-lg font-black text-gray-800 mb-2 line-clamp-2">
                                    {q.questionText}
                                </h3>

                                <div className="flex justify-end gap-2">
                                    <Button_admin
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedQuestion(q);
                                            setIsViewOpen(true);
                                        }}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button_admin>
                                    <Button_admin
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedQuestion(q);
                                            setIsEditOpen(true);
                                        }}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button_admin>
                                    <Button_admin
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500"
                                        onClick={() => {
                                            setSelectedQuestion(q);
                                            setIsDeleteOpen(true);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button_admin>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500">
                        Không có câu hỏi nào khớp với từ khoá.
                    </div>
                )
            ) : (
                <div className="text-muted-foreground">
                    Vui lòng chọn một bài học để xem câu hỏi.
                </div>
            )}

            {/* Edit */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="w-[90vw] max-w-[1280px] rounded-3xl max-h-[85vh] overflow-y-auto overflow-x-auto !left-1/2 !-translate-x-1/2">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Edit Question
                        </DialogTitle>
                    </DialogHeader>
                    <QuestionForm
                        modules={modules}
                        lessons={lessons}
                        onModuleChange={handleModuleSelect}
                        onSubmit={handleUpdate}
                        initialData={selectedQuestion ?? undefined}
                    />
                </DialogContent>
            </Dialog>

            {/* View */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="w-[80vw] max-w-[1000px] rounded-3xl max-h-[85vh] overflow-y-auto overflow-x-auto !left-1/2 !-translate-x-1/2">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">
                            Question Details
                        </DialogTitle>
                    </DialogHeader>
                    {selectedQuestion && <QuestionDetails question={selectedQuestion} />}
                </DialogContent>
            </Dialog>

            {/* Delete */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="max-w-md rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">
                            Delete Question
                        </DialogTitle>
                    </DialogHeader>
                    {selectedQuestion && (
                        <DeleteConfirmation
                            userName={selectedQuestion.questionText}
                            onConfirm={handleDelete}
                            onCancel={() => setIsDeleteOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default QuestionsCRUD;
