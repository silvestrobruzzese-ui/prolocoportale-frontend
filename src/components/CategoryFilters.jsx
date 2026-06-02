// Category filter buttons - horizontal scrollable bar
import React from "react";

const CATEGORIES = [
  { key: "restaurant", value: "Restaurant", icon: "🍽", color: "#E63946" },
  { key: "pizzerie", value: "Pizzerie", icon: "🍕", color: "#FF6B35" },
  { key: "hotel", value: "Hotel", icon: "🏨", color: "#FFD700" },
  { key: "bb", value: "B&B", icon: "🛏", color: "#228B22" },
  { key: "beni_culturali", value: "Beni Culturali", icon: "🏛", color: "#7B68EE" },
  { key: "itinerari", value: "Itinerari", icon: "🥾", color: "#2E8B57" },
  { key: "monumenti", value: "Monumenti", icon: "⛪", color: "#8B4513" },
  { key: "musei", value: "Musei", icon: "🏛", color: "#9C27B0" },
  { key: "spiagge", value: "Spiagge", icon: "🏖", color: "#00CED1" },
  { key: "archeologia", value: "Archeologia", icon: "🏺", color: "#FF8C00" },
  { key: "discoteche", value: "Discoteche", icon: "🎵", color: "#E040FB" },
  { key: "supermercati", value: "Supermercati", icon: "🛒", color: "#3498DB" },
  { key: "shop", value: "Shop", icon: "🛍", color: "#2A9D8F" },
  { key: "pharmacy", value: "Pharmacy", icon: "💊", color: "#4CAF50" },
  { key: "other", value: "Other", icon: "📍", color: "#6C757D" },
];

export default function CategoryFilters({ value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-3 py-2">
      {CATEGORIES.map((c) => {
        const isActive = c.value === value;
        return (
          <button
            key={c.key}
            data-testid={`category-filter-${c.key}`}
            onClick={() => onChange(isActive ? null : c.value)}
            className={`flex-shrink-0 w-12 h-12 rounded-full text-xl inline-flex items-center justify-center transition-all duration-200 border-2 ${
              isActive ? "scale-110 shadow-lg" : "shadow-md"
            }`}
            style={{
              backgroundColor: isActive ? c.color : "white",
              borderColor: c.color,
            }}
            title={c.value}
          >
            <span style={{ filter: isActive ? "brightness(0) invert(1)" : "none" }}>
              {c.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { CATEGORIES };
