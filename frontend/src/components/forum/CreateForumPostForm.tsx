import React, { useState } from "react";
import { createForumPost } from "../../services/forum-post-service";
import { CreateForumPostDto } from "../../services/dto/forum-post.dto";
import { UserDto } from "../../services/dto/user.dto";

interface CreateForumPostFormProps {}

const CreateForumPostForm: React.FC<CreateForumPostFormProps> = ({}) => {
  let user: UserDto | null;
  try {
    user = JSON.parse(localStorage.getItem("user")!);
  } catch (e) {
    console.error("Error parsing user data: ", e);
    user = null;
  }

  const initialFormState = {
    title: "",
    content: "",
    creator: user ? user._id : "",
    snippet: "",
  };

  const [formState, setFormState] =
    useState<CreateForumPostDto>(initialFormState);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createForumPost(formState);
      setFormState(initialFormState);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="create-forum-post-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-2xl">Create New Post</h2>
          <form onSubmit={handleSubmit} className="form-control">
            {/* Form fields... */}
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                name="title"
                placeholder="Title"
                value={formState.title}
                onChange={handleInputChange}
                className="input-bordered input w-full max-w-lg text-lg"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                name="content"
                placeholder="Content"
                value={formState.content}
                onChange={handleInputChange}
                className="textarea-bordered textarea h-24 w-full max-w-lg overflow-y-scroll text-lg"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Snippet (Optional)</span>
              </label>
              <textarea
                name="snippet"
                placeholder="Snippet"
                value={formState.snippet}
                onChange={handleInputChange}
                className="textarea-bordered textarea h-24 w-full max-w-lg overflow-y-scroll text-lg"
              />
            </div>

            <div className="modal-action">
              <label
                htmlFor="create-forum-post-modal"
                className="btn"
                onClick={handleSubmit}
              >
                Post
              </label>
              <label htmlFor="create-forum-post-modal" className="btn">
                Close
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateForumPostForm;
