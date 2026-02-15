import { useState, useEffect, useRef, useCallback } from "react";
import { searchLocations } from "../data/location-data";

/**
 * Custom hook for city search with:
 * - Instant local fuzzy matching (90+ cities)
 * - Debounced remote OpenWeatherMap Geocoding API fallback
 * - Deduplication between local and remote results
 */
const useSearch = (delay = 350) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const abortRef = useRef(null);
  const timeoutRef = useRef(null);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    const q = query.trim();

    // Clear everything if empty
    if (q.length === 0) {
      clearSuggestions();
      return;
    }

    // 1. Instant local results
    const localResults = searchLocations(q, 5).map((item) => ({
      ...item,
      source: "local",
    }));
    setSuggestions(localResults);

    // 2. Debounced remote search (only if query is 2+ chars)
    if (q.length < 2) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Cancel previous timer & fetch
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (abortRef.current) abortRef.current.abort();

    timeoutRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${apiKey}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Geocoding failed");

        const data = await res.json();

        // Map remote results
        const remoteResults = data.map((item) => ({
          location: item.name,
          country: item.country,
          state: item.state || "",
          latitude: item.lat,
          longitude: item.lon,
          source: "remote",
        }));

        // Merge: local first, then remote (deduped by name+country)
        const localNames = new Set(
          localResults.map((l) => `${l.location.toLowerCase()}-${(l.country || "").toLowerCase()}`)
        );

        const deduped = remoteResults.filter(
          (r) => !localNames.has(`${r.location.toLowerCase()}-${r.country.toLowerCase()}`)
        );

        setSuggestions([...localResults, ...deduped].slice(0, 8));
      } catch {
        // On abort or error, keep local results
      } finally {
        setIsSearching(false);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query, delay, clearSuggestions]);

  return {
    query,
    setQuery,
    suggestions,
    isSearching,
    clearSuggestions,
  };
};

export default useSearch;
