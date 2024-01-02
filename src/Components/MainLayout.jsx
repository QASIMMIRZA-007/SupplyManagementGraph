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
                {cities &&
                  Object.entries(cities).map(([key, value], index) => {
                    if (index === 0) {
                      // Process only the first object
                      return (
                        <div key={key} className={style.box}>
                          Current
                          <div className="d-flex al-c jc-sp">
                          
                          <div>A</div>
                            <div>B</div>
                            <div>C</div>
                            </div>
                            <div className="d-flex al-c jc-sp">
                            <div>{value?.Sensor1?.Current}</div>
                            <div>{value?.Sensor2?.Current}</div>
                            <div>{value?.Sensor3?.Current}</div>
                          </div>
                        </div>
                      );
                    } else {
                      // Return null for the subsequent objects
                      return null;
                    }
                  })}
                {/* Power */}
                {cities &&
                  Object.entries(cities).map(([key, value], index) => {
                    if (index === 0) {
                      // Process only the first object
                      return (
                        <div key={key} className={style.box}>
                          Power
                          <div className="d-flex al-c jc-sp">
                          <div>A</div>
                            <div>B</div>
                            <div>C</div>
                            </div>
                            <div className="d-flex al-c jc-sp">
                            <div>{value?.Sensor1?.Power}</div>
                            <div>{value?.Sensor2?.Power}</div>
                            <div>{value?.Sensor3?.Power}</div>
                          </div>
                        </div>
                      );
                    } else {
                      // Return null for the subsequent objects
                      return null;
                    }
                  })}
              </div>

              <div className="flex al  jc">
                {cities &&
                  Object.entries(cities).map(([key, value], index) => {
                    if (index === 0) {
                      // Process only the first object
                      return (
                        <div key={key} className={style.box}>
                          Voltage
                          <div className="d-flex al-c jc-sp">
                         
                          <div>A</div>
                            <div>B</div>
                            <div>C</div>
                            </div>
                            <div className="d-flex al-c jc-sp">
                            <div>{value?.Sensor1?.Voltage}</div>
                            <div>{value?.Sensor2?.Voltage}</div>
                            <div>{value?.Sensor3?.Voltage}</div>
                          </div>
                        </div>
                      );
                    } else {
                      // Return null for the subsequent objects
                      return null;
                    }
                  })}
                {cities &&
                  Object.entries(cities).map(([key, value], index) => {
                    if (index === 0) {
                      // Process only the first object
                      return (
                        <div key={key} className={style.box}>
                          Frequency
                          <div className="d-flex al-c jc-sp">
                         
                         
                         <div>A</div>
                           <div>B</div>
                           <div>C</div>
                           </div>
                           <div className="d-flex al-c jc-sp">
                            
                            <div>{value?.Sensor1?.Frequency}</div>
                            <div>{value?.Sensor2?.Frequency}</div>
                            <div>{value?.Sensor3?.Frequency}</div>
                          </div>
                        </div>
                      );
                    } else {
                      // Return null for the subsequent objects
                      return null;
                    }
                  })}
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
                <NeedleChart2 item={cities} />
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
