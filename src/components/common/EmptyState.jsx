import { useTranslation } from "react-i18next";

import "../../styles/States.css";

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className="empty-card">
      <div className="empty-card__illustration">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g className="empty-card__sun">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M6.34 17.66l-1.41 1.41" />
            <path d="M19.07 4.93l-1.41 1.41" />
          </g>

          <path
            className="empty-card__cloud"
            d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"
            style={{ opacity: 0 }}
          />
          <path
            className="empty-card__cloud-shape"
            d="M 4 16 C 2.5 16 1 15 1 13 C 1 11 2.5 9 4.5 9 C 5 5.5 8 3 11.5 3 C 15 3 17.5 5 18.5 7.5 C 20.5 8 22 9.5 22 12 C 22 15 20 16 17.5 16 L 4 16 Z"
            fill="var(--tile-base)"
            stroke="var(--ink-solid)"
          />
        </svg>
      </div>

      <div className="empty-card__content">
        <h2 className="empty-card__title">
          {t("empty_title", "Weather Forecast")}
        </h2>
        <p className="empty-card__desc">
          {t(
            "empty_desc",
            "Enter a city name or use geolocation to get the current weather and forecast.",
          )}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
