// Business card list (sidebar / bottom sheet contents)
import React from "react";
import { useI18n } from "@/lib/i18n";
import { MapPin, Tag, Sparkles } from "lucide-react";

const FALLBACK_IMG = "https://images.pexels.com/photos/7385395/pexels-photo-7385395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

function formatDistance(km) {
  if (km == null) return null;
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export default function BusinessList({ businesses, onSelect, selectedId, emptyState }) {
  const { t } = useI18n();

  if (!businesses || businesses.length === 0) {
    return (
      <div data-testid="business-list-empty" className="p-8 text-center text-[var(--text-secondary)]">
        <div className="text-5xl mb-3">🌿</div>
        <div className="font-medium text-[var(--text-primary)]">{t("no_results")}</div>
        {emptyState && <div className="text-sm mt-2">{emptyState}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-3" data-testid="business-list">
      {businesses.map((b) => {
        const inProx = !!b.in_proximity;
        const eff = b.effective_discount != null ? b.effective_discount : b.base_discount;
        const isSelected = selectedId === b.business_id;
        return (
          <button
            key={b.business_id}
            data-testid={`business-card-${b.business_id}`}
            onClick={() => onSelect(b.business_id)}
            className={`text-left bg-white rounded-2xl border transition-all duration-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 ${
              isSelected ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20" : "border-[var(--border)]"
            }`}
          >
            <div className="flex gap-3 p-3">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--bg)] flex-shrink-0">
                <img
                  src={b.image_url || FALLBACK_IMG}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display font-semibold text-[var(--text-primary)] leading-tight truncate">
                    {b.name}
                  </div>
                  {eff > 0 && (
                    <div className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                      inProx ? "bg-[var(--primary)] text-white shadow-sm" : "bg-[var(--secondary)]/20 text-[var(--secondary-hover)]"
                    }`}>
                      -{Math.round(eff)}%
                    </div>
                  )}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5 truncate flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {b.category}
                  {b.city && <span className="opacity-60">• {b.city}</span>}
                </div>
                {b.promotion_title && (
                  <div className="text-xs text-[var(--text-primary)] mt-1.5 line-clamp-2 flex items-start gap-1">
                    <Sparkles className="w-3 h-3 flex-shrink-0 mt-0.5 text-[var(--primary)]" />
                    <span className="truncate">{b.promotion_title}</span>
                  </div>
                )}
                {b.distance_km != null && (
                  <div className="text-xs mt-1.5 inline-flex items-center gap-1 text-[var(--text-secondary)]">
                    <MapPin className="w-3 h-3" />
                    {formatDistance(b.distance_km)}
                    {inProx && (
                      <span className="ml-2 text-[var(--primary)] font-semibold">
                        {t("discount_active_here")}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
