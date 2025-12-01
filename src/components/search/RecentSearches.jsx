import { useTranslation } from "react-i18next";

import "../../styles/SearchSuggestions.css";

const RecentSearches = ({ items, onSelect, onClear }) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  return (
    <div className="suggestions-panel">
      <div className="suggestions-panel__header">
        <span className="suggestions-panel__title">{t("recent_searches")}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="suggestions-panel__clear-btn"
        >
          {t("clear_history")}
        </button>
      </div>

      <ul className="suggestions-panel__list">
        {items.map((item, index) => (
          <li
            key={`recent-${index}`}
            className="suggestions-panel__item suggestions-panel__item--recent"
            onClick={() => onSelect(item)}
          >
            <div className="suggestions-panel__left">
              {/* Иконка часов для истории */}
              <span className="suggestions-panel__icon-history">🕒</span>
              <span className="suggestions-panel__city">{item.name}</span>
            </div>

            {item.country && (
              <div className="suggestions-panel__right">
                <span className="suggestions-panel__country-text">
                  {item.country}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
