

export type Difficulty = "EASY"|"MEDIUM"|"HARD";
export type QType =
    | "single_choice" | "single_choice_image" | "reorder_words"
    | "text_input"    | "fill_in_blank"       | "matching"
    | "listening"     | "speaking";

export type ChoiceOption = {
    contentText: string;
    imageUrl?: string;
    isCorrect: boolean;
    orderIndex?: number;
};

export type ListeningPayload = {
    "tts.text": string;
    voice?: { languageCode?: string; voice?: string; speed?: number; pitch?: number; encoding?: "MP3"|"OGG_OPUS"|"LINEAR16" };
    answer?: string;
    generateAudioOnCreate?: boolean;
};

export type MatchingPayload = {
    left:  { id: string; text: string }[];
    right: { id: string; text: string }[];
    answerKey: Record<string,string>;
};

export type FillInBlankPayload = {
    blanks: { index: number; answers: string[] }[];
    caseInsensitive?: boolean; trimWhitespace?: boolean; acceptSynonyms?: boolean;
};

export type ReorderPayload = { words: string[]; correct: string[]; caseSensitive?: boolean; allowPunctuation?: boolean; };
export type TextInputPayload = { expected: string[]; minLength?:number; maxLength?:number; caseInsensitive?:boolean; stripPunctuation?:boolean; };

export type SpeakingPayload = {
    prompt?: string; referenceText?: string; languageCode?: string; maxDurationSec?: number;
    scoring?: { mode?: "pronunciation"|"fluency"|"overall"; rubricId?: number; ai?: { enabled?: boolean; model?: string; threshold?: number } };
    // Nếu FE có audioFile, bạn upload riêng rồi set audioUrl vào media khi cập nhật
};

// ==== UI shape (từ QuestionForm/Editors) ====
export type UIQuestion = {
    lessonId: number; questionTypeId: number; type: QType;
    actorUserId: number; questionText: string; difficulty: Difficulty; points: number;
    options?: ChoiceOption[];                         // single_choice(_image)
    payload?: ListeningPayload|MatchingPayload|FillInBlankPayload|ReorderPayload|TextInputPayload|SpeakingPayload;
    media?: { mediaUrl?: string; audioUrl?: string; videoUrl?: string }; // optional
    audioUrl?: string; // tiện dùng
};

// ==== BE DTO ====
export type QuestionCreateDto = {
    lessonId: number;
    type: QType;
    questionTypeId: number;
    actorUserId: number;
    questionText: string;
    difficulty: Difficulty;
    points: number;
    options?: { contentText: string; isCorrect: boolean; orderIndex: number; imageUrl?: string }[];
    payload?: any; // giữ linh hoạt theo type
};

export const mapUIToCreateDto = (q: UIQuestion): QuestionCreateDto => {
    const base: QuestionCreateDto = {
        lessonId: q.lessonId,
        type: q.type,
        questionTypeId: q.questionTypeId,
        actorUserId: q.actorUserId,
        questionText: q.questionText,
        difficulty: q.difficulty,
        points: q.points,
    };

    if (q.type === "single_choice" || q.type === "single_choice_image") {
        base.options = (q.options ?? []).map((o, i) => ({
            contentText: o.contentText,
            isCorrect: !!o.isCorrect,
            orderIndex: i + 1,
            imageUrl: o.imageUrl || undefined,
        }));
    } else if (q.payload) {
        // các type còn lại đi qua payload
        if (q.type === "reorder_words") {
            // nếu WordOrderEditor trả về { words, correctOrder:number[] }, convert sang mảng từ đúng thứ tự
            const r = q.payload as any;
            if (Array.isArray(r.correctOrder)) {
                base.payload = {
                    words: r.words,
                    correct: r.correctOrder.map((idx:number) => r.words[idx]),
                    caseSensitive: !!r.caseSensitive,
                    allowPunctuation: !!r.allowPunctuation,
                };
            } else {
                base.payload = q.payload;
            }
        } else {
            base.payload = q.payload;
        }
    }

    return base;
};