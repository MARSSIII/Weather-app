import { useMemo } from "react";

import { useFetchJson } from "./useFetchJson";

export const useForecast = (lat, lon, unit, lang) => {
  const API_KEY = import.meta.env.VITE_OWM_API_KEY;

  const requestUrl = useMemo(() => {
    if (!lat || !lon) return null;

    const url = new URL("https://api.openweathermap.org/data/2.5/forecast");

    const params = {
      lat: lat,
      lon: lon,
      units: unit,
      lang: lang,
      appid: API_KEY,
    };

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url.toString();
  }, [lat, lon, unit, lang, API_KEY]);

  return useFetchJson(requestUrl);
};
