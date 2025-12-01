import { useTranslation } from "react-i18next";
import "../../styles/Switches.css";

const LangSwitch = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.split("-")[0] : "en";

  const setLang = (lang, e) => {
    e.stopPropagation();

    i18n.changeLanguage(lang);
  };

  return (
    <div className="segmented-control">
      <div
        className={`segmented-control__option ${currentLang === "ru" ? "active" : ""}`}
        onClick={(e) => setLang("ru", e)}
      >
        RU
      </div>
      <div
        className={`segmented-control__option ${currentLang === "en" ? "active" : ""}`}
        onClick={(e) => setLang("en", e)}
      >
        EN
      </div>
    </div>
  );
};

export default LangSwitch;
