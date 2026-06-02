// Business detail sheet (full info, promo, navigate button)
import React, { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { translateFields } from "@/lib/translate";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Globe, MapPin, Navigation2, Clock, Heart, Sparkles, X, Loader2 } from "lucide-react";

function formatDistance(km) {
  if (km == null) return "—";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(2)} km`;
}

// Fields to translate
const TRANSLATABLE_FIELDS = ["name", "description", "promotion_title", "promotion_description", "address", "city", "hours"];

export default function BusinessDetail({ open, onClose, business, onNavigate, onToggleFavorite, isFavorite }) {
  const { t, lang } = useI18n();
  const [translatedBusiness, setTranslatedBusiness] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // Translate business content when language changes or business changes
  useEffect(() => {
    if (!business || !open) {
      setTranslatedBusiness(null);
      return;
    }

    // If Italian, no translation needed
    if (lang === "it") {
      setTranslatedBusiness(business);
      return;
    }

    // Translate the content
    setIsTranslating(true);
    translateFields(business, TRANSLATABLE_FIELDS, lang)
      .then((translated) => {
        setTranslatedBusiness(translated);
      })
      .catch(() => {
        setTranslatedBusiness(business); // Fallback to original
      })
      .finally(() => {
        setIsTranslating(false);
      });
  }, [business, lang, open]);

  if (!business) return null;

  // Use translated content or original
  const biz = translatedBusiness || business;

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
        {/* Close button - prominent at top */}
        <div className="p-4 pb-2 flex items-center justify-between border-b border-[var(--border)]">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[var(--primary)] font-medium"
            data-testid="business-detail-close"
          >
            <X className="w-5 h-5" />
            <span>{t("back")}</span>
          </button>
          <div className="flex items-center gap-2">
            {isTranslating && (
              <Loader2 className="w-4 h-4 animate-spin text-[var(--text-secondary)]" />
            )}
            {eff > 0 && (
              <div className={`px-3 py-1.5 rounded-full text-white font-bold text-sm ${inProx ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"}`}
                data-testid="proximity-discount-badge"
              >
                -{Math.round(eff)}%
              </div>
            )}
          </div>
        </div>

        <div className="p-5 pt-4 pb-0">
          <Badge className="bg-[var(--bg)] text-[var(--text-secondary)] rounded-full mb-2">{business.category}</Badge>
          <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">{biz.name}</h2>
          {(biz.description || biz.promotion_description) && (
            <p className="text-sm text-[var(--text-secondary)] mt-1">{biz.description || biz.promotion_description}</p>
          )}
        </div>

        <SheetHeader className="sr-only">
          <SheetTitle>{biz.name}</SheetTitle>
          <SheetDescription>{business.category}</SheetDescription>
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

          {biz.promotion_title && (
            <div className="rounded-2xl p-4 bg-[var(--warning)]/30 border border-[var(--warning)]">
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                {biz.promotion_title}
              </div>
              {biz.promotion_description && (
                <div className="text-sm text-[var(--text-secondary)] mt-1">{biz.promotion_description}</div>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm">
            {biz.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <span>{biz.address}{biz.city ? `, ${biz.city}` : ""}</span>
              </div>
            )}
            {biz.hours && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-[var(--text-secondary)]" />
                <span>{biz.hours}</span>
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
