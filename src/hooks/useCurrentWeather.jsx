import { useMemo } from "react";

import { useFetchJson } from "./useFetchJson";

export const useCurrentWeather = (lat, lon, city, unit, lang) => {
  const API_KEY = import.meta.env.VITE_OWM_API_KEY;
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const requestUrl = useMemo(() => {
    if ((!lat || !lon) && !city) return null;

    const urlObj = new URL(BASE_URL);

    urlObj.searchParams.append("units", unit);
    urlObj.searchParams.append("lang", lang);
    urlObj.searchParams.append("appid", API_KEY);

    if (lat && lon) {
      urlObj.searchParams.append("lat", lat);
      urlObj.searchParams.append("lon", lon);
    } else if (city) {
      urlObj.searchParams.append("q", city);
    }

    return urlObj.toString();
  }, [lat, lon, city, unit, lang, API_KEY]);

  return useFetchJson(requestUrl);
};
