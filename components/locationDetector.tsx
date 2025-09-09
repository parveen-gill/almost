"use client";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import "../styles/location.css";

export default function LocationDetector({ onDetect }: { onDetect?: (city: string) => void }) {
  const [location, setLocation] = useState<string>("Detecting...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Try server API first
            let res = await fetch(`/api/location?lat=${latitude}&lon=${longitude}`);
            let data = await res.json();

            // If server failed, fallback to direct call
            if (data?.error) {
              console.warn("⚠️ Server API failed, falling back to direct Nominatim");
              const fallback = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                {
                  headers: {
                    "User-Agent": "almostus.in/1.0 (contact@almostus.in)",
                    "Accept-Language": "en",
                  },
                }
              );
              data = await fallback.json();
            }

            const name =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              data?.address?.county ||
              data?.address?.state ||
              "Unknown";

            setLocation(name);
            if (onDetect) onDetect(name);
          } catch (err) {
            console.error("❌ Location detection failed:", err);
            setLocation("Unable to fetch city");
          }
        },
        () => setLocation("Permission denied")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, [onDetect]);

  return (
    <div className="location-box">
      <span className="location-icon"><CiLocationOn /></span>
      <span className="location-text">{location}</span>
    </div>
  );
}
