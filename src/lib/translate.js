// LibreTranslate integration for dynamic content translation
const LIBRETRANSLATE_URL = "https://libretranslate.com/translate";

// Cache translations to avoid repeated API calls
const translationCache = new Map();

function getCacheKey(text, targetLang) {
  return `${targetLang}:${text}`;
}

/**
 * Translate text using LibreTranslate
 * @param {string} text - Text to translate (assumed Italian)
 * @param {string} targetLang - Target language code (en, de, fr, es, etc.)
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(text, targetLang) {
  // Don't translate if target is Italian or text is empty
  if (!text || targetLang === "it" || !targetLang) {
    return text;
  }

  // Check cache first
  const cacheKey = getCacheKey(text, targetLang);
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const response = await fetch(LIBRETRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "it",
        target: targetLang,
        format: "text",
      }),
    });

    if (!response.ok) {
      console.warn("Translation failed:", response.status);
      return text; // Return original on error
    }

    const data = await response.json();
    const translated = data.translatedText || text;

    // Cache the result
    translationCache.set(cacheKey, translated);

    return translated;
  } catch (error) {
    console.warn("Translation error:", error);
    return text; // Return original on error
  }
}

/**
 * Translate multiple fields of an object
 * @param {Object} obj - Object with fields to translate
 * @param {string[]} fields - Array of field names to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Object with translated fields
 */
export async function translateFields(obj, fields, targetLang) {
  if (!obj || targetLang === "it") {
    return obj;
  }

  const translated = { ...obj };

  await Promise.all(
    fields.map(async (field) => {
      if (obj[field]) {
        translated[field] = await translateText(obj[field], targetLang);
      }
    })
  );

  return translated;
}
