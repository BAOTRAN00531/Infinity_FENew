// @ts-nocheck
import { useQuizz } from "../../../../contexts/QuizzContext";
import { cn } from "../../../../lib/utils";
import Footer from "../../../layouts/lesson/Footer";
import Notification from "../../../reuseables/Notification";

function TextInput() {
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

          {/* Show expected answer after checking if incorrect */}
          {hasChecked && !isCorrect && currentQuestion.answers && currentQuestion.answers.length > 0 && (
            <div className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">Đáp án đúng: </span>
              <span className="text-green-600 font-bold">
                {currentQuestion.answers.map(answer => answer.answerText).join(", ")}
              </span>
            </div>
          )}
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

export default TextInput;