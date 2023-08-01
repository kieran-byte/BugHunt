import useLocalStorage from "../UseLocalStorage";
import Nav from "../components/Navbar";
import { useLocation } from "react-router-dom";
import styles from "./Topics.module.css";
import { LockIcon } from "./Topics";
import { useEffect, useState } from "react";
import { findByTopicAndIsCurriculum } from "../services/puzzle-service";
import { PuzzleDto } from "../services/dto/puzzle.dto";
import { useNavigate } from "react-router-dom";

const Levels = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const googleWords = location.state.props.google;
  const [puzzles, setPuzzles] = useState<PuzzleDto[]>([]);

  useEffect(() => {
    const topic = location.state.props.title.toLowerCase();
    const fetchAndSetPuzzles = async () => {
      const data = await findByTopicAndIsCurriculum(topic);
      setPuzzles(data);
    };

    fetchAndSetPuzzles();
  }, []);

  const wikiButtonClick = () => {
    window.open("http://localhost:5173/wiki", "_self");
  };

  const forumButtonClick = () => {
    // window.open("http://localhost:5173/wiki", "_self");
    navigate("/forum");
  };

  return (
    <div className="space-b-10 flex h-screen w-screen flex-col bg-white">
      <Nav />
      <div className="hero h-1/4 bg-[#323842] text-slate-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{location.state.props.title}</h1>
            <p className="py-6">
              Each topic contains 5 exciting levels! Can you 3-star them all?
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-row items-start gap-1">
        {/* {stars.map((item) => <p>{item.toString()}</p>)} */}
        {puzzles.map((puzzle, index) => (
          <LevelCard
            dict={location.state.props}
            num={index + 1}
            puzzle={puzzle}
          />
        ))}
      </div>

      <footer className="flex h-1/6 flex-row items-center justify-center gap-x-4 bg-[#323842] text-slate-100">
        <div className="flex w-1/2 flex-col items-center justify-center">
          <div className="text-lg">
            Having Trouble with these levels? Check out these resources:
          </div>

          <div className="mt-5 flex flex-row gap-x-5">
            <button onClick={wikiButtonClick} className="btn-accent btn">
              Wiki
            </button>
            <button onClick={forumButtonClick} className="btn-accent btn">
              Forum
            </button>
          </div>
        </div>

        <div className="flex w-1/2 flex-col items-center justify-center">
          <div>Words to google:</div>
          <div className="mt-5 grid grid-flow-col grid-rows-2 gap-4">
            <GoogleButton words={googleWords[0]} />
            <GoogleButton words={googleWords[1]} />
            <GoogleButton words={googleWords[2]} />
            <GoogleButton words={googleWords[3]} />
            <GoogleButton words={googleWords[4]} />
            <GoogleButton words={googleWords[5]} />
          </div>
        </div>
      </footer>
    </div>
  );
};

const GoogleButton = (props) => {
  const googleButtonStyle = "lowercase btn btn-accent btn-xs";
  return (
    <a
      href={"https://www.google.com/search?q=" + props.words}
      target="_blank"
      rel="external"
    >
      <button className={googleButtonStyle}>{props.words}</button>
    </a>
  );
};

const LevelCard = (dict) => {
  var props = dict.dict;
  var starsStyle = ["bg-gray-400", "bg-gray-400", "bg-gray-400"];
  const navigate = useNavigate();

  var starsList = JSON.parse(localStorage.getItem("starsList"));

  const stars = starsList[props.id - 1][dict.num - 1];

  for (var i = 0; i < stars; i++) {
    starsStyle[i] = "bg-orange-400";
  }

  const goToGame = (topic: string, task: string) => {
    navigate(`/game/${topic}/${task.replace("?", "~")}` , {state: {topicID: props.id -1, levelID: dict.num -1}})
  };

  const [isLocked, setIsLocked] = useLocalStorage(
    props.title + "Locked",
    dict.num == 1
  );

  let prevLevelStarsCount = 0;
  if (dict.num != 1) {
    prevLevelStarsCount = starsList[props.id - 1][dict.num - 2];
    if (prevLevelStarsCount >= 1) {
      useEffect(() => {
        setIsLocked(false);
      });
    } else {
      useEffect(() => {
        setIsLocked(true);
      });
    }
  } else {
    useEffect(() => {
      setIsLocked(false);
    });
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-48 w-1/2 flex-col">
        {isLocked && (
          <div
            className="tooltip w-full"
            data-tip="Level Locked! Get one star on the previous level."
          >
            <button
              className={
                styles.locked +
                " btn-disabled btn h-36 w-full text-3xl hover:scale-105 "
              }
            >
              {LockIcon()}
            </button>
          </div>
        )}

        {!isLocked && (
          <button
            className={
              "btn-accent btn-active btn h-36 text-3xl hover:scale-105 "
            }
            onClick={() => goToGame(dict.puzzle.topic, dict.puzzle.content)}
          >
            {dict.num}
          </button>
        )}
        {/* <button className={" btn text-3xl h-4/5 hover:scale-105 "}>{buttonText}</button> */}
        <div className="mt-1 flex h-1/5 flex-row">
          <div
            className={starsStyle[0] + " mask mask-star-2 h-full w-1/3"}
          ></div>
          <div
            className={starsStyle[1] + " mask mask-star-2 mt-2 h-full w-1/3"}
          ></div>
          <div
            className={starsStyle[2] + " mask mask-star-2 h-full w-1/3"}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Levels;
