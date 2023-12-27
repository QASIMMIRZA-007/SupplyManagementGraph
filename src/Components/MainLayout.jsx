import { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import NeedleChart2 from "./NeedleChart2";
import NeedleChart4 from "./NeedleChart4";
import BarChart from "./BarChart";
import style from "./mainLayout.module.scss";
   // importing firebass related modules
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// genetrating random data with generateRandomData.
function generateRandomData() {
  return {
    value1: {
      value: Math.floor(Math.random() * 100),
      unit: "A", //amphere
    },
    value2: {
      value: Math.floor(Math.random() * 100),
      unit: "W", //watt
    },
    value3: {
      value: Math.floor(Math.random() * 100),
      unit: "Volt", //volt
    },
    value4: {
      value: Math.floor(Math.random() * 100),
      unit: "Hz", //hertzz
    },
  };
}

function MainLayout() {
  // state of the component
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
    setData(generateRandomData());
  }, [selectedOption, selectedHistory]);
  // Json imported data to map over the boxes.
  const boxData = {
    20231121210443: {
      Enviornment: {
        Humidity: 48.1,
        Temperature: 23,
      },
      Sensor1: {
        Current: 0.106,
        Energy: 1.685,
        Frequency: 50,
        Power: 1.4,
        PowerFactor: 0.06,
        Voltage: 233.60001,
      },
      Sensor2: {
        Current: 0.105,
        Energy: 0.01,
        Frequency: 50,
        Power: 1.3,
        PowerFactor: 0.05,
        Voltage: 233.60001,
      },
      Sensor3: {
        Current: 0.106,
        Energy: 0.128,
        Frequency: 50,
        Power: 1.3,
        PowerFactor: 0.05,
        Voltage: 233.8,
      },
    },
  };

  const sensorObjects = Object.values(boxData).map(
    ({ Enviornment, ...sensors }) => sensors
  );

  // Get a list of cities from your database
  async function getCities(db) {
    const citiesCol = collection(db, "dev1gf");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    return cityList;
   }

  console.log(getCities(), "running");

  return (
    <>
      <div className={style.mainLayout}>
        <div className={style.layout}>
          <div className={style.left}>
            <div className={style.subLeft}>
              <div className="flex al  jc">
                {sensorObjects.map((sensor, index) => (
                  <div key={index} className={style.box}>
                    Current
                    <div className="d-flex al-c jc-sp">
                      <div>{sensor[`Sensor${index + 1}`].Current}</div>
                      <div>{sensor[`Sensor${index + 2}`].Current}</div>
                      <div>{sensor[`Sensor${index + 3}`].Current}</div>
                    </div>
                  </div>
                ))}
                {sensorObjects.map((sensor, index) => (
                  <div key={index} className={style.box}>
                    Power
                    <div className="d-flex al-c jc-sp">
                      <div>{sensor[`Sensor${index + 1}`].Power}</div>
                      <div>{sensor[`Sensor${index + 2}`].Power}</div>
                      <div>{sensor[`Sensor${index + 3}`].Power}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex al  jc">
                {sensorObjects.map((sensor, index) => (
                  <div key={index} className={style.box}>
                    Voltage
                    <div className="d-flex al-c jc-sp">
                      <div>{sensor[`Sensor${index + 1}`].Voltage}</div>
                      <div>{sensor[`Sensor${index + 2}`].Voltage}</div>
                      <div>{sensor[`Sensor${index + 3}`].Voltage}</div>
                    </div>
                  </div>
                ))}
                {sensorObjects.map((sensor, index) => (
                  <div key={index} className={style.box}>
                    Frequency
                    <div className="d-flex al-c jc-sp">
                      <div>{sensor[`Sensor${index + 1}`].Frequency}</div>
                      <div>{sensor[`Sensor${index + 2}`].Frequency}</div>
                      <div>{sensor[`Sensor${index + 3}`].Frequency}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={style.bigBox}>
                <BarChart />
                <div className={style.innerBigBox}>
                  <div className={style.rectBox}>
                    {data.value1.value} {data.value1.unit}
                  </div>
                  <div className={style.rectBox}>
                    {data.value2.value} {data.value2.unit}
                  </div>
                  <div className={style.rectBox}>
                    {data.value3.value} {data.value3.unit}
                  </div>
                  <div className={style.rectBox}>
                    {data.value4.value} {data.value4.unit}
                  </div>
                </div>
              </div>
              <div className="flex al  jc">
                <div className={style.rectangle}>
                  <div className={style.innerRect}>
                    {selectedOption}
                    <ul style={{ display: isListVisible ? "block" : "none" }}>
                      <li onClick={() => handleOptionSelect("Current")}>
                        Current
                      </li>
                      <li onClick={() => handleOptionSelect("Power")}>Power</li>
                      <li onClick={() => handleOptionSelect("Frequency")}>
                        Frequency
                      </li>
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
                      <li onClick={() => handleHistorySelect("Last  7 days ")}>
                        Last 7 days
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
                    {sensorObjects.map((sensor, index) => (
                      <div key={index} className={style.innerBigBox}>
                        <div className={style.rectBox}>
                          {sensor[`Sensor${index + 1}`].Frequency}
                        </div>

                        <div className={style.rectBox}>{data.value2.value}</div>
                        <div className={style.rectBox}>{data.value3.value}</div>
                        <div className={style.rectBox}>{data.value4.value}</div>
                      </div>
                    ))}
                  </label>
                </form>
              </div>
              <div className={style.box}>
                <b>Humindity</b>
                <NeedleChart2 />
              </div>
              <div className={style.box}>
                <b>Temprature</b>
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
