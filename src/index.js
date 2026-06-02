import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

// Note: StrictMode is intentionally disabled because react-leaflet@4 double-mounts
// the Map container under React 19 StrictMode, which fires
// "Map container is already initialized." For a production-like dev experience,
// we render without StrictMode. (React-leaflet 5 will fix this once stable.)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
