import React, { useContext, useState } from "react";
import { createComment } from "../../services/comment-service";
//import { CommentContext } from "../ContextComment";
//import data from "../data/data.json";
//import { v4 as uuidv4 } from "uuid";
//import { formatDistanceToNow } from "date-fns";

const CommentMessage = () => {
  //const { AddComment } = useContext(CommentContext);
  //const timeAgo = formatDistanceToNow(new Date());
  const [newComment, setNewComment] = useState({
    id: "",
    content: "",
    createdAt: "",
    score: 0,
    //user: data.currentUser,
    replies: [],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    //AddComment(newComment);
    const postComment = async () => {
      const message = {
        content: "asdf5",
        creator: "64744f204ed4163fea2d05c6",
        puzzle: "64744f204ed4163fea2d05c6",
      };
      const data = await createComment(message);
    };
    postComment();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewComment({
      ...newComment,
      //id: uuidv4(),
      //createdAt: timeAgo,
      [name]: value,
    });
  };

  return (
    <form
      className="flex gap-3 rounded-md bg-neutral px-4 py-4 shadow-sm"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        id="default-input"
        value={newComment.content}
        name="content"
        onChange={handleChange}
        placeholder="Write your comment..."
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
      />

      <div>
        <button
          type="submit"
          className="rounded bg-[#5357b7] p-2.5 px-6 py-3 text-center text-sm font-medium text-white hover:bg-[#3a3eb1] focus:outline-none"
        >
          SEND
        </button>
      </div>
    </form>
  );
};

export default CommentMessage;
