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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[999]">
      <div
        onClick={handleClick}
        className={`
          glass rounded-full px-6 py-4 flex items-center justify-center gap-2
          min-w-[320px] max-w-[90vw] h-[70px]
          cursor-pointer hover:scale-105 transition-all duration-300
          ${currentSponsor.url ? "hover:shadow-lg" : "cursor-default"}
        `}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease",
        }}
      >
        <img
          src={currentSponsor.logo}
          alt={currentSponsor.name}
          className="h-14 max-w-[85vw] object-contain"
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

      {/* Sponsor indicator dots */}
      {sponsors.length > 1 && (
        <div className="flex justify-center gap-1 mt-1">
          {sponsors.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-[var(--primary)] w-3" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
