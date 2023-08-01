import OnlneCodeSnippet from "./OnlineCodeSnippet";
import { useState, useEffect } from "react";
import { ImSad2 } from "react-icons/im";
import { QuestionDto } from "../../services/dto/question.dto";

interface OnlineGameComponentProps {
  question: QuestionDto;
  onAnswerSubmit: (isCorrect: boolean) => void;
  setState: (state: string) => void;
}

const OnlineGameComponent = ({
  question,
  onAnswerSubmit,
  setState,
}: OnlineGameComponentProps) => {
  const [passed, setPassed] = useState<boolean | null>(null);
  const arrowKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (arrowKeys.includes(e.key)) {
        console.log(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="h-screen max-h-screen overflow-hidden">
      {question && (
        <OnlneCodeSnippet
          puzzle={question}
          passed={passed}
          handleSetPassed={setPassed}
          onAnswerSubmit={onAnswerSubmit}
          setState={setState}
        />
      )}

      {/* Post fail */}
      {passed != null && (
        <>
          {passed == false && (
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 animate-fadeIn flex-row items-center gap-2">
              <h1 className="text-2xl">You've Been Bested</h1>
              <ImSad2 className="text-2xl" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OnlineGameComponent;
