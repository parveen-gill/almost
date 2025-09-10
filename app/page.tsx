"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import LocationDetector from "../components/locationDetector";
import { getPosts } from "../lib/api";
import PostCard from "../components/PostCard";
import FilterSidebar from "../components/FilterSidebar";

// Define Post type
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

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [detectedCity, setDetectedCity] = useState<string>("");

  const isLoggedIn = false;

  useEffect(() => {
    async function fetchPosts() {
      const allPosts: Post[] = await getPosts();
      setPosts(allPosts);
    }
    fetchPosts();
  }, []);

  const filteredPosts = detectedCity
    ? posts.filter((p) => p.location?.toLowerCase() === detectedCity.toLowerCase())
    : posts;

  const cityMap: Record<string, number> = {};
  posts.forEach((p) => {
    if (p.location) {
      cityMap[p.location] = (cityMap[p.location] || 0) + 1;
    }
  });

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Reconnect with Missed Connections</h1>
          <p>Discover stories and encounters in your city</p>
          <LocationDetector onDetect={setDetectedCity} />
        </div>
      </section>

      <section className="city-section">
        <h2 className="section-title">Explore by City</h2>
        <div className="city-grid">
          {Object.entries(cityMap).map(([city, count]) => (
            <Link key={city} href={`/city/${city}`} className="city-card">
              <div className="city-img">
                <img src={`/cities/${city.toLowerCase()}.jpg`} alt={city} />
              </div>
              <div className="city-info">
                <h3>{city}</h3>
                <p>{count}+ Posts</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="post-section">
        <h2 className="section-title">
          {detectedCity ? `Posts in ${detectedCity}` : "Latest Posts"}
        </h2>

        <div className="post-layout">
          <FilterSidebar />
          <div className="post-feed">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
