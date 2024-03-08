// App.tsx
import { useState } from "react";
import PostsList from "./components/postsList";
import CommentsModal from "./components/commentsModal";
import { Post } from "./interface";
import "./App.css";

function App() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      <header>
        <h1>Danya message</h1>
      </header>
      <PostsList onPostClick={handlePostClick} />
      {selectedPost && (
        <CommentsModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
