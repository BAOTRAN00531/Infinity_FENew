import Button from "../../components/reuseables/Button";
import LessonProgressCircle from "../../components/reuseables/LessonCircleProgress";
import NextLessonBox from "../../components/page-component/base/NextLessonBox";
import TrialBox from "../../components/page-component/base/TrialBox";
import {NavLink} from "react-router-dom";
import SidebarAd from "@components/ui/Ads/SidebarAd";
import {Suspense, useEffect, useState} from "react";
import {UserLesson} from "@/models/lesson/UserLesson";
import {fetchUserLesson} from "@/services/userLessonService";

function Learn() {
    const [lessons, setLessons] = useState<UserLesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get moduleId from URL params or set default (could be from context/props)
    const defaultModuleId = 2; // English course first module

    useEffect(() => {
        const loadUserLesson = async () => {
            try {
                setError(null);
                const lessons = await fetchUserLesson(defaultModuleId);
                setLessons(lessons);
            } catch (error) {
                console.error('Failed to load lessons:', error);
                setError('Failed to load lessons. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        loadUserLesson();
    }, [defaultModuleId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading lessons...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex">
            {/*quang cao*/}
            <Suspense fallback={<div>Loading ad...</div>}>
                <SidebarAd/>
            </Suspense>

            <LessonGrid lessons={lessons} className="grow"/>
            <aside className="max-w-[360px] h-full flex flex-col gap-8">
                <div role="course" className="bg-accent flex items-start justify-between gap-4 rounded-2xl p-3">
                    <h2 className="be-vietnam-pro-black text-white text-base leading-5 max-w-[200px]">
                        ENGLISH FOR BEGINNERS
                    </h2>
                    <NavLink to={"/hoc-phan"}>
                        <Button type="muted" className="p-2.5">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.6665 22.75V5.25C4.6665 4.47645 4.97379 3.73459 5.52078 3.18761C6.06776 2.64062 6.80962 2.33333 7.58317 2.33333H22.1665C22.4759 2.33333 22.7727 2.45625 22.9915 2.67504C23.2103 2.89384 23.3332 3.19058 23.3332 3.5V24.5C23.3332 24.8094 23.2103 25.1062 22.9915 25.325C22.7727 25.5438 22.4759 25.6667 22.1665 25.6667H7.58317C6.80962 25.6667 6.06776 25.3594 5.52078 24.8124C4.97379 24.2654 4.6665 23.5235 4.6665 22.75ZM4.6665 22.75C4.6665 21.9765 4.97379 21.2346 5.52078 20.6876C6.06776 20.1406 6.80962 19.8333 7.58317 19.8333H23.3332M10.4998 11.0833L12.8332 13.4167L17.4998 8.75"
                                    stroke="#475569"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                    </NavLink>
                </div>
                {/* Next lesson box */}
                <NextLessonBox/>
                <TrialBox/>
            </aside>
        </div>
    );
}

export default Learn;

interface LessonGridProps {
    lessons: any[];
    className?: string;
}

const LessonGrid = ({lessons, className}: LessonGridProps) => {
    if (!lessons || lessons.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-500">No lessons available</div>
            </div>
        );
    }

    // Handle different lesson counts gracefully
    if (lessons.length === 1) {
        return (
            <div className={`flex-center flex-col gap-4 w-full max-w-3xl mx-auto p-4 ${className || ''}`}>
                <div className="flex justify-center">
                    <LessonProgressCircle
                        lesson={lessons[0]}
                        lessonNumber={1}
                        {...lessons[0]}
                    />
                </div>
            </div>
        );
    }

    if (lessons.length <= 3) {
        return (
            <div className={`flex-center flex-col gap-4 w-full max-w-3xl mx-auto p-4 ${className || ''}`}>
                <div className="flex items-center justify-center gap-16 flex-wrap">
                    {lessons.map((lesson, index) => (
                        <LessonProgressCircle
                            key={lesson.id || index}
                            lesson={lesson}
                            lessonNumber={index + 1}
                            {...lesson}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Original complex layout for 4+ lessons
    const extraLessons = lessons.length - 4;
    const threeLessonRows = Math.ceil(extraLessons / 3);

    return (
        <div className={`flex-center flex-col gap-4 w-full max-w-3xl mx-auto p-4 ${className || ''}`}>
            {/* Fixed Row 1: Single centered lesson */}
            <div className="flex justify-center">
                <LessonProgressCircle
                    lesson={lessons[0]}
                    lessonNumber={1}
                    {...lessons[0]}
                />
            </div>

            {/* Dynamic Middle Rows: 3 lessons per row */}
            {Array.from({length: threeLessonRows}).map((_, rowIndex) => {
                const startIdx = 1 + rowIndex * 3;
                return (
                    <div
                        key={`middle-${rowIndex}`}
                        className="flex items-center justify-evenly gap-16"
                    >
                        {[0, 1, 2].map((idx) => {
                            const lessonIdx = startIdx + idx;
                            return lessons[lessonIdx] ? (
                                <div
                                    key={lessonIdx}
                                    className="grow flex justify-center min-w-40"
                                >
                                    <LessonProgressCircle
                                        lesson={lessons[lessonIdx]}
                                        lessonNumber={lessonIdx + 1}
                                        {...lessons[lessonIdx]}
                                    />
                                </div>
                            ) : (
                                <div key={`empty-${idx}`} className="grow min-w-40"/>
                            );
                        })}
                    </div>
                );
            })}

            {/* Fixed Row (second last): 2 centered lessons if they exist */}
            {lessons.length >= Math.max(4, 1 + threeLessonRows * 3 + 2) && (
                <div className="flex-center gap-16">
                    {[1, 3].map((colOffset, idx) => {
                        const lessonIdx = lessons.length - 3 + idx;
                        return lessons[lessonIdx] ? (
                            <div key={lessonIdx} className="flex-center justify-center min-w-40">
                                <LessonProgressCircle
                                    lesson={lessons[lessonIdx]}
                                    lessonNumber={lessonIdx + 1}
                                    {...lessons[lessonIdx]}
                                />
                            </div>
                        ) : (
                            <div key={`empty-end-${idx}`} className="min-w-40"/>
                        );
                    })}
                </div>
            )}

            {/* Fixed Last Row: Single centered lesson */}
            {lessons.length > 1 && (
                <div className="flex justify-center">
                    <LessonProgressCircle
                        lesson={lessons[lessons.length - 1]}
                        lessonNumber={lessons.length}
                        {...lessons[lessons.length - 1]}
                    />
                </div>
            )}
        </div>
    );
};

// Row 1: [empty] [empty] [lesson 1] [empty] [empty]
// Row 2: [lesson 2] [empty] [lesson 3] [empty] [lesson 4]
// Row 3: [lesson 5] [empty] [lesson 6] [empty] [lesson 7]
// Row 4: [empty] [lesson 8] [empty] [lesson 9] [empty]
// Row 5: [empty] [empty] [lesson 10] [empty] [empty]
