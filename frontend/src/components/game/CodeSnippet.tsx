import { useState, useRef, useEffect } from "react";
import { isEqual } from "lodash";
import Passed from "./Passed";
import Explanation from "./Explanation";
import { AiFillPlayCircle } from "react-icons/ai";
import seedrandom from "seedrandom";
import Stars from "./Stars";
import { PuzzleDto } from "../../services/dto/puzzle.dto";

const optionColors = [
  "checked:bg-red-500",
  "checked:bg-blue-500",
  "checked:bg-green-500",
  "checked:bg-yellow-500",
];

interface Props {
  passed: boolean | null;
  handleSetPassed: React.Dispatch<React.SetStateAction<boolean | null>>;
  puzzle: PuzzleDto;
}

const CodeSnippet = ({ passed, handleSetPassed, puzzle, props}: Props) => {
  const [selectedChunkIndex, setSelectedChunkIndex] = useState<{
    row: number;
    col: number;
  }>();
  const [selectedChunk, setselectedChunk] = useState<string>("");
  const [selectedModalOption, setSelectedModalOption] = useState<string>("");
  const [submittedModalOption, setSubmittedModalOption] = useState<string>("");
  const [buttonsAreDisabled, setbuttonsAreDisabled] = useState(false);
  const [stars, setStars] = useState<boolean[]>([true, true, true]);
  const [hasHint, setHasHint] = useState(true);
  const [replaceOptions, setReplaceOptions] = useState<string[]>([]);
  const hintRef = useRef<HTMLPreElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);

  const rng = seedrandom(puzzle.snippet);
  let correctOptionIndex = Math.floor(rng() * 4);
  useEffect(() => {
    if (passed == null) {
      setbuttonsAreDisabled(false);
      hintRef.current?.classList.add("hidden");
      setHasHint(true);
      setStars([true, true, true]);
      questionRef.current?.classList.remove("animate-hinge");
      setSubmittedModalOption("");
    }
  }, [passed]);

  const loseAStar = () => {
    setStars((prevState) => {
      const reversed = [...prevState].reverse();
      const trueIndex = reversed.indexOf(true);
      if (trueIndex !== -1) {
        reversed[trueIndex] = false;
      }
      return reversed.reverse();
    });
  };

  const setStarsToLocal = () => {
    const starsList = JSON.parse(localStorage.getItem("starsList"));
    console.log(starsList[props.topicID][props.levelID])
    var starCount = 0;
    for (let star of stars) {
      if(star){
        starCount += 1;
      }
    }
    starsList[props.topicID][props.levelID] = starCount;
    window.localStorage.setItem('starsList', JSON.stringify(starsList));
  }

  const submitAnswer = () => {
    setSubmittedModalOption(selectedModalOption);
    setSelectedModalOption("");
    if (
      isEqual(selectedChunkIndex, puzzle.correctCodeChunkIndex) &&
      selectedModalOption === puzzle.answer
    ) {
      handleSetPassed(true);
      setStarsToLocal()
      setbuttonsAreDisabled(true);
      if (questionRef.current) {
        questionRef.current.classList.add("animate-tada");
        questionRef.current.addEventListener("animationend", () => {
          if (questionRef.current) {
            questionRef.current.classList.remove("animate-tada");
          }
        });
      }
    } else {
      loseAStar();
      if (questionRef.current) {
        questionRef.current.classList.add("animate-headShake");
        questionRef.current.addEventListener("animationend", () => {
          if (questionRef.current) {
            questionRef.current.classList.remove("animate-headShake");
          }
        });
      }
    }
  };

  useEffect(() => {
    if (passed == null && isEqual(stars, [false, false, false])) {
      hintRef.current?.classList.add("hidden");
      questionRef.current?.classList.add("animate-hinge");
      handleSetPassed(false);
    }
  }, [stars]);

  // This is a hacky way to get the selected chunk
  // How this works is it gets the selected chunk and adds random code to the start/end of it or replace it.
  // That becomes an option and is added to the list.
  // If the selected chunk is the correct chunk, it will make sure the answer is within the list of options.
  useEffect(() => {
    let isCorrectChunk = false;
    let tempOptions: string[] = [];
    if (isEqual(puzzle.correctCodeChunkIndex, selectedChunkIndex)) {
      isCorrectChunk = true;
    }

    let index = 0;
    while (index < 4) {
      let alreadyIncluded = false;
      let randomOption = null;

      if (
        isCorrectChunk &&
        !tempOptions.includes(puzzle.answer) &&
        correctOptionIndex == index
      ) {
        tempOptions.push(puzzle.answer);
        index++;
      } else {
        do {
          let randomNum = rng();
          randomNum > 2 / 3
            ? (randomOption = `${selectedChunk}${
                puzzle.options[Math.floor(randomNum * puzzle.options.length)]
              }`)
            : randomNum > 1 / 3
            ? (randomOption = `${
                puzzle.options[Math.floor(randomNum * puzzle.options.length)]
              }${selectedChunk}`)
            : (randomOption = `${
                puzzle.options[Math.floor(randomNum * puzzle.options.length)]
              }`);

          alreadyIncluded = tempOptions.includes(randomOption);
        } while (alreadyIncluded);

        tempOptions.push(randomOption);
        index++;
      }
    }
    setReplaceOptions(tempOptions);
  }, [selectedChunk]);

  const showHint = () => {
    if (hasHint) {
      setHasHint(false);

      if (hintRef.current) {
        hintRef.current.classList.remove("hidden");
        hintRef.current.classList.add("animate-fadeIn");
        hintRef.current.addEventListener("animationend", () => {
          if (hintRef.current) {
            hintRef.current.classList.remove("animate-fadeIn");
            hintRef.current.classList.add("animate-infinite");
            hintRef.current.classList.add("animate-twPulse");
          }
        });
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {passed ? <Passed hasHint={hasHint} /> : null}

      <div className="flex flex-col">
        <Stars stars={stars} passed={passed} />
        <div ref={questionRef} className="mockup-code overflow-auto pr-10 ">
          <pre data-prefix=">" className="text-warning">
            <code className="text-2xl max-md:text-lg">{puzzle.content}</code>
          </pre>
          <pre />
          {puzzle.snippet.split("\n").map((line, rowIndex) => {
            return (
              <pre data-prefix="$" key={rowIndex}>
                <code>
                  {line.split(/(?=[\s()])+/).map((chunk, colIndex) => {
                    if (!chunk) return;
                    const spaces = chunk.split(/\S+/).filter(Boolean);
                    const text = chunk.split(/\s+/).filter(Boolean);
                    return (
                      <div key={chunk + colIndex} className="inline-block">
                        <span>{spaces}</span>
                        <label
                          htmlFor={buttonsAreDisabled ? "" : "my-modal"}
                          className="btn-md btn p-0 text-xl lowercase max-md:text-sm"
                          onClick={() => {
                            if (buttonsAreDisabled) return;

                            setselectedChunk(text.toString());
                            setSubmittedModalOption("");
                            setSelectedChunkIndex({
                              row: rowIndex,
                              col: colIndex,
                            });
                          }}
                        >
                          {submittedModalOption &&
                          isEqual(selectedChunkIndex, {
                            row: rowIndex,
                            col: colIndex,
                          }) ? (
                            <div
                              className={passed ? "text-success" : "text-error"}
                            >
                              {submittedModalOption}
                            </div>
                          ) : (
                            text
                          )}
                        </label>
                      </div>
                    );
                  })}
                </code>
              </pre>
            );
          })}
          <br />
          <pre ref={hintRef} data-prefix="$" className="hidden text-error">
            <code className="text-2xl max-md:text-lg">{puzzle.hint}</code>
          </pre>
        </div>
        <div className="flex w-full justify-center">
          {!passed && (
            <AiFillPlayCircle
              className={`mt-2 text-4xl  text-green-700 transition ${
                hasHint
                  ? "cursor-pointer hover:text-green-900 "
                  : "cursor-default opacity-75"
              } ${stars[0] || passed ? "" : "hidden"}`}
              onClick={showHint}
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-9/12">
        {passed && <Explanation explanation={puzzle.explanation}/>}
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal modal-bottom">
        <div className="modal-box relative space-y-6">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl max-md:text-lg">
              Replace
              <code className="mx-2 w-fit rounded-md bg-base-300 p-2">
                {selectedChunk}
              </code>
              with?
            </h1>
            <label htmlFor="my-modal" className="btn-sm btn-circle btn">
              ✕
            </label>
          </div>

          <div className="w-11/12">
            {replaceOptions.map((option, index) => {
              return (
                <div className="form-control" key={option + index}>
                  <label className="label cursor-pointer space-x-5">
                    <span className="label-text text-lg max-md:text-sm">
                      <code className="rounded-md bg-base-300 p-2">
                        {option}
                      </code>
                    </span>
                    <input
                      type="radio"
                      name="radio-10"
                      className={`radio ${
                        optionColors[index % optionColors.length]
                      }`}
                      onClick={() => {
                        setSelectedModalOption(option);
                      }}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className={`btn-md btn ${
                selectedModalOption != "" ? "" : "btn-disabled"
              }`}
              onClick={submitAnswer}
            >
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
