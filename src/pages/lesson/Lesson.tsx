// @ts-nocheck
import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AudioQuizz from "../../components/page-component/lesson/quizz/AudioQuizz";
import FillInTheBlank from "../../components/page-component/lesson/quizz/FillInTheBlank";
import Matching from "../../components/page-component/lesson/quizz/Matching";
import Rearrange from "../../components/page-component/lesson/quizz/Rearrange";
import SingleImage from "../../components/page-component/lesson/quizz/SingleImage";
import MultipleSingleChoiceQuestion from "@components/page-component/lesson/quizz/MultipleSingleChoiceQuestion";
import SpeakingQuiz from "../../components/page-component/lesson/quizz/SpeakingQuiz";
import TextInput from "../../components/page-component/lesson/quizz/TextInput";
import FillInTheBlankInput from "../../components/page-component/lesson/quizz/FillInTheBlankInput";
import SimpleMatchingInput from "../../components/page-component/lesson/quizz/SimpleMatchingInput";
import {IMPLEMENTED_QUESTION_TYPE, useQuizz} from "../../contexts/QuizzContext";
import {quizService} from "../../api/Management/quiz.service";
import {StudentQuizQuestion} from "../../api/types";
import LessonLayout from "./Layout";

function Lesson() {
    const {id} = useParams();
    const lessonId = id ? parseInt(id) : null;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiQuestions, setApiQuestions] = useState<StudentQuizQuestion[]>([]);

    const {
        state: {lesson, questions, currentQuestionIndex, QUESTION_TYPES},
        dispatch
    } = useQuizz();

    // Use API questions if available, otherwise fall back to context questions
    const effectiveQuestions = apiQuestions.length > 0 ? apiQuestions : questions;
    const currentQuestion = effectiveQuestions[currentQuestionIndex];

    // Auto-navigate to the first incomplete question when questions are loaded
    useEffect(() => {
        if (effectiveQuestions.length > 0) {
            const firstIncompleteIndex = effectiveQuestions.findIndex(q => !q.isCompleted);

            // If there's an incomplete question and we're not already on it, navigate to it
            if (firstIncompleteIndex !== -1 && currentQuestionIndex !== firstIncompleteIndex) {
                dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: firstIncompleteIndex });
            }
        }
    }, [effectiveQuestions, currentQuestionIndex, dispatch]);

    // Calculate and update progress whenever effectiveQuestions change
    useEffect(() => {
        if (effectiveQuestions.length > 0) {
            const completedCount = effectiveQuestions.filter(q => q.isCompleted).length;
            const progressPercentage = Math.round((completedCount / effectiveQuestions.length) * 100);

            // Update progress in context if it's different
            if (dispatch) {
                dispatch({ type: 'SET_PROGRESS', payload: progressPercentage });
            }
        }
    }, [effectiveQuestions, dispatch]);

    // Fetch quiz questions from API when component mounts
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!lessonId) {
                setError('Invalid lesson ID');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                console.log('Fetching quiz questions for lesson:', lessonId);

                const questions = await quizService.getQuestions(lessonId);
                console.log('Fetched questions:', questions);

                // Transform API questions to match the expected format
                const transformedQuestions = questions.map(q => {
                    console.log('Processing question:', q.id, 'with type:', q.type);
                    return {
                        id: q.id,
                        title: q.questionText,
                        type: q.type,
                        difficulty: q.difficulty,
                        points: q.points,
                        options: q.options?.map(opt => ({
                            id: opt.id,
                            text: opt.optionText,
                            image: opt.imageUrl
                        })) || [],
                        answers: q.answers || [],
                        media: q.media,
                        isCompleted: q.completed
                    };
                });

                setApiQuestions(transformedQuestions);

                // Update the context with new questions if needed
                if (transformedQuestions.length > 0) {
                    dispatch({type: 'SET_QUESTIONS', payload: transformedQuestions});
                }
            } catch (error) {
                console.error('Failed to fetch quiz questions:', error);
                setError('Failed to load quiz questions. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [lessonId, dispatch]);

    // Show loading state
    if (loading) {
        return (
            <LessonLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-lg">Loading quiz questions...</div>
                </div>
            </LessonLayout>
        );
    }

    // Show error state
    if (error) {
        return (
            <LessonLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-red-500 text-lg">{error}</div>
                </div>
            </LessonLayout>
        );
    }

    // Show message if no questions available
    if (effectiveQuestions.length === 0) {
        return (
            <LessonLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-500 text-lg">No quiz questions available for this lesson.</div>
                </div>
            </LessonLayout>
        );
    }

    const renderQuizz = () => {
        if (!currentQuestion) {
            return <Navigate to={`/hoc/bai-hoc/${lesson.slug}/ket-qua`} replace/>;
        }
        switch (currentQuestion.type) {
            case QUESTION_TYPES["AUDIO"]:
                return <AudioQuizz/>;

            case QUESTION_TYPES["SPEAKING"]:
                return <SpeakingQuiz/>;

            case QUESTION_TYPES["FILL-IN-THE-BLANK"]:
                return <FillInTheBlank/>;

            case QUESTION_TYPES["REARRANGE"]:
                return <Rearrange/>;

            case QUESTION_TYPES["SINGLE-IMAGE"]:
                return <SingleImage/>;

            case IMPLEMENTED_QUESTION_TYPE.MULTIPLE_SINGLE_CHOICE:
                return <MultipleSingleChoiceQuestion/>;

            case IMPLEMENTED_QUESTION_TYPE.MULTIPLE_CHOICE_MULTI:
                return <MultipleSingleChoiceQuestion/>; // For now, use same component

            case IMPLEMENTED_QUESTION_TYPE.TEXT_INPUT:
                return <TextInput/>;

            case IMPLEMENTED_QUESTION_TYPE.FILL_IN_THE_BLANK:
                return <FillInTheBlankInput/>;

            case IMPLEMENTED_QUESTION_TYPE.MATCHING:
                return <Matching/>;

            case QUESTION_TYPES["MATCHING"]:
                return <Matching/>;

            default:
                break;
        }
    };

    return <LessonLayout>{renderQuizz()}</LessonLayout>;
}

export default Lesson;
