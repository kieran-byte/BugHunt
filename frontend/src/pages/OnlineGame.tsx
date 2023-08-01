import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import OnlineGameComponent from "../components/OnlineGameComponent/OnlineGameComponent";
import { QuestionDto } from "../services/dto/question.dto";
import WaitingStateComponent from "../components/OnlineGameComponent/WaitingStateComponent";
import { GameDto } from "../services/dto/game.dto";
import PostGameComponent from "../components/OnlineGameComponent/PostGameComponent";
import { UserDto } from "../services/dto/user.dto";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OnlineGame = () => {
  const navigate = useNavigate();
  const gameSocketRef = useRef<Socket>();
  const [state, setState] = useState("WAITING");
  const [gameData, setGameData] = useState<GameDto>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionDto>();
  const [countdown, setCountdown] = useState(3);
  const [feedback, setFeedback] = useState("");

  let user: UserDto | null;
  try {
    user = JSON.parse(localStorage.getItem("user")!);
  } catch (e) {
    console.error("Error parsing user data: ", e);
    user = null;
  }

  useEffect(() => {
    gameSocketRef.current = io(API_BASE_URL);
    gameSocketRef.current.emit("userConnected", { userId: user?._id });
    gameSocketRef.current.emit("waiting");

    gameSocketRef.current.on("start", (data: any) => {
      setGameData(data.game);
      setCurrentQuestionIndex(0);
      setCurrentQuestion(data.game.questions[0]);
      setState("COUNTING");
      setFeedback("");
    });

    gameSocketRef.current.on("gameOver", (data) => {
      setGameData(data);
      setState("POSTGAME");
    });

    return () => {
      gameSocketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    gameSocketRef.current?.on(
      "nextQuestion",
      (data: {
        updatedGame: GameDto;
        scoringUserId: string | null;
        isCorrect: boolean;
      }) => {
        setGameData(data.updatedGame);
        setCurrentQuestionIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          setCurrentQuestion(data.updatedGame.questions[newIndex]);
          console.log(newIndex);
          return newIndex;
        });
        console.log(data.scoringUserId, user?._id)
        if (data.scoringUserId == user?._id) {
          if (data.isCorrect) {
            setFeedback("Great job! You scored a point!");
          } else {
            setFeedback("Sorry, your opponent just scored a point :(");
          }
        } else if (data.scoringUserId != null) {
          if (data.isCorrect) {
            setFeedback("Too slow! Your opponent scored a point.");
          } else {
            setFeedback("Lucky you! Your opponent fumbled the question.");
          }
        }
        setState("COUNTING");
      }
    );
  }, []);

  useEffect(() => {
    if (state !== "COUNTING") return;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [state]);

  useEffect(() => {
    if (countdown === 0) {
      setState("PLAYING");
      setCountdown(3);
    }
  }, [countdown]);

  const handlePlayAgain = () => {
    gameSocketRef.current?.emit("waiting");
    setState("WAITING");
  };

  const handleMainMenu = () => {
    navigate("/");
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    gameSocketRef.current?.emit("answer", {
      gameId: gameData?._id,
      isCorrect,
    });
  };

  if (state === "WAITING") {
    return <WaitingStateComponent user1={user} user2={gameData?.player2} />;
  } else if (state === "COUNTING") {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-6xl">Starting in</h1>
        <div className="countdown font-mono text-6xl">{countdown}</div>
        <h2 className="mt-4 text-2xl">{feedback}</h2>
      </div>
    );
  } else if (state === "PLAYING") {
    return currentQuestion ? (
      <OnlineGameComponent
        question={currentQuestion}
        onAnswerSubmit={handleAnswerSubmit}
        setState={setState}
      />
    ) : (
      <div>Loading question...</div>
    );
  } else if (state === "POSTGAME") {
    return (
      <PostGameComponent
        onPlayAgain={handlePlayAgain}
        onMainMenu={handleMainMenu}
      />
    );
  } else {
    return <div>Status error</div>;
  }
};

export default OnlineGame;
