import { useUnit } from "../../context/UnitContext";

import "../../styles/Switches.css";

const UnitSwitch = () => {
  const { Metric, toggleUnit } = useUnit();

  const handleSetUnit = (targetUnit, e) => {
    e.stopPropagation();

    if (Metric !== targetUnit) {
      toggleUnit();
    }
  };

  return (
    <div className="segmented-control">
      <div
        className={`segmented-control__option ${Metric === "metric" ? "active" : ""}`}
        onClick={(e) => handleSetUnit("metric", e)}
      >
        °C
      </div>
      <div
        className={`segmented-control__option ${Metric === "imperial" ? "active" : ""}`}
        onClick={(e) => handleSetUnit("imperial", e)}
      >
        °F
      </div>
    </div>
  );
};

export default UnitSwitch;
