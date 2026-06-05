// MapView - Leaflet map with user position, business markers, proximity circles, route line
import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle, Polyline, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PRIMARY = "#FF6B35";

// Colori per categoria - più vivaci e pop
const categoryColors = {
  Restaurant: "#E63946",  // Rosso vivace
  Pizzerie: "#FF6B35",    // Arancione pizza
  Cafe: "#A855F7",        // Viola
  Shop: "#14B8A6",        // Teal
  Hotel: "#FBBF24",       // Giallo oro
  "B&B": "#22C55E",       // Verde brillante
  Pharmacy: "#22C55E",    // Verde
  Monumenti: "#A855F7",   // Viola
  Musei: "#EC4899",       // Rosa/Magenta
  Spiagge: "#06B6D4",     // Ciano
  Archeologia: "#F59E0B", // Ambra
  Discoteche: "#D946EF",  // Fucsia
  Supermercati: "#3B82F6", // Blu
  "Beni Culturali": "#8B5CF6", // Viola
  Itinerari: "#10B981",   // Smeraldo
  "Sentieri e Cammini": "linear-gradient(135deg, #F97316 0%, #38BDF8 100%)", // Orange + Sky Blue gradient
  Other: "#6366F1",       // Indaco
};

const categoryEmoji = {
  Restaurant: "🍽",
  Pizzerie: "🍕",
  Cafe: "☕",
  Shop: "🛍",
  Hotel: "🏨",
  "B&B": "B&B",
  Pharmacy: "💊",
  Monumenti: "⛪",
  Musei: "🏛",
  Spiagge: "🏖",
  Archeologia: "🏺",
  Discoteche: "🎵",
  Supermercati: "🛒",
  "Beni Culturali": "🏛",
  Itinerari: "🥾",
  "Sentieri e Cammini": "🏔",
  Other: "📍",
};

// SVG Hiker icon for map markers
const hikerSvgWhite = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="3.5" r="2.5" fill="white"/>
  <path d="M7 8C7 7 7.5 6 9 6L9 12L7 11L7 8Z" fill="white"/>
  <rect x="6.5" y="7" width="3" height="5" rx="1" fill="white"/>
  <path d="M12 6.5L12 11L9.5 11" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 8L17.5 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M12 9L15 8" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M12 11L14 16L16 21" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 11L9 16L7 21" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function pinIcon(business, inProximity) {
  const color = categoryColors[business.category] || categoryColors.Other;
  const emoji = categoryEmoji[business.category] || categoryEmoji.Other;
  const proximityClass = inProximity ? "in-proximity" : "";
  const isSentieriCammini = business.category === "Sentieri e Cammini";

  // Use SVG hiker icon for Sentieri e Cammini, emoji for others
  const iconContent = isSentieriCammini ? hikerSvgWhite : `<span>${emoji}</span>`;
  const html = `<div class="proxi-pin ${proximityClass}" style="background:${color}"><span class="marker-icon">${iconContent}</span></div>`;
  return L.divIcon({ html, className: "proxi-marker-icon", iconSize: [40, 40], iconAnchor: [20, 40] });
}

function userIcon() {
  return L.divIcon({ html: '<div class="proxi-pin user"></div>', className: "proxi-marker-icon", iconSize: [20, 20], iconAnchor: [10, 10] });
}

function MapRecenter({ center, zoom, trigger }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom || map.getZoom() || 14, { animate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return null;
}

export default function MapView({
  center,
  zoom = 14,
  userPosition,
  hasUserPosition,
  businesses,
  selectedBusinessId,
  onSelect,
  recenterTrigger,
  routeTo, // [lat, lng] or null
  prolocoTerritory, // polygon points
  camminoTappe, // array of tappe for drawing connecting line
}) {
  const mapRef = useRef(null);

  const selectedBiz = useMemo(
    () => businesses.find((b) => b.business_id === selectedBusinessId),
    [businesses, selectedBusinessId]
  );

  const routeLine = useMemo(() => {
    if (!hasUserPosition || !routeTo) return null;
    return [userPosition, routeTo];
  }, [hasUserPosition, userPosition, routeTo]);

  // Extract trail track from geojson_data if available
  const trailTrack = useMemo(() => {
    if (!selectedBiz?.geojson_data?.geometry?.coordinates) return null;
    const coords = selectedBiz.geojson_data.geometry.coordinates;
    // GeoJSON is [lng, lat], Leaflet needs [lat, lng]
    return coords.map(c => [c[1], c[0]]);
  }, [selectedBiz]);

  // Line connecting cammino tappe
  const camminoLine = useMemo(() => {
    if (!camminoTappe || camminoTappe.length < 2) return null;
    return camminoTappe.map((t) => [t.lat, t.lng]);
  }, [camminoTappe]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="w-full h-full"
      ref={mapRef}
      data-testid="map-container"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <MapRecenter center={center} zoom={zoom} trigger={recenterTrigger} />

      {hasUserPosition && (
        <Marker position={userPosition} icon={userIcon()} data-testid="user-marker" />
      )}

      {prolocoTerritory && prolocoTerritory.length >= 3 && (
        <Polygon
          positions={prolocoTerritory}
          pathOptions={{ color: "#81B29A", weight: 2, fillOpacity: 0.06, dashArray: "6 8" }}
        />
      )}

      {businesses.map((b) => (
        <Marker
          key={b.business_id}
          position={[b.lat, b.lng]}
          icon={pinIcon(b, b.in_proximity)}
          eventHandlers={{ click: () => onSelect && onSelect(b.business_id) }}
        />
      ))}

      {selectedBiz && (
        <Circle
          center={[selectedBiz.lat, selectedBiz.lng]}
          radius={Number(selectedBiz.proximity_radius_m) || 500}
          pathOptions={{
            color: PRIMARY,
            fillColor: PRIMARY,
            fillOpacity: 0.12,
            weight: 2,
          }}
        />
      )}

      {routeLine && (
        <Polyline
          positions={routeLine}
          pathOptions={{ color: PRIMARY, weight: 5, opacity: 0.85, dashArray: "8 8" }}
        />
      )}

      {/* Trail track for Sentieri e Cammini */}
      {trailTrack && trailTrack.length > 1 && (
        <Polyline
          positions={trailTrack}
          pathOptions={{
            color: "#F97316", // Orange
            weight: 4,
            opacity: 0.9,
          }}
        />
      )}

      {/* Line connecting cammino tappe */}
      {camminoLine && camminoLine.length > 1 && (
        <Polyline
          positions={camminoLine}
          pathOptions={{
            color: "#38BDF8", // Sky blue
            weight: 3,
            opacity: 0.8,
            dashArray: "10 6",
          }}
        />
      )}
    </MapContainer>
  );
}
