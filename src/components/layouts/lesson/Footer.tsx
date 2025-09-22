// @ts-nocheck
import { BrickWallIcon, TextCursorInputIcon } from "lucide-react";
import { useQuizz } from "../../../contexts/QuizzContext";
import { quizService } from "../../../api/Management/quiz.service";
import { IMPLEMENTED_QUESTION_TYPE } from "../../../contexts/QuizzContext";
import Button from "../../reuseables/Button";
import { cn } from "../../../lib/utils";

function Footer({ showVocab = false, showToggleVocab = false, onCheckAnswer }) {
  const {
    state: {
      useVocab,
      questions,
      currentQuestionIndex,
      selectedWords,
      hasAnswered,
      textAnswer,
      selectedOptionIds,
      isSubmittingAnswer,
    },
    toggleUseVocab,
    addWord,
    removeWord,
    setChecked,
    nextQuestion,
    setSubmittingAnswer,
  } = useQuizz();

  const currentQuestion = questions[currentQuestionIndex];

  const handleWordClick = (vocab) => {
    // Check if word is already selected
    const isSelected = selectedWords.some((word) => word.id === vocab.id);

    if (isSelected) {
      removeWord(vocab);
    } else {
      addWord(vocab);
    }
  };

  const checkAnswer = async () => {
    // Check if this is a new implemented question type that should use API
    if (currentQuestion.type === IMPLEMENTED_QUESTION_TYPE.MULTIPLE_SINGLE_CHOICE ||
        currentQuestion.type === IMPLEMENTED_QUESTION_TYPE.MULTIPLE_CHOICE_MULTI) {
      try {
        setSubmittingAnswer(true);
        console.log('Submitting answer via API:', {
          questionId: currentQuestion.id,
          selectedOptionIds
        });

        const response = await quizService.submitSingleQuestion(
          currentQuestion.id,
          selectedOptionIds
        );

        console.log('API Response:', response);
        setChecked(response.correct);
      } catch (error) {
        console.error('Failed to submit answer:', error);
        // Fallback to local checking if API fails
        setChecked(false);
      } finally {
        setSubmittingAnswer(false);
      }
    } else {
      // Fallback to local checking for old question types
      let isCorrectAnswer = false;

      if (useVocab) {
        // Check if selected words match any correct answer combination
        const selectedText = selectedWords.map((w) => w.text).join(" ");
        isCorrectAnswer = currentQuestion.correctAnswer.arr.some(
          (combo) => combo.map((w) => w.text).join(" ") === selectedText
        );
      } else {
        // Check text answer
        isCorrectAnswer =
          textAnswer.trim() === currentQuestion.correctAnswer.text;
      }

      setChecked(isCorrectAnswer);
    }
  };

  const handleSkip = () => {
    nextQuestion();
  };

  return (
    <footer className="absolute bottom-0 left-0 right-0 min-h-fit py-20 border-t-2 border-slate-300 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* VOCAB PANEL */}
        {showVocab && (
          <div
            className={`transition-all duration-300 ${
              showVocab ? "max-h-40 flex-center" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="flex-center flex-wrap gap-2 mb-20">
              {currentQuestion.vocabs?.map((vocab) => (
                <Button
                  key={vocab.id}
                  className={cn(["capitalize !font-bold"])}
                  type={
                    selectedWords.some((w) => w.id === vocab.id)
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => handleWordClick(vocab)}
                >
                  {vocab.text}
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between w-full">
          <Button className="mt-4" type="secondary" onClick={handleSkip}>
            Bỏ qua
          </Button>
          {showToggleVocab ? (
            <Button
              className="mt-4 capitalize"
              type="ghosted"
              onClick={toggleUseVocab}
            >
              {useVocab ? (
                <>
                  <TextCursorInputIcon strokeWidth={4} /> Gõ đáp án
                </>
              ) : (
                <>
                  <BrickWallIcon strokeWidth={4} />
                  Từ vựng
                </>
              )}
            </Button>
          ) : null}
          <Button
            className="mt-4"
            type="primary"
            disabled={!hasAnswered || isSubmittingAnswer}
            onClick={checkAnswer}
          >
            {isSubmittingAnswer ? "Đang kiểm tra..." : "Kiểm tra"}
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
