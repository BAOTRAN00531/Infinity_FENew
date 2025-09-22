// @ts-nocheck
import { useQuizz } from "../../../../contexts/QuizzContext";
import { IMPLEMENTED_QUESTION_TYPE } from "../../../../contexts/QuizzContext";
import { cn } from "../../../../lib/utils";
import Footer from "../../../layouts/lesson/Footer";
import Notification from "../../../reuseables/Notification";

function MultipleSingleChoiceQuestion() {
  const {
    state: { questions, currentQuestionIndex, hasChecked, isCorrect, selectedOptionIds },
    setSelectedOptionIds,
  } = useQuizz();
  const currentQuestion = questions[currentQuestionIndex];

  // Check if this is a multiple choice multi-answer question
  const isMultiSelect = currentQuestion.type === IMPLEMENTED_QUESTION_TYPE.MULTIPLE_CHOICE_MULTI;

  // Handle option selection
  const handleOptionChange = (optionId) => {
    if (isMultiSelect) {
      // For multiple choice: toggle selection
      if (selectedOptionIds.includes(optionId)) {
        // Remove option if already selected
        setSelectedOptionIds(selectedOptionIds.filter(id => id !== optionId));
      } else {
        // Add option to selection
        setSelectedOptionIds([...selectedOptionIds, optionId]);
      }
    } else {
      // For single choice: replace selection
      setSelectedOptionIds([optionId]);
    }
  };

  return (
    <div className="question mt-24 mx-24 space-y-24">
      <h1 className="text-xl font-bold">{currentQuestion.title}</h1>
      {isMultiSelect && (
        <p className="text-sm text-gray-600">
          Chọn tất cả đáp án đúng:
        </p>
      )}
      <div className="flex gap-16 justify-between">
        <div className="flex w-3xs relative -translate-y-5 -translate-x-10 shrink-0">
          <img src="/images/characters/wondering-boy.png" alt="Wondering boy" />
          <span className=" absolute left-[60%] -top-8 text-sm text-slate-500 p-2.5 rounded-2xl border-2 border-slate-300 w-max">
            What are you doing?
          </span>
        </div>

        <div className="flex flex-col w-fit gap-4">
          {/* Display options */}
          {currentQuestion.options.map((option) => (
            <label
              key={option.id}
              className={cn([
                "w-full min-w-[300px] bg-background text-slate-600 font-bold py-2.5 px-4 rounded-2xl shadow-secondary transition text-center cursor-pointer",
                "has-checked:bg-primary has-checked:text-white has-checked:shadow-primary",
                selectedOptionIds.includes(option.id) && "bg-primary text-white shadow-primary",
              ])}
            >
              <input
                type={isMultiSelect ? "checkbox" : "radio"}
                hidden
                name={isMultiSelect ? "multi-answer" : "answer"}
                value={option.id}
                checked={selectedOptionIds.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
              />
              <span className="text-base be-vietnam-pro-bold flex items-center justify-center gap-2">
                {isMultiSelect && selectedOptionIds.includes(option.id) && (
                  <span className="text-white">✓</span>
                )}
                {option.text}
              </span>
            </label>
          ))}
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

export default MultipleSingleChoiceQuestion;
