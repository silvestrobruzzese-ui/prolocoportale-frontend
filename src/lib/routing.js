// Routing utility using OSRM (Open Source Routing Machine)
// Uses the public demo server for walking routes

const OSRM_BASE_URL = "https://router.project-osrm.org/route/v1";

/**
 * Decode an encoded polyline string into an array of coordinates
 * @param {string} encoded - The encoded polyline string
 * @returns {Array<[number, number]>} Array of [lat, lng] coordinates
 */
function decodePolyline(encoded) {
  const points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

/**
 * Get walking route between multiple waypoints using OSRM
 * @param {Array<{lat: number, lng: number}>} waypoints - Array of waypoints with lat/lng
 * @returns {Promise<Array<[number, number]>>} Array of [lat, lng] coordinates for the route
 */
export async function getWalkingRoute(waypoints) {
  if (!waypoints || waypoints.length < 2) {
    return null;
  }

  try {
    // OSRM expects coordinates as lng,lat (opposite of Leaflet's lat,lng)
    const coordinates = waypoints
      .map((wp) => `${wp.lng},${wp.lat}`)
      .join(";");

    // Use foot profile for walking routes
    const url = `${OSRM_BASE_URL}/foot/${coordinates}?overview=full&geometries=polyline`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("OSRM routing failed:", response.status);
      return null;
    }

    const data = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
      console.error("OSRM no route found:", data);
      return null;
    }

    // Decode the polyline geometry
    const geometry = data.routes[0].geometry;
    const routeCoords = decodePolyline(geometry);

    return routeCoords;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
}

/**
 * Get route info (distance and duration)
 * @param {Array<{lat: number, lng: number}>} waypoints - Array of waypoints
 * @returns {Promise<{distance: number, duration: number} | null>} Distance in km, duration in hours
 */
export async function getRouteInfo(waypoints) {
  if (!waypoints || waypoints.length < 2) {
    return null;
  }

  try {
    const coordinates = waypoints
      .map((wp) => `${wp.lng},${wp.lat}`)
      .join(";");

    const url = `${OSRM_BASE_URL}/foot/${coordinates}?overview=false`;

    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
      return null;
    }

    const route = data.routes[0];
    return {
      distance: route.distance / 1000, // Convert meters to km
      duration: route.duration / 3600, // Convert seconds to hours
    };
  } catch (error) {
    console.error("Error fetching route info:", error);
    return null;
  }
}
