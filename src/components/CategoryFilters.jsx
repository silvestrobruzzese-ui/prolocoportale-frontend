// Category filter buttons - horizontal scrollable bar with pop style
import React from "react";

// SVG Column Icon Component - Greek/Roman column for Beni Culturali
const ColumnIcon = ({ size = 24, isActive = false }) => {
  const color = isActive ? "#FFFFFF" : "#8B5CF6"; // Viola for Beni Culturali
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capital - top scrolls */}
      <path d="M4 6C4 5 5 4 6 4.5C6.5 4.7 6.5 5.5 6 6C5.5 6.5 5 6.5 5 7H19C19 6.5 18.5 6.5 18 6C17.5 5.5 17.5 4.7 18 4.5C19 4 20 5 20 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Capital base */}
      <rect x="5" y="7" width="14" height="2" rx="0.5" fill={color}/>
      {/* Column shaft with fluting */}
      <rect x="6" y="9" width="12" height="12" fill={color}/>
      {/* Fluting lines */}
      <line x1="8.5" y1="9" x2="8.5" y2="21" stroke={isActive ? "#8B5CF6" : "white"} strokeWidth="1"/>
      <line x1="12" y1="9" x2="12" y2="21" stroke={isActive ? "#8B5CF6" : "white"} strokeWidth="1"/>
      <line x1="15.5" y1="9" x2="15.5" y2="21" stroke={isActive ? "#8B5CF6" : "white"} strokeWidth="1"/>
      {/* Base */}
      <rect x="5" y="21" width="14" height="2" rx="0.5" fill={color}/>
    </svg>
  );
};

// SVG Hiker Icon Component - Stylized hiker matching reference image
const HikerIcon = ({ size = 24, isActive = false }) => {
  const orangeColor = isActive ? "#FFFFFF" : "#E8945A"; // Coral/orange for body
  const blueColor = isActive ? "#FFFFFF" : "#5BA4B5";   // Muted blue for backpack
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="13" cy="3" r="2.5" fill={orangeColor} />
      {/* Backpack */}
      <path d="M8 7.5C8 6.5 8.5 6 9.5 6C9.5 6 10 6 10 7L10 12L8.5 12.5L8 7.5Z" fill={blueColor} />
      <rect x="7.5" y="7" width="3" height="6" rx="1.5" fill={blueColor} />
      {/* Torso - leaning forward */}
      <path d="M13 5.5C13 5.5 12 8 11 10C10.5 11 10 12 10 12" stroke={orangeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Back arm */}
      <path d="M11.5 8L9 10" stroke={orangeColor} strokeWidth="2" strokeLinecap="round" />
      {/* Front arm holding stick */}
      <path d="M12 8L15 7" stroke={orangeColor} strokeWidth="2" strokeLinecap="round" />
      {/* Walking stick */}
      <path d="M15 7L18 20" stroke={orangeColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* Back leg - stepping */}
      <path d="M10 12L7 17L5 21" stroke={orangeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Front leg - extended */}
      <path d="M10 12L13 17L15 21" stroke={orangeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CATEGORIES = [
  { key: "restaurant", value: "Restaurant", icon: "🍽", color: "#E63946" },
  { key: "pizzerie", value: "Pizzerie", icon: "🍕", color: "#FF6B35" },
  { key: "hotel", value: "Hotel", icon: "🏨", color: "#FFD700" },
  { key: "bb", value: "B&B", icon: "B&B", color: "#22C55E" },
  { key: "sentieri", value: "Sentieri e Cammini", icon: "hiker", color: "#F97316", secondColor: "#38BDF8", isSvg: true },
  { key: "beni_culturali", value: "Beni Culturali", icon: "column", color: "#8B5CF6", isSvg: true },
  { key: "itinerari", value: "Itinerari", icon: "🥾", color: "#10B981" },
  { key: "monumenti", value: "Monumenti", icon: "⛪", color: "#A855F7" },
  { key: "musei", value: "Musei", icon: "🏛", color: "#EC4899" },
  { key: "spiagge", value: "Spiagge", icon: "🏖", color: "#06B6D4" },
  { key: "bandiera_blu", value: "Bandiera Blu", icon: "/bandiera-blu-logo.jpg", color: "#0077B6", isImage: true },
  { key: "bandiera_verde", value: "Bandiera Verde", icon: "/bandiera-verde-logo.jpg", color: "#2E7D32", isImage: true },
  { key: "archeologia", value: "Archeologia", icon: "🏺", color: "#F59E0B" },
  { key: "discoteche", value: "Discoteche", icon: "🎵", color: "#D946EF" },
  { key: "supermercati", value: "Supermercati", icon: "🛒", color: "#3B82F6" },
  { key: "shop", value: "Shop", icon: "🛍", color: "#14B8A6" },
  { key: "pharmacy", value: "Pharmacy", icon: "💊", color: "#22C55E" },
  { key: "bancomat", value: "Bancomat", icon: "/bcc-logo.png", color: "#00843D", isImage: true },
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
              c.icon === "column" ? <ColumnIcon isActive={isActive} size={28} /> : <HikerIcon isActive={isActive} size={28} />
            ) : c.isImage ? (
              <img
                src={c.icon}
                alt={c.value}
                className="w-10 h-10 object-contain"
              />
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

export { CATEGORIES, HikerIcon, ColumnIcon };
