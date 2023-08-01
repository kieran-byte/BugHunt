import { CreateCommentDto } from "../../services/dto/comment.dto";
import { useState } from "react";
import { createComment } from "../../services/comment-service";
import { CommentDto } from "../../services/dto/comment.dto";
import { useEffect } from "react";
import { getCommentsByParentCommentId } from "../../services/comment-service";
import { UserDto } from "../../services/dto/user.dto";

export default function Comment(props: { comment: CommentDto; level: number }) {
  let user: UserDto | null;
  try {
    user = JSON.parse(localStorage.getItem("user")!);
  } catch (e) {
    console.error("Error parsing user data: ", e);
    user = null;
  }

  const [replyContent, setReplyContent] = useState("");
  const [childComments, setChildComments] = useState<CommentDto[]>([]);
  const indentStyle = { marginLeft: `${props.level * 20}px` };

  useEffect(() => {
    getCommentsByParentCommentId(props.comment._id)
      .then((response) => {
        setChildComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching child comments: ", error);
      });
  }, [props.comment._id]);

  const handleReply = async () => {
    if (!replyContent.trim()) {
      return; // If the content is empty or only spaces, don't proceed.
    }
    const dto: CreateCommentDto = {
      content: replyContent,
      creator: user ? user._id : "",
      post: props.comment.post,
      parentComment: props.comment._id,
    };
    try {
      await createComment(dto);
      setReplyContent("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating comment: ", error);
    }
  };

  return (
    <div className="group relative mr-0 w-full pr-0">
      <div className="divider m-0"></div>
      <div
        tabIndex={0}
        className={`base-100 card rounded-box collapse mr-0 pr-0 text-neutral-content`}
        style={indentStyle}
      >
        <input type="checkbox" />
        <div className="collapse-title mr-0 flex items-center justify-between pr-4">
          <div>
            <h2 className="card-title">{props.comment.creator.username}</h2>
            <p>{props.comment.content}</p>
          </div>
        </div>
        <div className="collapse-content mr-0 w-full pr-0">
          <div className="form-control mt-2 flex flex-row">
            <textarea
              className="textarea-bordered textarea-xs h-12 w-full rounded-lg text-neutral text-xl"
              placeholder="Reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <button
              className="btn-default btn-s btn opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleReply}
            >
              Reply
            </button>
          </div>
          {childComments.length > 0 && (
            <>
              {childComments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  level={props.level + 1}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
