export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Props1 {
  post: Post;
  onClose: () => void;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Props2 {
  onPostClick: (post: Post) => void;
}
