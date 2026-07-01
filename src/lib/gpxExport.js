/**
 * Convert GeoJSON track to GPX format and trigger download
 */

/**
 * Generate GPX XML from GeoJSON data
 * @param {Object} geojsonData - GeoJSON Feature with LineString geometry
 * @param {string} name - Trail name
 * @param {string} description - Trail description
 * @returns {string} GPX XML string
 */
export function geojsonToGpx(geojsonData, name, description = "") {
  if (!geojsonData?.geometry?.coordinates) {
    return null;
  }

  const coordinates = geojsonData.geometry.coordinates;
  const now = new Date().toISOString();

  // Build track points
  const trackPoints = coordinates
    .map((coord) => {
      const [lng, lat, ele] = coord;
      const eleTag = ele ? `<ele>${ele}</ele>` : "";
      return `      <trkpt lat="${lat}" lon="${lng}">${eleTag}</trkpt>`;
    })
    .join("\n");

  // Build GPX XML
  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Mappix - Sentieri e Cammini"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${escapeXml(name)}</name>
    <desc>${escapeXml(description)}</desc>
    <time>${now}</time>
    <author>
      <name>Mappix</name>
      <link href="https://mappix.it">
        <text>Mappix - Turismo Calabria</text>
      </link>
    </author>
  </metadata>
  <trk>
    <name>${escapeXml(name)}</name>
    <desc>${escapeXml(description)}</desc>
    <trkseg>
${trackPoints}
    </trkseg>
  </trk>
</gpx>`;

  return gpx;
}

/**
 * Escape special XML characters
 */
function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Download GPX file
 * @param {Object} geojsonData - GeoJSON Feature data
 * @param {string} name - Trail name (used for filename)
 * @param {string} description - Trail description
 */
export function downloadGpx(geojsonData, name, description = "") {
  const gpxContent = geojsonToGpx(geojsonData, name, description);

  if (!gpxContent) {
    console.error("Failed to generate GPX content");
    return false;
  }

  // Create blob and download
  const blob = new Blob([gpxContent], { type: "application/gpx+xml" });

  // Create filename from trail name
  const filename = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "") + ".gpx";

  // Check if Web Share API is available (mobile)
  if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], filename, { type: "application/gpx+xml" })] })) {
    const file = new File([blob], filename, { type: "application/gpx+xml" });
    navigator.share({
      files: [file],
      title: name,
      text: description || "Tracciato GPX"
    }).catch(() => {
      // Fallback to traditional download if share fails
      triggerDownload(blob, filename);
    });
  } else {
    triggerDownload(blob, filename);
  }

  return true;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);

  // Use setTimeout for better mobile compatibility
  setTimeout(() => {
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Calculate track statistics
 * @param {Object} geojsonData - GeoJSON Feature data
 * @returns {Object} Statistics (distance, elevationGain, etc.)
 */
export function calculateTrackStats(geojsonData) {
  if (!geojsonData?.geometry?.coordinates) {
    return null;
  }

  const coordinates = geojsonData.geometry.coordinates;
  let totalDistance = 0;
  let elevationGain = 0;
  let elevationLoss = 0;
  let minEle = Infinity;
  let maxEle = -Infinity;

  for (let i = 1; i < coordinates.length; i++) {
    const [lng1, lat1, ele1] = coordinates[i - 1];
    const [lng2, lat2, ele2] = coordinates[i];

    // Calculate distance using Haversine formula
    totalDistance += haversineDistance(lat1, lng1, lat2, lng2);

    // Calculate elevation changes
    if (ele1 !== undefined && ele2 !== undefined) {
      const eleDiff = ele2 - ele1;
      if (eleDiff > 0) elevationGain += eleDiff;
      else elevationLoss += Math.abs(eleDiff);

      if (ele1 < minEle) minEle = ele1;
      if (ele1 > maxEle) maxEle = ele1;
      if (ele2 < minEle) minEle = ele2;
      if (ele2 > maxEle) maxEle = ele2;
    }
  }

  return {
    distance: totalDistance, // in km
    elevationGain: Math.round(elevationGain),
    elevationLoss: Math.round(elevationLoss),
    minElevation: minEle === Infinity ? null : Math.round(minEle),
    maxElevation: maxEle === -Infinity ? null : Math.round(maxEle),
    pointCount: coordinates.length,
  };
}

/**
 * Haversine distance between two points
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}
