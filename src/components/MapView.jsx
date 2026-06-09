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
  Bancomat: "#00843D",    // Verde BCC
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
  Bancomat: "🏧",
  Other: "📍",
};

// SVG Hiker icon for map markers - stylized version matching reference
const hikerSvgWhite = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="13" cy="3" r="2.5" fill="white"/>
  <path d="M8 7.5C8 6.5 8.5 6 9.5 6C9.5 6 10 6 10 7L10 12L8.5 12.5L8 7.5Z" fill="white"/>
  <rect x="7.5" y="7" width="3" height="6" rx="1.5" fill="white"/>
  <path d="M13 5.5C13 5.5 12 8 11 10C10.5 11 10 12 10 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.5 8L9 10" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M12 8L15 7" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <path d="M15 7L18 20" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M10 12L7 17L5 21" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 12L13 17L15 21" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function pinIcon(business, inProximity) {
  const color = categoryColors[business.category] || categoryColors.Other;
  const emoji = categoryEmoji[business.category] || categoryEmoji.Other;
  const proximityClass = inProximity ? "in-proximity" : "";
  const isSentieriCammini = business.category === "Sentieri e Cammini";
  const isBancomat = business.category === "Bancomat";

  // Use SVG hiker icon for Sentieri e Cammini, logo for Bancomat, emoji for others
  let iconContent;
  let markerStyle = `background:${color}`;
  if (isSentieriCammini) {
    iconContent = hikerSvgWhite;
  } else if (isBancomat) {
    iconContent = `<img src="/bcc-logo.png" alt="BCC" style="width:32px;height:32px;object-fit:contain;" />`;
    markerStyle = `background:white;border:3px solid ${color}`;
  } else {
    iconContent = `<span>${emoji}</span>`;
  }
  const html = `<div class="proxi-pin ${proximityClass}" style="${markerStyle}"><span class="marker-icon">${iconContent}</span></div>`;
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
  camminoRoute, // actual walking route coordinates from OSRM
  showAllTracks, // show all sentieri tracks at once
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

  // Extract trail track from geojson_data if available (for selected business)
  const trailTrack = useMemo(() => {
    if (!selectedBiz?.geojson_data?.geometry?.coordinates) return null;
    const coords = selectedBiz.geojson_data.geometry.coordinates;
    // GeoJSON is [lng, lat], Leaflet needs [lat, lng]
    return coords.map(c => [c[1], c[0]]);
  }, [selectedBiz]);

  // All sentieri tracks when showAllTracks is true
  const allSentieriTracks = useMemo(() => {
    if (!showAllTracks) return [];
    return businesses
      .filter((b) => b.geojson_data?.geometry?.coordinates)
      .map((b) => ({
        id: b.business_id,
        coords: b.geojson_data.geometry.coordinates.map(c => [c[1], c[0]]),
        name: b.name,
      }));
  }, [businesses, showAllTracks]);

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

      {businesses.map((b) => {
        // For sentieri with GPS track, position marker at start of trail
        let markerPosition = [b.lat, b.lng];
        if (b.geojson_data?.geometry?.coordinates?.length > 0) {
          const firstCoord = b.geojson_data.geometry.coordinates[0];
          markerPosition = [firstCoord[1], firstCoord[0]]; // GeoJSON is [lng, lat]
        }
        return (
          <Marker
            key={b.business_id}
            position={markerPosition}
            icon={pinIcon(b, b.in_proximity)}
            eventHandlers={{ click: () => onSelect && onSelect(b.business_id) }}
          />
        );
      })}

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

      {/* All sentieri tracks when showAllTracks is enabled */}
      {allSentieriTracks.map((track) => (
        <Polyline
          key={track.id}
          positions={track.coords}
          pathOptions={{
            color: "#F97316", // Orange
            weight: 3,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Single trail track for selected business */}
      {trailTrack && trailTrack.length > 1 && (
        <Polyline
          positions={trailTrack}
          pathOptions={{
            color: "#F97316", // Orange
            weight: 5,
            opacity: 1,
          }}
        />
      )}

      {/* Walking route for cammino (actual path from OSRM) */}
      {camminoRoute && camminoRoute.length > 1 && (
        <Polyline
          positions={camminoRoute}
          pathOptions={{
            color: "#F97316", // Orange - matches trail style
            weight: 4,
            opacity: 0.85,
          }}
        />
      )}

      {/* Fallback: dashed line connecting cammino tappe if no route available */}
      {!camminoRoute && camminoLine && camminoLine.length > 1 && (
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
