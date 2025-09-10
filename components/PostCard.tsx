import Link from "next/link";
import "../styles/postcard.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
interface Post {
  id: number;
  title: string;
  content: string;
  location: string;
  likes: number;
  comments: number;
  username: string; 
  profilePic?: string; 
}

export default function PostCard({ post, isLoggedIn }: { post: Post; isLoggedIn: boolean }) {
  // Masked username -> first 2 letters then ****
  const maskedName =
    post.username.length > 2
      ? post.username.slice(0, 2) + "****"
      : post.username + "****";

  return (
    <div className="postcard">
      {/* User Info */}
      <div className="user-info">
        {post.profilePic ? (
          <img src={post.profilePic} alt={post.username} className="avatar" />
        ) : (
          <div className="avatar-fallback">
            {post.username.slice(0, 2).toUpperCase()}
          </div>
        )}
        <span className="username">{maskedName}</span>
      </div>

      {/* Post Content */}
      <h2>{post.title}</h2>
      <p className="location">{post.location}</p>

      <div className={`content ${!isLoggedIn ? "blurred" : ""}`}>
        <p className={!isLoggedIn ? "clamp" : ""}>{post.content}</p>

        {!isLoggedIn && (
          <div className="overlay">
            <Link href="/login" className="continue-btn">
              Continue Reading ▼
            </Link>
          </div>
        )}
      </div>

      {/* Likes + Comments */}
      <div className="meta">
        <span><FaRegHeart/> {post.likes}</span>
        <span><FaRegComment/>{post.comments}</span>
      </div>
    </div>
  );
}
