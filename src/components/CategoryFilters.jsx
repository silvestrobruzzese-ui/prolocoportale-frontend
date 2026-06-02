// Category filter buttons - horizontal scrollable bar with pop style
import React from "react";

const CATEGORIES = [
  { key: "restaurant", value: "Restaurant", icon: "🍽", color: "#E63946" },
  { key: "pizzerie", value: "Pizzerie", icon: "🍕", color: "#FF6B35" },
  { key: "hotel", value: "Hotel", icon: "🏨", color: "#FFD700" },
  { key: "bb", value: "B&B", icon: "🛏", color: "#22C55E" },
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
        return (
          <button
            key={c.key}
            data-testid={`category-filter-${c.key}`}
            onClick={() => onChange(isActive ? null : c.value)}
            className={`category-btn flex-shrink-0 w-14 h-14 rounded-full text-2xl inline-flex items-center justify-center border-3 ${
              isActive ? "active" : ""
            }`}
            style={{
              backgroundColor: isActive ? c.color : "white",
              borderColor: c.color,
              borderWidth: "3px",
              animationDelay: `${index * 50}ms`,
            }}
            title={c.value}
          >
            <span
              className="drop-shadow-sm"
              style={{
                filter: isActive ? "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))" : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
              }}
            >
              {c.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { CATEGORIES };
