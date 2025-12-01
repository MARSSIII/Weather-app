import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "../../styles/SunCycle.css";

const SunCycle = ({ sys, timezone }) => {
  const { t } = useTranslation();

  const [sunPosition, setSunPosition] = useState(0);
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    if (!sys) return;

    const updatePosition = () => {
      const now = Math.floor(Date.now() / 1000);
      const { sunrise, sunset } = sys;

      if (now >= sunrise && now <= sunset) {
        setIsDaytime(true);

        const totalDayLength = sunset - sunrise;
        const elapsed = now - sunrise;
        const percentage = (elapsed / totalDayLength) * 100;

        setSunPosition(percentage);
      } else {
        setIsDaytime(false);

        setSunPosition(now > sunset ? 100 : 0);
      }
    };

    updatePosition();
    const timer = setInterval(updatePosition, 60000);

    return () => clearInterval(timer);
  }, [sys]);

  const formatTime = (timestamp) => {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const radius = 80;
  const cx = 100;
  const cy = 100;

  const angle = Math.PI - (sunPosition / 100) * Math.PI;

  const sunX = cx + radius * Math.cos(angle);
  const sunY = cy - radius * Math.sin(angle);

  return (
    <div className="sun-tracker">
      <h3 className="sun-tracker__title">
        {t("sun_position", "Sun Position")}
      </h3>

      <div className="sun-tracker__graphic">
        <svg viewBox="0 0 200 110" className="sun-tracker__svg">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--tile-dimmed)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {isDaytime && (
            <path
              d={`M 20 100 A 80 80 0 0 1 ${sunX} ${sunY}`}
              fill="none"
              stroke="var(--brand-core)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          <line
            x1="10"
            y1="100"
            x2="190"
            y2="100"
            stroke="var(--border-line)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {isDaytime && (
            <g style={{ transform: `translate(${sunX}px, ${sunY}px)` }}>
              <circle
                r="6"
                fill="var(--tile-base)"
                stroke="var(--brand-core)"
                strokeWidth="2"
              />
              <circle r="3" fill="var(--brand-faded)" />
            </g>
          )}
        </svg>

        <div className="sun-tracker__legend">
          <div className="sun-tracker__point sun-tracker__point--start">
            <span className="sun-tracker__label">{t("sunrise")}</span>
            <span className="sun-tracker__time">{formatTime(sys.sunrise)}</span>
          </div>
          <div className="sun-tracker__point sun-tracker__point--end">
            <span className="sun-tracker__label">{t("sunset")}</span>
            <span className="sun-tracker__time">{formatTime(sys.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunCycle;
