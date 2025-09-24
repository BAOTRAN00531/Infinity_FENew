// @ts-nocheck
import { useQuizz } from "../../../../contexts/QuizzContext";
import { cn } from "../../../../lib/utils";
import Footer from "../../../layouts/lesson/Footer";
import Notification from "../../../reuseables/Notification";

function FillInTheBlankInput() {
  const {
    state: { questions, currentQuestionIndex, hasChecked, isCorrect, textAnswer },
    setTextAnswer,
    setAnswered,
  } = useQuizz();
  const currentQuestion = questions[currentQuestionIndex];

  // Handle text input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextAnswer(value);
    setAnswered(value.trim().length > 0);
  };

  // Parse the question text to identify blanks (marked with _)
  const renderQuestionWithBlanks = () => {
    const questionText = currentQuestion.title;

    // Split by underscore and create parts
    const parts = questionText.split('_');

    if (parts.length === 1) {
      // No blanks found, just return the text
      return <span className="text-lg">{questionText}</span>;
    }

    return (
      <div className="text-lg mb-6 leading-relaxed">
        {parts.map((part, index) => (
          <span key={index} className="inline-flex items-baseline">
            <span>{part}</span>
            {index < parts.length - 1 && (
              <input
                type="text"
                value={textAnswer}
                onChange={handleInputChange}
                placeholder=""
                className={cn([
                  "inline-block min-w-[80px] w-auto mx-1 bg-white text-slate-700 font-medium py-1 px-3 rounded border-2 border-slate-300",
                  "focus:outline-none focus:border-primary focus:shadow-sm focus:bg-blue-50",
                  "placeholder:text-slate-400 text-center",
                  hasChecked && isCorrect && "border-green-500 bg-green-50 text-green-800",
                  hasChecked && !isCorrect && "border-red-500 bg-red-50 text-red-800",
                ])}
                disabled={hasChecked}
                style={{ width: Math.max(80, textAnswer.length * 10 + 20) }}
              />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="question mt-24 mx-24 space-y-24">
      <h1 className="text-xl font-bold">{currentQuestion.title}</h1>

      <div className="flex gap-16 justify-between">
        <div className="flex w-3xs relative -translate-y-5 -translate-x-10 shrink-0">
          <img src="/images/characters/wondering-boy.png" alt="Wondering boy" />
          <span className="absolute left-[60%] -top-8 text-sm text-slate-500 p-2.5 rounded-2xl border-2 border-slate-300 w-max">
            {currentQuestion.title}
          </span>
        </div>

        <div className="flex flex-col w-full max-w-md gap-4">
          <div className="text-sm text-gray-600 mb-2">
            Nhập câu trả lời của bạn:
          </div>
          <input
            type="text"
            value={textAnswer}
            onChange={handleInputChange}
            placeholder="Nhập câu trả lời..."
            className={cn([
              "w-full bg-background text-slate-600 font-bold py-3 px-4 rounded-2xl shadow-secondary transition border-2",
              "focus:outline-none focus:border-primary focus:shadow-primary",
              "placeholder:text-slate-400 placeholder:font-normal",
              hasChecked && isCorrect && "border-green-500 bg-green-50",
              hasChecked && !isCorrect && "border-red-500 bg-red-50",
            ])}
            disabled={hasChecked}
          />
        </div>
      </div>

      {hasChecked ? (
        <Notification type={isCorrect ? "correct" : "incorrect"} />
      ) : (
        <Footer showVocab={false} showToggleVocab={false} />
      )}
    </div>
  );
}

export default FillInTheBlankInput;