import CodeSnippet from "../components/game/CodeSnippet";
import { useState, useEffect, useRef } from "react";
import { ImSad2 } from "react-icons/im";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PuzzleDto } from "../services/dto/puzzle.dto";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ToggleTheme from "../components/ToggleTheme";
import { getPuzzleByTopicAndTask } from "../services/puzzle-service";
import {
  getComments,
  getComment,
  createComment,
} from "../services/comment-service";
import CommentMessage from "../components/comments/CommentMessage";
import Comment from "../components/comments/Comment";
import { CreateCommentDto } from "../services/dto/comment.dto";
import Help from "../components/Help";
import {openHelp} from "../components/Help";

const Game = () => {
  const { topic, task } = useParams();
  const [passed, setPassed] = useState<boolean | null>(null);
  const [puzzle, setPuzzle] = useState<PuzzleDto | null>(null);
  const [comments, setComments] = useState<CreateCommentDto[] | null>(null);
  const navigate = useNavigate();

  const arrowKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (arrowKeys.includes(e.key)) {
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  useEffect(() => {
    const fetchAndSetPuzzle = async () => {
      if (topic == null || task == null) return;
      const data = await getPuzzleByTopicAndTask(topic, task);
      setPuzzle(data);
    };

    fetchAndSetPuzzle();
  }, [topic, task]);

  useEffect(() => {
    const fetchAndSetComments = async () => {
      const data = await getComments();
      let tempComments: CreateCommentDto[] = [];
      data.data.map((comment: any) => {
        let tempComment: CreateCommentDto = {} as CreateCommentDto;

        tempComment.content = comment.content;
        tempComment.creator = comment.creator;
        tempComment.post = comment.post;
        tempComments.push(tempComment);
      });

      setComments(tempComments);
    };
    if (puzzle != null) {
      //todo
      fetchAndSetComments();
    }
  }, [topic, task, puzzle]);

  return (
    <div className="min-h-screen ">
      <div className="absolute left-0 top-0 flex w-full justify-between p-2">
        <AiOutlineArrowLeft
          className="animate-pulse cursor-pointer text-4xl animate-slow animate-infinite"
          onClick={() => navigate(-1)}
        />
        <ToggleTheme />
        <Help isAutoOpen={puzzle?.content=="Hello World!"}/>
      </div>

      {puzzle && (
        <div>
          <CodeSnippet
            puzzle={puzzle}
            passed={passed}
            handleSetPassed={setPassed}
            props={location.state}
          />

          <div>
            <CommentMessage />
            <div className="flex flex-col items-center justify-center">
              {comments?.map((comment) => (
                <Comment message={comment.content} />
              ))}
            </div>
          </div>
        </div>
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="card w-96 max-w-screen-sm animate-slideInUp rounded-none rounded-t-2xl bg-neutral text-neutral-content">
              <div className="card-body items-center pb-2 text-center">
                <h2 className="card-title mb-2">
                  {passed ? "Go back?" : "Try again?"}
                </h2>
                <div className="card-actions justify-end">
                  <button
                    className="btn-primary btn"
                    onClick={() => {
                      if (!passed) {
                        setPassed(null);
                      } else {
                        navigate(-1)
                      }
                    }}
                  >
                    Accept
                  </button>
                  {!passed && (
                    <button
                      className="btn-ghost btn"
                      onClick={() => navigate(-1)}
                    >
                      Deny
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};



export default Game;
