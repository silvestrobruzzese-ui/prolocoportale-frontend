// Google Analytics 4 - Custom Event Tracking for Mappix
// Measurement ID: G-YTTLPWV7ZQ

/**
 * Track a custom event in Google Analytics 4
 * @param {string} eventName - Name of the event
 * @param {object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
    console.log(`[GA4] Event: ${eventName}`, params);
  }
};

/**
 * Track when a user visits a Pro Loco landing page
 * @param {string} slug - Pro Loco slug (e.g., "soverato")
 * @param {string} name - Pro Loco name (e.g., "Pro Loco Soverato")
 * @param {string} comune - Comune name
 * @param {string} provincia - Provincia
 */
export const trackProlocoLanding = (slug, name, comune, provincia) => {
  trackEvent('proloco_landing_view', {
    proloco_slug: slug,
    proloco_name: name,
    comune: comune || 'N/A',
    provincia: provincia || 'N/A',
    page_type: 'proloco_landing'
  });
};

/**
 * Track when a user visits a Città/Paese landing page
 * @param {string} slug - Città slug (e.g., "catanzaro")
 * @param {string} name - Città name (e.g., "Catanzaro")
 * @param {string} provincia - Provincia
 */
export const trackCittaLanding = (slug, name, provincia) => {
  trackEvent('citta_landing_view', {
    citta_slug: slug,
    citta_name: name,
    provincia: provincia || 'N/A',
    page_type: 'citta_landing'
  });
};

/**
 * Track when a user clicks "Esplora la Mappa" from a landing page
 * @param {string} type - "proloco" or "citta"
 * @param {string} slug - The slug of the proloco/citta
 * @param {string} name - The name
 */
export const trackExploreClick = (type, slug, name) => {
  trackEvent('explore_map_click', {
    source_type: type,
    source_slug: slug,
    source_name: name
  });
};

/**
 * Track when a user views a business detail
 * @param {object} business - Business object
 */
export const trackBusinessView = (business) => {
  trackEvent('business_view', {
    business_id: business._id || business.id,
    business_name: business.name,
    business_category: business.category,
    business_city: business.city || business.address?.city,
    has_promotion: !!business.promotion
  });
};

/**
 * Track when a user clicks "Naviga" to open maps
 * @param {object} business - Business object
 */
export const trackNavigateClick = (business) => {
  trackEvent('navigate_click', {
    business_id: business._id || business.id,
    business_name: business.name,
    business_category: business.category,
    business_city: business.city || business.address?.city
  });
};

/**
 * Track category filter selection
 * @param {string} category - Selected category
 */
export const trackCategoryFilter = (category) => {
  trackEvent('category_filter', {
    category: category
  });
};

/**
 * Track search query
 * @param {string} query - Search query
 */
export const trackSearch = (query) => {
  trackEvent('search', {
    search_term: query
  });
};

/**
 * Track GPX download
 * @param {string} trailName - Trail name
 */
export const trackGpxDownload = (trailName) => {
  trackEvent('gpx_download', {
    trail_name: trailName
  });
};

/**
 * Track trail follower start
 * @param {string} trailName - Trail name
 */
export const trackTrailFollowStart = (trailName) => {
  trackEvent('trail_follow_start', {
    trail_name: trailName
  });
};
