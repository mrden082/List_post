import axios from "axios";
import { useQuery } from "react-query";
import { Props1, Comment } from "../../interface";
import "../../App.css";

async function getComments(postId: number) {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return data;
  } catch (error) {
    throw new Error("Ошибка");
  }
}

function CommentsModal({ post, onClose }: Props1) {
  const { data, isLoading, isError } = useQuery(["comments", post.id], () =>
    getComments(post.id)
  );

  if (isLoading) {
    return <h3>Загрузка...</h3>;
  }

  if (isError) {
    return <h3>Ошибка данных</h3>;
  }

  if (!data || data.length === 0) {
    return <h3>Комментариев нет</h3>;
  }

  return (
    <div className="comments-modal">
      <div className="modal-content">
      <button onClick={onClose} className="modal-close">
        X
      </button>
      <div className="post-content">
        <h2 className="tittle-post">Post</h2>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      {data.map((comment: Comment) => (
        <div key={comment.id} className="comment">
          <h3 className="comment-email">{comment.email}</h3>
          <h2 className="comment-name">{comment.name}</h2>
          <p className="comment-text">{comment.body}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default CommentsModal;
