// FilterComponent.js
import React from 'react';
import style from './mainLayout.module.scss';
import { IoIosArrowDropdown } from 'react-icons/io';

const FilterComponent = ({ selectedHistory, handleHistorySelect, history, toggleHistory }) => {
  return (
    <div className={style.rectangle}>
      <div className={style.innerRect}>
        {selectedHistory}
        <ul style={{ display: history ? 'block' : 'none' }}>
          <li onClick={() => handleHistorySelect('Last  7 days')}>
            Monday
          </li>
          <li onClick={() => handleHistorySelect('Last month')}>
            Tuesday
          </li>
          <li onClick={() => handleHistorySelect('Last  7 days')}>
            Last 7 days
          </li>
          <li onClick={() => handleHistorySelect('Last month')}>
            Last month
          </li>
        </ul>
        <span>
          <IoIosArrowDropdown onClick={toggleHistory} />
        </span>
      </div>
    </div>
  );
}

export default FilterComponent;
