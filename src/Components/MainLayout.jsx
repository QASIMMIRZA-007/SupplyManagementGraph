import { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { onValue, ref } from "firebase/database";
import NeedleChart2 from "./NeedleChart2";
import NeedleChart4 from "./NeedleChart4";
import BarChart from "./BarChart";
import style from "./mainLayout.module.scss";

// importing firebass related modules
// import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

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
  // const [projects, setProjects] = useState([]);
  // console.log("prroduct", projects);
  const [history, setHistory] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Voltage");
  const [selectedHistory, setSelectedHistory] = useState("Last 7 days");
  const [data, setData] = useState(generateRandomData());
  const [cities, setCities] = useState(null);

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

  // Database related code presents here

  async function getCities() {
    try {
      const citiesRef = ref(db, "dev1gf");

      // Use a Promise to wait for the callback to be invoked
      return new Promise((resolve, reject) => {
        onValue(
          citiesRef,
          (snapshot) => {
            const cityList = snapshot.val();

            resolve(cityList);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  // Use case the async function
  (async () => {
    try {
      const cities = await getCities();
      console.log("data:", cities);
    } catch (error) {
      console.error("Error:", error);
    }
  })();

  useEffect(() => {
    getCities()
      .then((data) => setCities(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <div className={style.mainLayout}>
        <div className={style.layout}>
          <div className={style.left}>
            <div className={style.subLeft}>
              <div className="flex al a jc">
                {/* {cities &&
                  Object.entries(cities).map(([key, value]) => (
                    <div key={key} className={style.box}>
                      Current
                      <div className="d-flex al-c jc-sp">
                        <div>
                          {cities[Object.keys(cities).pop()].Sensor1?.Current}
                        </div>
                        <div>
                          {cities[Object.keys(cities).pop()].Sensor2?.Current}
                        </div>
                        <div>
                          {cities[Object.keys(cities).pop()].Sensor3?.Current}
                        </div>
                      </div>
                    </div>
                  ))} */}
                   {/* <div className={style.box}  key={Object.keys(cities).pop()}>
      Last Data
      <div className="d-flex al-c jc-sp">
        <div>
          {cities[Object.keys(cities).pop()].Sensor1?.Current}
        </div>
        <div>
          {cities[Object.keys(cities).pop()].Sensor2?.Current}
        </div>
        <div>
          {cities[Object.keys(cities).pop()].Sensor3?.Current}
        </div>
      </div>
    </div> */}
{/* 
                {cities &&
                  Object.entries(cities).map(([key, value]) => (
                    <div key={key} className={style.box}>
                      Power
                      <div className="d-flex al-c jc-sp">
                        <div>{value?.Sensor1?.Power}</div>
                        <div>{value?.Sensor2?.Power}</div>
                        <div>{value?.Sensor3?.Power}</div>
                      </div>
                    </div>
                  ))} */}
              </div>

              <div className="flex al  jc">
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
                    Power
                    <div className="d-flex al-c jc-sp">
                      <div>{sensor[`Sensor${index + 1}`].Power}</div>
                      <div>{sensor[`Sensor${index + 2}`].Power}</div>
                      <div>{sensor[`Sensor${index + 3}`].Power}</div>
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
                    <div className={style.innerBigBox}>
                      <div className={style.rectBox}>{data.value2.value}</div>

                      <div className={style.rectBox}>{data.value2.value}</div>
                      <div className={style.rectBox}>{data.value3.value}</div>
                      <div className={style.rectBox}>{data.value4.value}</div>
                    </div>
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
