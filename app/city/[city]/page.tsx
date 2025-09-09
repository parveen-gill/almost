import { getPosts } from "../../../lib/api";
import PostCard from "../../../components/PostCard";

interface Props {
  params: { city: string };
}

export default async function CityPage({ params }: Props) {
  const { city } = params;
  const posts = await getPosts();

  // filter only city posts
  const filtered = posts.filter((p) => p.location.toLowerCase() === city.toLowerCase());

  return (
    <div>
      <h1>Posts in {city}</h1>

      {filtered.length > 0 ? (
        filtered.map((post) => (
          <PostCard key={post.id} post={post} isLoggedIn={false} />
        ))
      ) : (
        <p>No posts found in {city}.</p>
      )}
    </div>
  );
}
