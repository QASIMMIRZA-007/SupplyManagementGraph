import { useState, useEffect } from "react";
// import style from "./mainLayout.module.scss";
import NeedleChart2 from "./NeedleChart2";
import NeedleChart4 from "./NeedleChart4";
import BarChart from "./BarChart";
import { IoIosArrowDropdown } from "react-icons/io";
import style from './mainLayout.module.scss'

function generateRandomData() {
  return {
    value1: {
      value: Math.floor(Math.random() * 100),
      unit: "A", //amphere
    },
    value2:{ 
      value: Math.floor(Math.random() * 100),
      unit: "W", //watt
    },
    value3:{
      value: Math.floor(Math.random() * 100),
      unit: "Volt", //volt
    },
    value4:{
      value: Math.floor(Math.random() * 100),
      unit: "Hz", //hertzz
    }
    
  };
}

function MainLayout() {
  const [isListVisible, setListVisibility] = useState(false);
  const [history, setHistory] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Voltage");
  const [selectedHistory, setSelectedHistory] = useState("Last 7 days");
  const [data, setData] = useState(generateRandomData());

  const toggleListVisibility = () => {
    setListVisibility(!isListVisible);
  };

  const toggleHistory = () => {
    setHistory(!history);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setListVisibility(false);
  };

  const handleHistorySelect = (option) => {
    setSelectedHistory(option);
    setHistory(false);
  };

  useEffect(() => {
    // Update random data when selectedOption or selectedHistory changes
    setData(generateRandomData());
  }, [selectedOption, selectedHistory]);

  return (
    <>
      <div className={style.mainLayout}>
        <div className={style.layout}>
          <div className={style.left}>
            <div className={style.subLeft}>
              <div className="flex al  jc">
                <div className={style.box}>
                  <div className={`${style.boxData}`}></div>
                  Current -
                  <span className="miniBox">
                    {data.value1.value} {data.value1.unit}
                  </span>
                </div>
                <div className={style.box}>
                  {" "}
                  Power -<span className="miniBox">{data.value2.value} {data.value2.unit} </span>{" "}
                </div>
              </div>
              <div className="flex al  jc">
                <div className={style.box}>
                  Voltage -<span className="miniBox">{data.value3.value}  {data.value3.unit}</span>
                </div>
                <div className={style.box}>
                  Frequency -<span className="miniBox">{data.value4.value} {data.value4.unit}</span>
                </div>
              </div>
              <div className={style.bigBox}>
                <BarChart />
                <div className={style.innerBigBox}>
                <div className={style.rectBox}>{data.value1.value} {data.value1.unit}</div>
                  <div className={style.rectBox}>{data.value2. value} {data.value2.unit}</div>
                  <div className={style.rectBox}>{data.value3. value} {data.value3.unit}</div>
                  <div className={style.rectBox}>{data.value4. value} {data.value4.unit}</div>
                </div>
              </div>
              <div className="flex al  jc">
                <div className={style.rectangle}>
                  <div className={style.innerRect}>
                    {selectedOption}
                    <ul style={{ display: isListVisible ? "block" : "none" }}>
                      <li onClick={() => handleOptionSelect("Voltage")}>
                        Voltage
                      </li>
                      <li onClick={() => handleOptionSelect("Current")}>
                        Current
                      </li>
                      <li onClick={() => handleOptionSelect("Power")}>Power</li>
                    </ul>
                    <span>
                      {" "}
                      <IoIosArrowDropdown onClick={toggleListVisibility} />{" "}
                    </span>
                  </div>
                </div>
                <div className={style.rectangle}>
                  <div className={style.innerRect}>
                    {selectedHistory}
                    <ul style={{ display: history ? "block" : "none" }}>
                      <li onClick={() => handleHistorySelect("Last Hour ")}>
                        Last Hour
                      </li>
                      <li onClick={() => handleHistorySelect("Today ")}>
                        Today
                      </li>
                      <li onClick={() => handleHistorySelect("Last month ")}>
                        Last month
                      </li>
                    </ul>
                    <span>
                      {" "}
                      <IoIosArrowDropdown onClick={toggleHistory} />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.innerRight}>
              <div className={`   ${style.box} smBox `}>
                <form className={style.form}>
                  <label>
                    {" "}
                    Currently Units
                    {/* <input type="text" className={style.boxInput} /> */}
                    <div className={style.innerBigBox}>
                  
                  <div className={style.rectBox}>{data.value1.value}</div>
                  <div className={style.rectBox}>{data.value2. value}</div>
                  <div className={style.rectBox}>{data.value3. value}</div>
                  <div className={style.rectBox}>{data.value4. value}</div>
                </div>
                  </label>
                </form>
              </div>
              <div className={style.box}>
                <b>Overall Maintaince</b>
                <NeedleChart2 />
              </div>
              <div className={style.box}>
              <b>Usage</b>
                <NeedleChart4 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
