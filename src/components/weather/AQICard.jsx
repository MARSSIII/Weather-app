import { useTranslation } from "react-i18next";

import "../../styles/AQICard.css";

const AQICard = ({ data }) => {
  const { t } = useTranslation();

  if (!data || !data.list || !data.list[0]) return null;

  const aqiIndex = data.list[0].main.aqi;

  const getStatus = (index) => {
    const keys = ["good", "fair", "moderate", "poor", "very_poor"];

    return t(`aqi_${keys[index - 1]}`);
  };

  const getColor = (index) => {
    const colors = ["#4ade80", "#a3e635", "#facc15", "#f87171", "#ef4444"];

    return colors[index - 1] || "#ccc";
  };

  return (
    <div className="aqi-module">
      <h3 className="aqi-module__title">{t("aqi_title")}</h3>

      <div className="aqi-module__content">
        <div
          className="aqi-module__badge"
          style={{ backgroundColor: getColor(aqiIndex) }}
        >
          {aqiIndex}
        </div>
        <span className="aqi-module__status">{getStatus(aqiIndex)}</span>
      </div>
    </div>
  );
};

export default AQICard;
