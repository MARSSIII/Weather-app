import { useTranslation } from "react-i18next";
import { useSearchSuggestions } from "../../hooks/useSearchSuggestions";

import RecentSearches from "./RecentSearches";

import "../../styles/SearchSuggestions.css";

const HighlightMatch = ({ text, highlight }) => {
  if (!highlight || !text) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={i} style={{ color: "var(--brand-core)" }}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </span>
  );
};

const SearchSuggestions = ({ query, recentSearches, onSelect, onClear }) => {
  const { t, i18n } = useTranslation();
  const { suggestions, loading, shouldFetch } = useSearchSuggestions(query);

  const showRecent = !query || query.trim() === "";

  if (showRecent) {
    return (
      <RecentSearches
        items={recentSearches}
        onSelect={onSelect}
        onClear={onClear}
      />
    );
  }

  if (!shouldFetch) return null;

  const getLocalizedName = (item) => {
    if (!item) return "";

    const currentLang = i18n.language
      ? i18n.language.split("-")[0].toLowerCase()
      : "en";

    if (item.local_names && item.local_names[currentLang]) {
      return item.local_names[currentLang];
    }

    return item.name;
  };

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return "";

    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className="suggestions-panel">
      <ul className="suggestions-panel__list">
        {loading && (
          <li className="suggestions-panel__item suggestions-panel__item--status">
            <div className="spinner-mini"></div>
            <span>{t("loading")}</span>
          </li>
        )}

        {!loading && (!suggestions || suggestions.length === 0) && (
          <li className="suggestions-panel__item suggestions-panel__item--status">
            {t("no_results")}
          </li>
        )}

        {!loading &&
          suggestions?.map((item, index) => {
            const displayName = getLocalizedName(item);

            return (
              <li
                key={`${item.name}-${item.lat}-${index}`}
                className="suggestions-panel__item"
                onClick={() => onSelect({ ...item, name: displayName })}
              >
                <div className="suggestions-panel__left">
                  <span className="suggestions-panel__icon-marker">📍</span>
                  <div className="suggestions-panel__text-group">
                    <span className="suggestions-panel__city">
                      <HighlightMatch text={displayName} highlight={query} />
                    </span>
                    <span className="suggestions-panel__state">
                      {item.state || item.country}
                    </span>
                  </div>
                </div>

                <div className="suggestions-panel__right">
                  <div className="suggestions-panel__country-badge">
                    <span className="flag-icon">
                      {getFlagEmoji(item.country)}
                    </span>
                    <span className="country-code">{item.country}</span>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
