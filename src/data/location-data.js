const data = [
  // Asia
  { location: "Tokyo", country: "JP", latitude: 35.6762, longitude: 139.6503 },
  { location: "Delhi", country: "IN", latitude: 28.7041, longitude: 77.1025 },
  { location: "Mumbai", country: "IN", latitude: 19.076, longitude: 72.8777 },
  { location: "Kolkata", country: "IN", latitude: 22.5726, longitude: 88.3639 },
  { location: "Chennai", country: "IN", latitude: 13.0827, longitude: 80.2707 },
  { location: "Bangalore", country: "IN", latitude: 12.9716, longitude: 77.5946 },
  { location: "Hyderabad", country: "IN", latitude: 17.385, longitude: 78.4867 },
  { location: "Dhaka", country: "BD", latitude: 23.8041, longitude: 90.4152 },
  { location: "Chittagong", country: "BD", latitude: 22.3569, longitude: 91.7832 },
  { location: "Singapore", country: "SG", latitude: 1.2899, longitude: 103.8519 },
  { location: "Beijing", country: "CN", latitude: 39.9042, longitude: 116.4074 },
  { location: "Shanghai", country: "CN", latitude: 31.2304, longitude: 121.4737 },
  { location: "Hong Kong", country: "HK", latitude: 22.3193, longitude: 114.1694 },
  { location: "Seoul", country: "KR", latitude: 37.5665, longitude: 126.978 },
  { location: "Bangkok", country: "TH", latitude: 13.7563, longitude: 100.5018 },
  { location: "Jakarta", country: "ID", latitude: -6.2088, longitude: 106.8456 },
  { location: "Manila", country: "PH", latitude: 14.5995, longitude: 120.9842 },
  { location: "Karachi", country: "PK", latitude: 24.8607, longitude: 67.0011 },
  { location: "Lahore", country: "PK", latitude: 31.5204, longitude: 74.3587 },
  { location: "Islamabad", country: "PK", latitude: 33.6844, longitude: 73.0479 },
  { location: "Taipei", country: "TW", latitude: 25.033, longitude: 121.5654 },
  { location: "Kuala Lumpur", country: "MY", latitude: 3.139, longitude: 101.6869 },
  { location: "Hanoi", country: "VN", latitude: 21.0285, longitude: 105.8542 },
  { location: "Dubai", country: "AE", latitude: 25.2048, longitude: 55.2708 },
  { location: "Abu Dhabi", country: "AE", latitude: 24.4539, longitude: 54.3773 },
  { location: "Riyadh", country: "SA", latitude: 24.7136, longitude: 46.6753 },
  { location: "Doha", country: "QA", latitude: 25.2854, longitude: 51.531 },
  { location: "Tel Aviv", country: "IL", latitude: 32.0853, longitude: 34.7818 },
  { location: "Istanbul", country: "TR", latitude: 41.0082, longitude: 28.9784 },
  { location: "Ankara", country: "TR", latitude: 39.9334, longitude: 32.8597 },

  // Europe
  { location: "London", country: "GB", latitude: 51.5074, longitude: -0.1278 },
  { location: "Paris", country: "FR", latitude: 48.8566, longitude: 2.3522 },
  { location: "Berlin", country: "DE", latitude: 52.52, longitude: 13.405 },
  { location: "Munich", country: "DE", latitude: 48.1351, longitude: 11.582 },
  { location: "Madrid", country: "ES", latitude: 40.4168, longitude: -3.7038 },
  { location: "Barcelona", country: "ES", latitude: 41.3874, longitude: 2.1686 },
  { location: "Rome", country: "IT", latitude: 41.9028, longitude: 12.4964 },
  { location: "Milan", country: "IT", latitude: 45.4642, longitude: 9.19 },
  { location: "Amsterdam", country: "NL", latitude: 52.3676, longitude: 4.9041 },
  { location: "Brussels", country: "BE", latitude: 50.8503, longitude: 4.3517 },
  { location: "Vienna", country: "AT", latitude: 48.2082, longitude: 16.3738 },
  { location: "Zurich", country: "CH", latitude: 47.3769, longitude: 8.5417 },
  { location: "Geneva", country: "CH", latitude: 46.2044, longitude: 6.1432 },
  { location: "Stockholm", country: "SE", latitude: 59.3293, longitude: 18.0686 },
  { location: "Oslo", country: "NO", latitude: 59.9139, longitude: 10.7522 },
  { location: "Copenhagen", country: "DK", latitude: 55.6761, longitude: 12.5683 },
  { location: "Helsinki", country: "FI", latitude: 60.1699, longitude: 24.9384 },
  { location: "Dublin", country: "IE", latitude: 53.3498, longitude: -6.2603 },
  { location: "Lisbon", country: "PT", latitude: 38.7223, longitude: -9.1393 },
  { location: "Athens", country: "GR", latitude: 37.9838, longitude: 23.7275 },
  { location: "Prague", country: "CZ", latitude: 50.0755, longitude: 14.4378 },
  { location: "Warsaw", country: "PL", latitude: 52.2297, longitude: 21.0122 },
  { location: "Budapest", country: "HU", latitude: 47.4979, longitude: 19.0402 },
  { location: "Bucharest", country: "RO", latitude: 44.4268, longitude: 26.1025 },
  { location: "Moscow", country: "RU", latitude: 55.7558, longitude: 37.6173 },
  { location: "Edinburgh", country: "GB", latitude: 55.9533, longitude: -3.1883 },
  { location: "Manchester", country: "GB", latitude: 53.4808, longitude: -2.2426 },

  // North America
  { location: "New York", country: "US", latitude: 40.7128, longitude: -74.006 },
  { location: "Los Angeles", country: "US", latitude: 34.0522, longitude: -118.2437 },
  { location: "Chicago", country: "US", latitude: 41.8781, longitude: -87.6298 },
  { location: "Houston", country: "US", latitude: 29.7604, longitude: -95.3698 },
  { location: "San Francisco", country: "US", latitude: 37.7749, longitude: -122.4194 },
  { location: "Miami", country: "US", latitude: 25.7617, longitude: -80.1918 },
  { location: "Seattle", country: "US", latitude: 47.6062, longitude: -122.3321 },
  { location: "Boston", country: "US", latitude: 42.3601, longitude: -71.0589 },
  { location: "Washington", country: "US", latitude: 38.9072, longitude: -77.0369 },
  { location: "Denver", country: "US", latitude: 39.7392, longitude: -104.9903 },
  { location: "Atlanta", country: "US", latitude: 33.749, longitude: -84.388 },
  { location: "Dallas", country: "US", latitude: 32.7767, longitude: -96.797 },
  { location: "Las Vegas", country: "US", latitude: 36.1699, longitude: -115.1398 },
  { location: "Toronto", country: "CA", latitude: 43.6532, longitude: -79.3832 },
  { location: "Vancouver", country: "CA", latitude: 49.2827, longitude: -123.1207 },
  { location: "Montreal", country: "CA", latitude: 45.5017, longitude: -73.5673 },
  { location: "Mexico City", country: "MX", latitude: 19.4326, longitude: -99.1332 },
  { location: "Cancun", country: "MX", latitude: 21.1619, longitude: -86.8515 },

  // South America
  { location: "São Paulo", country: "BR", latitude: -23.5505, longitude: -46.6333 },
  { location: "Rio de Janeiro", country: "BR", latitude: -22.9068, longitude: -43.1729 },
  { location: "Buenos Aires", country: "AR", latitude: -34.6037, longitude: -58.3816 },
  { location: "Lima", country: "PE", latitude: -12.0464, longitude: -77.0428 },
  { location: "Bogotá", country: "CO", latitude: 4.711, longitude: -74.0721 },
  { location: "Santiago", country: "CL", latitude: -33.4489, longitude: -70.6693 },

  // Africa
  { location: "Cairo", country: "EG", latitude: 30.0444, longitude: 31.2357 },
  { location: "Lagos", country: "NG", latitude: 6.5244, longitude: 3.3792 },
  { location: "Nairobi", country: "KE", latitude: -1.2921, longitude: 36.8219 },
  { location: "Cape Town", country: "ZA", latitude: -33.9249, longitude: 18.4241 },
  { location: "Johannesburg", country: "ZA", latitude: -26.2041, longitude: 28.0473 },
  { location: "Casablanca", country: "MA", latitude: 33.5731, longitude: -7.5898 },
  { location: "Accra", country: "GH", latitude: 5.6037, longitude: -0.187 },

  // Oceania
  { location: "Sydney", country: "AU", latitude: -33.8688, longitude: 151.2093 },
  { location: "Melbourne", country: "AU", latitude: -37.8136, longitude: 144.9631 },
  { location: "Brisbane", country: "AU", latitude: -27.4698, longitude: 153.0251 },
  { location: "Perth", country: "AU", latitude: -31.9505, longitude: 115.8605 },
  { location: "Auckland", country: "NZ", latitude: -36.8485, longitude: 174.7633 },
  { location: "Wellington", country: "NZ", latitude: -41.2865, longitude: 174.7762 },
];

/**
 * Returns all locations.
 */
const getLocations = () => data;

/**
 * Exact match by city name (case-insensitive).
 * Returns the location object or null.
 */
const getLocationByName = (location) => {
  if (!location) return null;
  const q = location.toString().trim().toLowerCase();
  return data.find(
    (datum) => datum.location.toLowerCase() === q
  ) || null;
};

/**
 * Fuzzy search — returns locations whose name starts with or includes the query.
 * Results that start with the query are ranked first.
 * @param {string} query
 * @param {number} limit  max results to return (default 8)
 */
const searchLocations = (query, limit = 8) => {
  if (!query || typeof query !== "string") return [];
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];

  const startsWithMatch = [];
  const containsMatch = [];

  for (const item of data) {
    const name = item.location.toLowerCase();
    if (name.startsWith(q)) {
      startsWithMatch.push(item);
    } else if (name.includes(q)) {
      containsMatch.push(item);
    }
  }

  return [...startsWithMatch, ...containsMatch].slice(0, limit);
};

export { getLocationByName, getLocations, searchLocations };
