// @ts-nocheck
import { useQuizz } from "../../../../contexts/QuizzContext";
import { cn } from "../../../../lib/utils";
import Footer from "../../../layouts/lesson/Footer";
import Notification from "../../../reuseables/Notification";
import Button from "../../../reuseables/Button";

function SimpleMatchingInput() {
  const {
    state: { questions, currentQuestionIndex, hasChecked, isCorrect, selectedOptionIds },
    setSelectedOptionIds,
    setAnswered,
  } = useQuizz();
  const currentQuestion = questions[currentQuestionIndex];

  // Handle option selection (all options must be selected in position order)
  const handleOptionToggle = (optionId) => {
    let newSelectedIds;

    if (selectedOptionIds.includes(optionId)) {
      // Remove option
      newSelectedIds = selectedOptionIds.filter(id => id !== optionId);
    } else {
      // Add option
      newSelectedIds = [...selectedOptionIds, optionId];
    }

    setSelectedOptionIds(newSelectedIds);
    // For matching questions, user must select all options to submit
    setAnswered(newSelectedIds.length === currentQuestion.options.length);
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

        <div className="flex flex-col w-full max-w-2xl gap-4">
          <div className="text-sm text-gray-600 mb-4">
            Chọn tất cả các đáp án theo đúng thứ tự:
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options
              .sort((a, b) => a.position - b.position)
              .map((option) => (
              <Button
                key={option.id}
                type={selectedOptionIds.includes(option.id) ? "primary" : "secondary"}
                className={cn([
                  "w-full text-left justify-start py-4 px-6 text-base transition-all",
                  hasChecked && selectedOptionIds.includes(option.id) && isCorrect && "!border-green-500 !bg-green-50 !text-green-800",
                  hasChecked && selectedOptionIds.includes(option.id) && !isCorrect && "!border-red-500 !bg-red-50 !text-red-800",
                ])}
                onClick={() => !hasChecked && handleOptionToggle(option.id)}
                disabled={hasChecked}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option.optionText}</span>
                  {selectedOptionIds.includes(option.id) && (
                    <span className="text-sm opacity-70">
                      #{selectedOptionIds.indexOf(option.id) + 1}
                    </span>
                  )}
                </div>
              </Button>
            ))}
          </div>

          <div className="text-xs text-gray-500 mt-2">
            Đã chọn: {selectedOptionIds.length}/{currentQuestion.options.length}
          </div>
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

export default SimpleMatchingInput;