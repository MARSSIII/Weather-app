import { useTranslation } from "react-i18next";
import { useWeather } from "../../context/WeatherContext";

import "../../styles/States.css";

const ErrorState = ({ message }) => {
  const { t } = useTranslation();
  const { refetch } = useWeather();

  const handleRetry = () => {
    if (typeof refetch === "function") {
      refetch();
    }
  };

  let displayMessage = message;
  if (message === "Failed to fetch" || message?.includes("Network")) {
    displayMessage = t("network_error", "Network connection issue");
  }

  return (
    <div className="error-card">
      <div className="error-card__illustration">
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M 4 16 C 2.5 16 1 15 1 13 C 1 11 2.5 9 4.5 9 C 5 5.5 8 3 11.5 3 C 15 3 17.5 5 18.5 7.5 C 20.5 8 22 9.5 22 12 C 22 15 20 16 17.5 16 L 4 16 Z"
            fill="var(--tile-base)"
            stroke="currentColor"
            className="error-cloud-shape"
          />

          <g className="error-face">
            <path d="M8 9l2 2" />
            <path d="M10 9l-2 2" />

            <path d="M14 9l2 2" />
            <path d="M16 9l-2 2" />

            <path d="M9 14c.5.5 1.5.5 2 0s1.5-.5 2 0" />
          </g>

          <path
            d="M20 16l-2 4h3l-2 4"
            className="error-bolt"
            stroke="#ef4444"
            fill="#ef4444"
          />
        </svg>
      </div>

      <h3 className="error-card__title">{t("oops", "Oops!")}</h3>

      <p className="error-card__message">
        {t("error_generic", "Something went wrong while fetching weather.")}
      </p>

      {displayMessage && (
        <span className="error-card__detail">Error: {displayMessage}</span>
      )}

      <button className="retry-button" onClick={handleRetry}>
        {t("try_again", "Try Again")}
      </button>
    </div>
  );
};

export default ErrorState;
