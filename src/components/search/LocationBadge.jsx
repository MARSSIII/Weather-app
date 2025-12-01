import { useTranslation } from "react-i18next";

import "../../styles/LocationBadge.css";

const LocationBadge = ({ city, country, onClick }) => {
  const { t } = useTranslation();

  const isDetecting = !city || city.toLowerCase() === "detecting...";
  const hasError =
    city === "Location Error" ||
    city === "Not Supported" ||
    city === "Unknown Location";

  const handleClick = () => {
    if (!isDetecting && !hasError && onClick) {
      onClick(city);
    }
  };

  return (
    <button
      className={`location-btn ${isDetecting ? "loading" : ""} ${hasError ? "error" : ""}`}
      onClick={handleClick}
      title={t("location_title", "Use my current location")}
      type="button"
      disabled={isDetecting}
    >
      <div className="location-btn__icon-box">
        {isDetecting ? (
          <svg
            className="icon-spinner"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="22" y1="12" x2="18" y2="12"></line>
            <line x1="6" y1="12" x2="2" y2="12"></line>
            <line x1="12" y1="6" x2="12" y2="2"></line>
            <line x1="12" y1="22" x2="12" y2="18"></line>
            <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
          </svg>
        )}
      </div>

      <div className="location-btn__info">
        <span className="location-btn__label">
          {hasError
            ? "Error"
            : isDetecting
              ? t("locating", "Locating...")
              : t("my_location", "My Location")}
        </span>

        {!isDetecting && !hasError && (
          <span className="location-btn__city">
            {city} {country && `, ${country}`}
          </span>
        )}
      </div>
    </button>
  );
};

export default LocationBadge;
