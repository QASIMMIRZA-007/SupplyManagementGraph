// FilterComponent.js
import { useState } from "react";
import style from "./mainLayout.module.scss";
import { IoIosArrowDropdown } from "react-icons/io";

const FilterComponent = ({
  selectedHistory,
  handleHistorySelect,
  toggleHistory,
}) => {
  const [isListVisible, setListVisibility] = useState(false); // State variable to track visibility

  const toggleVisibility = () => {
    toggleHistory(); // Toggle the visibility of the dropdown in the FilterComponent
    setListVisibility((prev) => !prev); // Update the visibility state in the FilterComponent
  };
  const dataKeys = {
    All: ["pv", "curr", "pow", "freq", "vol"],
    Current: ["curr"],
    Voltage: ["vol"],
    Frequency: ["freq"],
    Power: ["pow"],
  };
  const keysToShow = dataKeys[selectedOption] || dataKeys["All"];

  return (
    <div className={style.rectangle}>
      <div className={style.innerRect}>
        {selectedHistory}
        <ul
          style={{
            display: isListVisible ? "block" : "none",
            height: "20vh",
            background: "red",
          }}
        >
          <li onClick={() => handleHistorySelect("Last week")}>Last week</li>
          <li onClick={() => handleHistorySelect("Last month")}>Last month</li>
          <li onClick={() => handleHistorySelect("Last year")}>Last year</li>
        </ul>
        <span>
          <IoIosArrowDropdown onClick={toggleVisibility} />
        </span>
      </div>
    </div>
  );
};

export default FilterComponent;
