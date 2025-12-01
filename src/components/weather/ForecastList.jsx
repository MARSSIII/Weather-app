import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import "../../styles/ForecastList.css";

const ForecastItem = ({ item }) => {
  const { dayName, min, max, icon, description } = item;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="forecast-item">
      <span className="forecast-item__day">{dayName}</span>
      <img
        src={iconUrl}
        alt={description}
        className="forecast-item__icon"
        title={description}
      />
      <div className="forecast-item__temps">
        <span className="forecast-item__max">{Math.round(max)}°</span>
        <span className="forecast-item__min">{Math.round(min)}°</span>
      </div>
    </div>
  );
};

const ForecastList = ({ data }) => {
  const { t, i18n } = useTranslation();

  const dailyForecast = useMemo(() => {
    if (!data || !data.list) return [];

    const processedDays = {};

    data.list.forEach((item) => {
      const dateObj = new Date(item.dt * 1000);

      const dayName = dateObj.toLocaleDateString(i18n.language, {
        weekday: "short",
      });

      if (!processedDays[dayName]) {
        processedDays[dayName] = {
          dayName: dayName,
          dt: item.dt,
          min: item.main.temp_min,
          max: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          count: 1,
        };
      } else {
        processedDays[dayName].min = Math.min(
          processedDays[dayName].min,
          item.main.temp_min,
        );

        processedDays[dayName].max = Math.max(
          processedDays[dayName].max,
          item.main.temp_max,
        );

        if (item.dt_txt.includes("12:00") || item.dt_txt.includes("15:00")) {
          processedDays[dayName].icon = item.weather[0].icon;
          processedDays[dayName].description = item.weather[0].description;
        }
      }
    });

    return Object.values(processedDays).slice(0, 5);
  }, [data, i18n.language]);

  if (!dailyForecast.length) return null;

  return (
    <div className="forecast-section">
      <h3 className="forecast-section__title">
        {t("forecast_title", "5-Day Forecast")}
      </h3>
      <div className="forecast-section__list">
        {dailyForecast.map((item) => (
          <ForecastItem key={item.dayName} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
