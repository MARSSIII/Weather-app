import { useState, useEffect } from "react";

export const useGeoLocation = (lang = "en") => {
  const API_KEY = import.meta.env.VITE_OWM_API_KEY;

  const [geoState, setGeoState] = useState({
    city: "Detecting...",
    country: "",
    isReady: false,
    coordinates: null,
    errorMsg: "",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoState((prev) => ({
        ...prev,
        city: "Not Supported",
        errorMsg: "Geolocation not supported",
        isReady: true,
      }));

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoState((prev) => ({
          ...prev,
          coordinates: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          },
        }));
      },
      (err) => {
        setGeoState((prev) => ({
          ...prev,
          city: "Location Error",
          errorMsg: err.message,
          isReady: true,
        }));
      },
    );
  }, []);

  useEffect(() => {
    if (!geoState.coordinates || !API_KEY) return;

    const { lat, lon } = geoState.coordinates;
    const langCode = lang ? lang.substring(0, 2) : "en";

    const resolveCityName = async () => {
      try {
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

        const res = await fetch(url);
        const json = await res.json();

        if (json && json.length > 0) {
          const locationData = json[0];
          const cityName =
            locationData.local_names?.[langCode] || locationData.name;

          setGeoState((prev) => ({
            ...prev,
            city: cityName,
            country: locationData.country || "",
            isReady: true,
            errorMsg: "",
          }));
        } else {
          throw new Error("Location not found");
        }
      } catch (e) {
        console.error("Geo Error:", e);

        setGeoState((prev) => ({
          ...prev,
          city: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
          isReady: true,
          errorMsg: "Reverse geocoding failed",
        }));
      }
    };

    resolveCityName();
  }, [geoState.coordinates, lang, API_KEY]);

  return {
    location: {
      city: geoState.city,
      country: geoState.country,
      loaded: geoState.isReady,
    },
    coords: geoState.coordinates
      ? {
          latitude: geoState.coordinates.lat,
          longitude: geoState.coordinates.lon,
        }
      : null,
    error: geoState.errorMsg,
  };
};
