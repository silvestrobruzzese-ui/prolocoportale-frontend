// SponsorBanner - Rotating sponsor logos carousel
import React, { useState, useEffect } from "react";

// Sponsor logos from public/sponsor folder
// Add your sponsor logos here - they will rotate every 3 seconds
const SPONSORS = [
  // { id: "sponsor1", logo: "/sponsor/sponsor1.png", name: "Sponsor 1", url: "https://..." },
  // { id: "sponsor2", logo: "/sponsor/sponsor2.png", name: "Sponsor 2", url: "https://..." },
];

export default function SponsorBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [sponsors, setSponsors] = useState(SPONSORS);

  // Load sponsors dynamically from sponsor folder
  useEffect(() => {
    // Try to fetch sponsor list from a JSON file
    fetch("/sponsor/sponsors.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSponsors(data);
        }
      })
      .catch(() => {
        // No sponsors.json found, use static SPONSORS array
      });
  }, []);

  // Rotate sponsors every 3 seconds
  useEffect(() => {
    if (sponsors.length <= 1) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // After fade out, change sponsor and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sponsors.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  // Don't render if no sponsors
  if (sponsors.length === 0) return null;

  const currentSponsor = sponsors[currentIndex];

  const handleClick = () => {
    if (currentSponsor.url) {
      window.open(currentSponsor.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="absolute bottom-[300px] left-3 z-[999]">
      <div
        onClick={handleClick}
        className={`
          rounded-full px-2 flex items-center justify-center
          min-w-[280px] max-w-[360px] h-[70px]
          cursor-pointer hover:scale-105 transition-all duration-300
          ${currentSponsor.url ? "hover:shadow-lg" : "cursor-default"}
        `}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "none",
        }}
      >
        <img
          src={currentSponsor.logo}
          alt={currentSponsor.name}
          className="h-[65px] w-auto max-w-[350px] object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {currentSponsor.showName && (
          <span className="text-sm font-medium text-gray-700 truncate">
            {currentSponsor.name}
          </span>
        )}
      </div>

    </div>
  );
}
