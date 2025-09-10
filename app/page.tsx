"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import LocationDetector from "../components/locationDetector";
import { getPosts } from "../lib/api";
import PostCard from "../components/PostCard";
import FilterSidebar from "../components/FilterSidebar";
export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [detectedCity, setDetectedCity] = useState<string>("");

  const isLoggedIn = false;

  // ✅ Load posts once (all posts)
  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await getPosts();
      setPosts(allPosts);
    }
    fetchPosts();
  }, []);

  // ✅ Filter posts by detected location
  const filteredPosts = detectedCity
    ? posts.filter((p) => p.location?.toLowerCase() === detectedCity.toLowerCase())
    : posts;

  // ✅ Group posts by city (for city cards)
  const cityMap: Record<string, number> = {};
  posts.forEach((p) => {
    if (p.location) {
      cityMap[p.location] = (cityMap[p.location] || 0) + 1;
    }
  });

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-content">
          <h1>Reconnect with Missed Connections</h1>
          <p>Discover stories and encounters in your city</p>
          {/* Pass setDetectedCity */}
          <LocationDetector onDetect={setDetectedCity} />
        </div>
      </section>

      {/* City Grid */}
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

      {/* Post Feed */}
      <section className="post-section">
        <h2 className="section-title">
          {detectedCity ? `Posts in ${detectedCity}` : "Latest Posts"}
        </h2>

        <div className="post-layout">
          {/* ✅ Sidebar Component */}
          <FilterSidebar />

          {/* Posts */}
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
