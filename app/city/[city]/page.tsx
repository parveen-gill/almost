import { getPosts } from "../../../lib/api";
import PostCard from "../../../components/PostCard";
import FilterSidebar from "../../../components/FilterSidebar";
interface Props {
  params: { city: string };
}

export default async function CityPage({ params }: Props) {
  const { city } = params;
  const isLoggedIn = false; // Simulate logged-in status
  const posts = await getPosts();

  // filter only city posts
  const filtered = posts.filter((p) => p.location.toLowerCase() === city.toLowerCase());

  return (
    <div>
     

      <section className="post-section">
               <h1>Posts in {city}</h1>
              <div className="post-layout">
                {/* ✅ Sidebar Component */}
                <FilterSidebar />
      
                {/* Posts */}
                <div className="post-feed">
                  {filtered.map((post) => (
                    <PostCard key={post.id} post={post} isLoggedIn={isLoggedIn} />
                  ))}
                </div>
              </div>
            </section>
    </div>
  );
}
