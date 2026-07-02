// AdBanner - Google AdSense banner component
import React, { useEffect, useRef } from "react";

// AdSense configuration
const ADSENSE_CLIENT = "ca-pub-6371841208008674";
const ADSENSE_SLOT = "5526727212";

export default function AdBanner() {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Only load ad once
    if (isAdLoaded.current) return;

    try {
      // Push ad to AdSense
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
        isAdLoaded.current = true;
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="absolute bottom-[400px] left-3 z-[999]">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          minWidth: "280px",
          maxWidth: "360px",
          height: "70px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "70px",
          }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ADSENSE_SLOT}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
      </div>
    </div>
  );
}
