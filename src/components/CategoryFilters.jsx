// Category filter buttons - vertical sidebar
import React from "react";
import { useI18n } from "@/lib/i18n";

const CATEGORIES = [
  { key: "restaurant", value: "Restaurant", icon: "🍽", color: "#E63946" },
  { key: "pizzerie", value: "Pizzerie", icon: "🍕", color: "#FF6B35" },
  { key: "hotel", value: "Hotel", icon: "🏨", color: "#FFD700" },
  { key: "bb", value: "B&B", icon: "🛏", color: "#228B22" },
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
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 p-2">
      {CATEGORIES.map((c) => {
        const isActive = c.value === value;
        return (
          <button
            key={c.key}
            data-testid={`category-filter-${c.key}`}
            onClick={() => onChange(isActive ? null : c.value)}
            className={`h-12 px-4 rounded-xl text-sm font-medium whitespace-nowrap inline-flex items-center gap-3 transition-all duration-200 border-2 ${
              isActive
                ? "text-white shadow-lg scale-105"
                : "bg-white/90 text-[var(--text-primary)] border-transparent hover:scale-102 hover:shadow-md"
            }`}
            style={{
              backgroundColor: isActive ? c.color : undefined,
              borderColor: isActive ? c.color : "transparent",
            }}
          >
            <span className="text-xl">{c.icon}</span>
            <span className="hidden xl:inline">{t(c.key)}</span>
          </button>
        );
      })}
    </div>
  );
}

export { CATEGORIES };
