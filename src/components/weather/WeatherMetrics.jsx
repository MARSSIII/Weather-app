import { useTranslation } from "react-i18next";

import { useUnit } from "../../context/UnitContext";

import "../../styles/WeatherMetrics.css";

const WeatherMetrics = ({ data }) => {
  const { t } = useTranslation();
  const { speedSymbol } = useUnit();

  if (!data) return null;

  const { main, wind, visibility, pressure } = data;

  const metrics = [
    {
      label: t("feels_like"),
      value: `${Math.round(main.feels_like)}°`,
    },
    {
      label: t("humidity"),
      value: `${main.humidity}%`,
    },
    {
      label: t("wind"),
      value: `${wind.speed} ${speedSymbol}`,
    },
    {
      label: t("pressure"),
      value: `${main.pressure} hPa`,
    },
    {
      label: t("visibility"),
      value: `${(visibility / 1000).toFixed(1)} km`,
    },
    {
      label: t("min_max"),
      value: `${Math.round(main.temp_min)}° / ${Math.round(main.temp_max)}°`,
    },
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((item, index) => (
        <div key={index} className="metric-tile">
          <span className="metric-tile__label">{item.label}</span>
          <span className="metric-tile__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeatherMetrics;
