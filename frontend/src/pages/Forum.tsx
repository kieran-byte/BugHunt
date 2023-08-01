
import { useState, useEffect } from "react";
import Post from "../components/forum/Post";
import CreateForumPostForm from "../components/forum/CreateForumPostForm";
import { getForumPosts } from "../services/forum-post-service";
import { ForumPostDto } from "../services/dto/forum-post.dto";
import Nav from "../components/Navbar";

const Forum = () => {
  const [posts, setPosts] = useState<ForumPostDto[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPostDto | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getForumPosts();
        setPosts(res.data);
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = async (post: ForumPostDto) => {
    setSelectedPost(post);
  };

  return (
    <div>
      <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open a post
        </label>
        <Post selectedPost={selectedPost} />
        <CreateForumPostForm />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <label htmlFor="create-forum-post-modal" className="btn">
            Create Post
          </label>
          {posts.map((post) => (
            <li key={post._id} onClick={() => handlePostClick(post)}>
              <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p className="overflow-hidden">{post.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Forum;
