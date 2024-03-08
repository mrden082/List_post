import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Props2, Post } from "../../interface";
import "../../App.css";

async function getPosts(skip = 0) {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${skip}&_limit=15`
    );
    return data;
  } catch (error) {
    throw new Error("Ошибка");
  }
}

function PostsList({ onPostClick }: Props2) {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useQuery(["posts", page], () =>
    getPosts(page)
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 15);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 15);
  };

  if (isLoading) {
    return <h3>Загрузка...</h3>;
  }

  if (isError) {
    return <h3>Ошибка данных</h3>;
  }

  if (!data || data.length === 0) {
    return <h3>Постов нет</h3>;
  }

  const prev = "<";
  const next = ">";

  return (
    <div className="list-content">
      {data.map((post: Post) => (
        <div
          key={post.id}
          onClick={() => onPostClick(post)}
          className="list-item"
        >
          <h2 className="list-title">{post.title}</h2>
          <p className="list-text">{post.body}</p>
        </div>
      ))}
      <div className="navigation">
      <button
        className="btn-navigation"
        onClick={handlePrevPage}
        disabled={page === 0}
      >
        {prev}
      </button>
      <button
        className="btn-navigation"
        onClick={handleNextPage}
        disabled={!data || data.length < 15}
      >
        {next}
      </button>
      </div>
    </div>
  );
}

export default PostsList;
