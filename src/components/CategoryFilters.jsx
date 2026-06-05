// Category filter buttons - horizontal scrollable bar with pop style
import React from "react";

// SVG Hiker Icon Component - Orange body with blue backpack
const HikerIcon = ({ size = 24, isActive = false }) => {
  const orangeColor = isActive ? "#FFFFFF" : "#F97316"; // Orange for body
  const blueColor = isActive ? "#FFFFFF" : "#38BDF8";   // Sky blue for backpack
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="12" cy="3.5" r="2.5" fill={orangeColor} />
      {/* Backpack */}
      <path d="M7 8C7 7 7.5 6 9 6L9 12L7 11L7 8Z" fill={blueColor} />
      <rect x="6.5" y="7" width="3" height="5" rx="1" fill={blueColor} />
      {/* Body */}
      <path d="M12 6.5L12 11L9.5 11" stroke={orangeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Walking stick */}
      <path d="M15 8L17.5 18" stroke={orangeColor} strokeWidth="2" strokeLinecap="round" />
      {/* Arm to stick */}
      <path d="M12 9L15 8" stroke={orangeColor} strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <path d="M12 11L14 16L16 21" stroke={orangeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11L9 16L7 21" stroke={orangeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CATEGORIES = [
  { key: "restaurant", value: "Restaurant", icon: "🍽", color: "#E63946" },
  { key: "pizzerie", value: "Pizzerie", icon: "🍕", color: "#FF6B35" },
  { key: "hotel", value: "Hotel", icon: "🏨", color: "#FFD700" },
  { key: "bb", value: "B&B", icon: "B&B", color: "#22C55E" },
  { key: "sentieri", value: "Sentieri e Cammini", icon: "hiker", color: "#F97316", secondColor: "#38BDF8", isSvg: true },
  { key: "beni_culturali", value: "Beni Culturali", icon: "🏛", color: "#8B5CF6" },
  { key: "itinerari", value: "Itinerari", icon: "🥾", color: "#10B981" },
  { key: "monumenti", value: "Monumenti", icon: "⛪", color: "#A855F7" },
  { key: "musei", value: "Musei", icon: "🏛", color: "#EC4899" },
  { key: "spiagge", value: "Spiagge", icon: "🏖", color: "#06B6D4" },
  { key: "archeologia", value: "Archeologia", icon: "🏺", color: "#F59E0B" },
  { key: "discoteche", value: "Discoteche", icon: "🎵", color: "#D946EF" },
  { key: "supermercati", value: "Supermercati", icon: "🛒", color: "#3B82F6" },
  { key: "shop", value: "Shop", icon: "🛍", color: "#14B8A6" },
  { key: "pharmacy", value: "Pharmacy", icon: "💊", color: "#22C55E" },
  { key: "other", value: "Other", icon: "📍", color: "#6366F1" },
];

export default function CategoryFilters({ value, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-3">
      {CATEGORIES.map((c, index) => {
        const isActive = c.value === value;
        const isTextIcon = !c.isSvg && c.icon.length > 2; // "B&B" is text, not emoji
        const hasDualColor = c.secondColor;

        // Style for dual-color gradient border (Sentieri e Cammini)
        const dualColorStyle = hasDualColor ? {
          background: isActive
            ? `linear-gradient(135deg, ${c.color} 0%, ${c.secondColor} 100%)`
            : "white",
          border: "none",
          boxShadow: isActive
            ? "none"
            : `inset 0 0 0 3px ${c.color}, inset 0 0 0 3px ${c.secondColor}`,
          backgroundImage: isActive
            ? `linear-gradient(135deg, ${c.color} 0%, ${c.secondColor} 100%)`
            : `linear-gradient(white, white), linear-gradient(135deg, ${c.color} 0%, ${c.secondColor} 100%)`,
          backgroundOrigin: "border-box",
          backgroundClip: isActive ? "border-box" : "padding-box, border-box",
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: "transparent",
        } : {};

        return (
          <button
            key={c.key}
            data-testid={`category-filter-${c.key}`}
            onClick={() => onChange(isActive ? null : c.value)}
            className={`category-btn flex-shrink-0 w-14 h-14 rounded-full inline-flex items-center justify-center ${
              isActive ? "active" : ""
            } ${isTextIcon ? "text-sm font-bold" : "text-2xl"}`}
            style={{
              backgroundColor: !hasDualColor ? (isActive ? c.color : "white") : undefined,
              borderColor: !hasDualColor ? c.color : undefined,
              borderWidth: !hasDualColor ? "3px" : undefined,
              borderStyle: !hasDualColor ? "solid" : undefined,
              animationDelay: `${index * 50}ms`,
              color: isTextIcon && !isActive ? c.color : undefined,
              ...dualColorStyle,
            }}
            title={c.value}
          >
            {c.isSvg ? (
              <HikerIcon isActive={isActive} size={28} />
            ) : (
              <span
                className="drop-shadow-sm"
                style={{
                  filter: isActive ? "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))" : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif',
                }}
              >
                {c.icon}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { CATEGORIES, HikerIcon };
