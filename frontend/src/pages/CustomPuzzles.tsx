import { SiAzuredataexplorer } from "react-icons/si";
import { MdOutlineDesignServices } from "react-icons/md";
import { useState, useEffect } from "react";
import { getCustomPuzzles, createPuzzle } from "../services/puzzle-service";
import { PuzzleDto } from "../services/dto/puzzle.dto";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";

const CustomPuzzles = () => {
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(true);
  const [showExplorePuzzles, setShowExplorePuzzles] = useState(false);
  const [showCreatePuzzle, setShowCreatePuzzle] = useState(false);
  const [customPuzzles, setCustomPuzzles] = useState<PuzzleDto[]>([]);
  const [customPuzzle, setCustomPuzzle] = useState<PuzzleDto>({
    topic: "syntax",
    content: "Example question",
    answer: "):",
    snippet: 'def hello()\n\tprint("hello world!")',
    isCustom: true,
    hint: "SyntaxError: expected ':'",
    options: [";", "(", " return ", ":", "'", " area ", " calculate_area "],
    correctCodeChunkIndex: { row: 0, col: 3 },
  });

  const toggleShowExplorePuzzles = () => {
    setShowOptions((showOptions) => !showOptions);
    setShowExplorePuzzles((showExplorePuzzles) => !showExplorePuzzles);
  };

  const toggleShowCreatePuzzle = () => {
    setShowOptions((showOptions) => !showOptions);
    setShowCreatePuzzle((showCreatePuzzle) => !showCreatePuzzle);
  };

  const enterGame = (topic: string, task: string) => {
    navigate(`/game/${topic}/${task}`);
  };

  useEffect(() => {
    const getAndSetCustomPuzzles = async () => {
      const data = await getCustomPuzzles();
      setCustomPuzzles(data);
    };

    getAndSetCustomPuzzles();
  }, []);

  const save = async () => {
    await createPuzzle(customPuzzle);
    setShowOptions((showOptions) => !showOptions);
    setShowCreatePuzzle((showCreatePuzzle) => !showCreatePuzzle);
  };

  var clickHandle = null;

  if (showExplorePuzzles) {
    clickHandle = toggleShowExplorePuzzles;
  } else {
    clickHandle = toggleShowCreatePuzzle;
  }

  return (
    <div>
      {showOptions && (
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="flex w-full items-center justify-center gap-12 max-md:flex-col max-md:gap-6">
            <div className="card h-96 w-96 bg-base-100 shadow-xl max-md:w-11/12">
              <figure className="px-10 pt-10">
                <SiAzuredataexplorer className="text-9xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Explore custom puzzles</h2>
                <p>Take a look at puzzles made by the community</p>
                <div className="card-actions">
                  <button
                    className="btn-primary btn"
                    onClick={toggleShowExplorePuzzles}
                  >
                    Let's Go
                  </button>
                </div>
              </div>
            </div>

            <div className="card h-96 w-96 bg-base-100 shadow-xl max-md:w-11/12">
              <figure className="px-10 pt-10">
                <MdOutlineDesignServices className="text-9xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Create custom puzzle</h2>
                <p>Make your own puzzle</p>
                <div className="card-actions">
                  <button
                    className="btn-primary btn"
                    onClick={toggleShowCreatePuzzle}
                  >
                    Get Creative
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showExplorePuzzles && (
        <div className="flex flex-col items-center justify-center">
          <div className="grid w-fit grid-cols-3 gap-6 max-xl:grid-cols-2 max-lg:grid-cols-1">
            {customPuzzles.map((customPuzzle: PuzzleDto) => {
              let code: string[] = customPuzzle.snippet.split("\n");

              return (
                <div
                  key={customPuzzle.content}
                  className="card card-compact w-96 bg-base-100 px-2 shadow-xl"
                >
                  <div className="mockup-code opacity-50 transition hover:cursor-crosshair hover:opacity-100">
                    {code.map((line, rowIndex) => {
                      return (
                        <pre data-prefix="$" key={rowIndex}>
                          <code>{line}</code>
                        </pre>
                      );
                    })}
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{customPuzzle.content}</h2>
                    <div className="card-actions justify-end">
                      <button
                        className="btn-primary btn"
                        onClick={() =>
                          enterGame(customPuzzle.topic, customPuzzle.content)
                        }
                      >
                        Enter
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showCreatePuzzle && (
        <div className="flex min-h-screen w-full flex-col pb-4">
          <div className="mx-auto flex w-full items-center justify-center gap-20 px-2 max-md:flex-col max-md:gap-12">
            <div className="flex w-1/4 flex-col max-md:w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={customPuzzle.content}
                  placeholder="Title"
                  className="input-bordered input w-full"
                  onChange={(e) => {
                    setCustomPuzzle({
                      ...customPuzzle,
                      content: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Topic</span>
                </label>
                <input
                  type="text"
                  placeholder="Topic"
                  value={customPuzzle.topic}
                  className="input-bordered input w-full"
                  onChange={(e) => {
                    setCustomPuzzle({
                      ...customPuzzle,
                      topic: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Answer</span>
                </label>
                <input
                  type="text"
                  placeholder="Answer"
                  value={customPuzzle.answer}
                  className="input-bordered input w-full"
                  onChange={(e) => {
                    setCustomPuzzle({
                      ...customPuzzle,
                      answer: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Answer (index) - click on the code snippet to select</span>
                </label>
                <input
                  type="text"
                  placeholder="row: 0, col: 0"
                  value={`row: ${customPuzzle.correctCodeChunkIndex.row}, col: ${customPuzzle.correctCodeChunkIndex.col}`}
                  disabled
                  className="input-bordered input w-full"
                  onChange={(e) => {
                    setCustomPuzzle({
                      ...customPuzzle,
                      content: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Hint (e.g a syntax error or printed output)</span>
                </label>
                <input
                  type="text"
                  placeholder="row: 0, col: 0"
                  value={customPuzzle.hint}
                  className="input-bordered input w-full"
                  onChange={(e) => {
                    setCustomPuzzle({
                      ...customPuzzle,
                      hint: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Multi Choice Keywords (',' seperate)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="row: 0, col: 0"
                  value={customPuzzle.options}
                  className="input-bordered input w-full"
                  onChange={(e) => {
                    setCustomPuzzle({
                      ...customPuzzle,
                      options: e.target.value.split(","),
                    });
                  }}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Code snippet</span>
                </label>
                <textarea
                  className="textarea-bordered textarea"
                  value={customPuzzle.snippet.replace(/\t/g, "    ")}
                  onChange={(e) =>
                    setCustomPuzzle({
                      ...customPuzzle,
                      snippet: e.target.value.replace(/ {4}/g, "\t"),
                    })
                  }
                ></textarea>
              </div>
            </div>
            {customPuzzle && (
              <div className="mockup-code h-fit overflow-auto pr-10">
                <pre data-prefix="$" className="text-warning">
                  <code className="text-2xl max-md:text-lg">
                    {customPuzzle.content}
                  </code>
                </pre>
                <pre />
                {customPuzzle.snippet.split("\n").map((line, rowIndex) => {
                  return (
                    <pre data-prefix="$" key={rowIndex}>
                      <code>
                        {line.split(/(?=[\s()])+/).map((chunk, colIndex) => {
                          if (!chunk) return;
                          const spaces = chunk.split(/\S+/).filter(Boolean);
                          const text = chunk.split(/\s+/).filter(Boolean);
                          return (
                            <div
                              key={chunk + colIndex}
                              className="inline-block"
                            >
                              <span>{spaces}</span>
                              <label
                                className="btn-md btn p-0 text-xl lowercase max-md:text-sm"
                                onClick={() =>
                                  setCustomPuzzle({
                                    ...customPuzzle,
                                    correctCodeChunkIndex: {
                                      row: rowIndex,
                                      col: colIndex,
                                    },
                                  })
                                }
                              >
                                {text}
                              </label>
                            </div>
                          );
                        })}
                      </code>
                    </pre>
                  );
                })}
                <br />
              </div>
            )}
          </div>
          <button className="btn mt-10 w-fit self-center" onClick={save}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomPuzzles;
