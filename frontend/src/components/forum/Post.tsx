import { ForumPostDto } from "../../services/dto/forum-post.dto";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import { getCommentsByPostId } from "../../services/comment-service";
import { CommentDto } from "../../services/dto/comment.dto";
import { CreateCommentDto } from "../../services/dto/comment.dto";
import { UserDto } from "../../services/dto/user.dto";
import { createComment } from "../../services/comment-service";

interface PostProps {
  selectedPost: ForumPostDto | null;
}

function Post({ selectedPost }: PostProps) {
  const [comments, setComments] = useState<CommentDto[]>([]); // initialize comments as an empty array
  const [replyContent, setReplyContent] = useState("");

  let user: UserDto | null;
  try {
    user = JSON.parse(localStorage.getItem("user")!);
  } catch (e) {
    console.error("Error parsing user data: ", e);
    user = null;
  }

  useEffect(() => {
    async function fetchComments() {
      if (selectedPost) {
        const response = await getCommentsByPostId(selectedPost._id);
        setComments(response.data);
      }
    }
    fetchComments();
  }, [selectedPost]);

  const handleReply = async () => {
    if (!replyContent.trim()) {
      return; // If the content is empty or only spaces, don't proceed.
    }
    const dto: CreateCommentDto = {
      content: replyContent,
      creator: user ? user._id : "",
      post: selectedPost?._id,
    };
    try {
      const response = await createComment(dto);
      console.log("Comment created: ", response.data);
      window.location.reload();
      setReplyContent("");
    } catch (error) {
      console.error("Error creating comment: ", error);
    }
  };

  return (
    <div className="h-full w-full flex-grow rounded-none overflow-scroll">
      {selectedPost ? (
        <div className="card h-full w-full rounded-none bg-gray-600 text-neutral-content overflow-scroll">
          <div className="card-body">
            <h2 className="card-title">{selectedPost.title}</h2>
            <div>{selectedPost.content}</div>
            <div className="mockup-code mt-2 bg-accent text-primary-content">
              <pre>
                <code>{selectedPost.snippet}</code>
              </pre>
            </div>
            <div className="card-actions">
              <p className="author-name text-s mt-2">
                Author: {selectedPost.creator.username}
              </p>
              <textarea
                className="textarea-bordered textarea-xs w-full rounded-lg text-neutral text-xl"
                placeholder="Reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              ></textarea>
              <button className="btn-s btn-primary btn" onClick={handleReply}>
                Comment
              </button>
            </div>
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} level={0} />
            ))}
          </div>
        </div>
      ) : (
        <div className="card h-full w-full rounded-none bg-gray-600 text-neutral-content">
          <div className="card-body">
            <h2 className="card-title">No post selected</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
