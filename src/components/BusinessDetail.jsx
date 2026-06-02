// Business detail sheet (full info, promo, navigate button)
import React from "react";
import { useI18n } from "@/lib/i18n";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Globe, MapPin, Navigation2, Clock, Heart, Sparkles, X } from "lucide-react";

const FALLBACK_IMG = "https://images.pexels.com/photos/7385395/pexels-photo-7385395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

function formatDistance(km) {
  if (km == null) return "—";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(2)} km`;
}

export default function BusinessDetail({ open, onClose, business, onNavigate, onToggleFavorite, isFavorite }) {
  const { t } = useI18n();
  if (!business) return null;
  const inProx = !!business.in_proximity;
  const base = Number(business.base_discount || 0);
  const bonus = Number(business.proximity_discount || 0);
  const eff = business.effective_discount != null ? Number(business.effective_discount) : base;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 overflow-y-auto rounded-t-3xl sm:rounded-l-3xl sm:rounded-t-none"
        data-testid="business-detail-sheet"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass inline-flex items-center justify-center"
          data-testid="business-detail-close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-56 bg-[var(--bg)]">
          <img
            src={business.image_url || FALLBACK_IMG}
            alt={business.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-4 right-4 bottom-3 flex items-end justify-between gap-3">
            <div>
              <Badge className="bg-white/90 text-[var(--text-primary)] hover:bg-white rounded-full mb-1">{business.category}</Badge>
              <h2 className="font-display text-2xl font-semibold text-white drop-shadow-md">{business.name}</h2>
            </div>
            {eff > 0 && (
              <div className={`px-3 py-2 rounded-full text-white font-bold shadow-lg ${inProx ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"}`}
                data-testid="proximity-discount-badge"
              >
                -{Math.round(eff)}%
              </div>
            )}
          </div>
        </div>

        <SheetHeader className="px-5 pt-5">
          <SheetTitle className="font-display">{business.name}</SheetTitle>
          <SheetDescription className="text-[var(--text-secondary)]">
            {business.description || business.promotion_description || ""}
          </SheetDescription>
        </SheetHeader>

        <div className="p-5 space-y-4">
          {/* Proximity panel */}
          <div className={`rounded-2xl p-4 border ${inProx ? "border-[var(--primary)] bg-[var(--proximity)]" : "border-[var(--border)] bg-white"}`}>
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
                {t("effective_discount")}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {t("distance")}: <span className="font-semibold text-[var(--text-primary)]">{formatDistance(business.distance_km)}</span>
              </div>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <div className="text-4xl font-display font-bold text-[var(--primary)]">{Math.round(eff)}%</div>
              <div className="text-sm text-[var(--text-secondary)] pb-1">
                {t("base_discount")} {base}% {bonus > 0 && `+ ${t("proximity_discount")} ${bonus}%`}
              </div>
            </div>
            <div className={`mt-2 text-sm font-medium ${inProx ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"}`}>
              {inProx ? `✓ ${t("within_radius")}` : t("outside_radius")}
            </div>
          </div>

          {business.promotion_title && (
            <div className="rounded-2xl p-4 bg-[var(--warning)]/30 border border-[var(--warning)]">
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                {business.promotion_title}
              </div>
              {business.promotion_description && (
                <div className="text-sm text-[var(--text-secondary)] mt-1">{business.promotion_description}</div>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm">
            {business.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <span>{business.address}{business.city ? `, ${business.city}` : ""}</span>
              </div>
            )}
            {business.hours && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <span>{business.hours}</span>
              </div>
            )}
            {business.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <a href={`tel:${business.phone}`} className="text-[var(--primary)] hover:underline">{business.phone}</a>
              </div>
            )}
            {business.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <a href={business.website} target="_blank" rel="noreferrer" className="text-[var(--primary)] hover:underline truncate">{business.website}</a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              onClick={() => onNavigate(business)}
              className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
              data-testid="business-navigate-btn"
            >
              <Navigation2 className="w-4 h-4 mr-2" /> {t("navigate")}
            </Button>
            <Button
              variant="outline"
              onClick={onToggleFavorite}
              className="rounded-full border-[var(--border)]"
              data-testid="business-favorite-btn"
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-[var(--primary)] text-[var(--primary)]" : ""}`} />
              {isFavorite ? t("remove_favorite") : t("add_favorite")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
