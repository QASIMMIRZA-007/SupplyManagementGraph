import { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { onValue, ref } from "firebase/database";
import NeedleChart2 from "./NeedleChart2";
import NeedleChart4 from "./NeedleChart4";
import style from "./mainLayout.module.scss";


// importing firebass related modules
// import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import CsvDownload from "react-csv-downloader";
import CustomBarChart from "./CustomBarChart";
import CustomLineChart from "./CustomLineChart";


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
  const [cities, setCities] = useState([]);

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
      // console.log("data:", cities);
    } catch (error) {
      console.error("Error:", error);
    }
  })();

  useEffect(() => {
    getCities()
      .then((data) => setCities(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const citiesToDownload = [];
  Object.entries(cities).forEach(([key, value]) => {
    console.log(key, value);

    const temp = {
      Enviornment_Humidity: value?.Enviornment?.Humidity,
      Enviornment_Temperature: value?.Enviornment?.Temperature,
      // Sensor1_Current:value?.Sensor1?.Current,
      Sensor1_Energy: value?.Sensor1?.Energy,
      Sensor1_Power: value?.Sensor1?.Power,
      // Sensor1_Frequency:value?.Sensor1?.Frequency,
      Sensor1_PowerFactor: value?.Sensor1?.PowerFactor,

      // Sensor2_Current:value?.Sensor2?.Current,
      Sensor2_Energy: value?.Sensor2?.Energy,
      Sensor2_Power: value?.Sensor2?.Power,
      // Sensor2_Frequecy:value?.Sensor2?.Frequency,
      Sensor2_PowerFactor: value?.Sensor2?.PowerFactor,
      // Sensor3_Current:value?.Sensor3?.Current,
      Sensor3_Energy: value?.Sensor3?.Energy,
      Sensor3_Power: value?.Sensor3?.Power,
      // Sensor3_Frequecy:value?.Sensor3?.Frequency,
      Sensor3_PowerFactor: value?.Sensor3?.PowerFactor,
    };

    citiesToDownload.push(temp);
  });

  console.log(citiesToDownload, "cities to donload");

  const columns = [
    {
      id: "Enviornment_Humidity",
      displayName: "Humidity",
    },
    {
      id: "Enviornment_Temperature",
      displayName: "Temperature",
    },
    // {
    //   id: 'Sensor1_Current',
    //   displayName: 'Sensor1 Current',
    // },
    {
      id: "Sensor1_Energy",
      displayName: "Sensor1 Energy",
    },
    // {
    //   id: 'Sensor1_Frequency',
    //   displayName: 'Sensor1 Frequency',
    // },
    {
      id: "Sensor1_Power",
      displayName: "Sensor1 Power",
    },
    {
      id: "Sensor1_PowerFactor",
      displayName: "Sensor1 PowerFactor",
    },
    // {
    //   id: 'Sensor1_Voltage',
    //   displayName: 'Sensor1 Voltage',
    // },
    // {
    //   id: 'Sensor2_Current',
    //   displayName: 'Sensor2 Current',
    // },
    {
      id: "Sensor2_Energy",
      displayName: "Sensor2 Energy",
    },
    // {
    //   id: 'Sensor2_Frequency',
    //   displayName: 'Sensor2 Frequency',
    // },
    {
      id: "Sensor2_Power",
      displayName: "Sensor2 Power",
    },
    {
      id: "Sensor2_PowerFactor",
      displayName: "Sensor2 PowerFactor",
    },
    // {
    //   id: 'Sensor2_Voltage',
    //   displayName: 'Sensor2 Voltage',
    // },
    // {
    //   id: 'Sensor3_Current',
    //   displayName: 'Sensor3 Current',
    // },
    {
      id: "Sensor3_Energy",
      displayName: "Sensor3 Energy",
    },
    // {
    //   id: 'Sensor3_Frequency',
    //   displayName: 'Sensor3 Frequency',
    // },
    {
      id: "Sensor3_Power",
      displayName: "Sensor3 Power",
    },
    {
      id: "Sensor3_PowerFactor",
      displayName: "Sensor3 PowerFactor",
    },
    // {
    //   id: 'Sensor3_Voltage',
    //   displayName: 'Sensor3 Voltage',
    // },
  ];

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
                    if (index === 1) {
                      // Process only the first object
                      return (
                        <div key={key} className={style.box}>
                          Voltage
                          <div className="d-flex al-c jc-sp ">
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
                        <div key={key} className={`${style.box} margin `}>
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
<div className={style.bigBoxWrapper}> 
              <div className={style.bigBox}>
               <CustomBarChart />
               
                
             
                <div className={style.innerBigBox} style={{visibility:"hidden"}}>
                  <div className={style.vlaues}>
                    {cities &&
                      Object.entries(cities).map(([key, value], index) => {
                        if (index === 0) {
                          return (
                            <table style={{ width: "100%" }}>
                              <tr>
                                <th>Values</th>
                                <th>Min</th>
                                <th>Max</th>
                              </tr>
                              <tr>
                                <td>Current</td>
                                <td>{value?.Sensor1?.Current}</td>
                                <td>{value?.Sensor3?.Current}</td>
                              </tr>
                              <tr>
                                <td>Power</td>
                                <td>{value?.Sensor1?.Power}</td>
                                <td>{value?.Sensor3?.Power}</td>
                              </tr>
                              <tr>
                                <td>Voltage</td>
                                <td>{value?.Sensor2?.Voltage}</td>
                                <td>{value?.Sensor3?.Voltage}</td>
                              </tr>
                              <tr>
                                <td>Frequency</td>
                                <td>{value?.Sensor1?.Frequency}</td>
                                <td>{value?.Sensor3?.Frequency}</td>
                              </tr>
                            </table>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
              <div className={style.bigBox}>
             <CustomLineChart />
               
                
             
                <div className={style.innerBigBox}>
                  <div className={style.vlaues}>
                    {cities &&
                      Object.entries(cities).map(([key, value], index) => {
                        if (index === 0) {
                          return (
                            <table style={{ width: "100%" }}>
                              <tr>
                                <th>Values</th>
                                <th>Min</th>
                                <th>Max</th>
                              </tr>
                              <tr>
                                <td>Current</td>
                                <td>{value?.Sensor1?.Current}</td>
                                <td>{value?.Sensor3?.Current}</td>
                              </tr>
                              <tr>
                                <td>Power</td>
                                <td>{value?.Sensor1?.Power}</td>
                                <td>{value?.Sensor3?.Power}</td>
                              </tr>
                              <tr>
                                <td>Voltage</td>
                                <td>{value?.Sensor2?.Voltage}</td>
                                <td>{value?.Sensor3?.Voltage}</td>
                              </tr>
                              <tr>
                                <td>Frequency</td>
                                <td>{value?.Sensor1?.Frequency}</td>
                                <td>{value?.Sensor3?.Frequency}</td>
                              </tr>
                            </table>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
              </div>

              <div className="flexx al  jc">
                <div className={style.rectangle}>
                  <div className={style.innerRect}>
                    {selectedOption}
                    <ul style={{ display: isListVisible ? "block" : "none" }}>
                      <li onClick={() => handleOptionSelect("Current")}>
                        Current
                      </li>
                      {/* <li onClick={() => handleOptionSelect("Power")}>Power</li> */}
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
                      {/* <li onClick={() => handleHistorySelect("Today ")}>
                        Today
                      </li> */}
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
              <div className="downloadData">
                <CsvDownload
                  text="Download"
                  datas={citiesToDownload}
                  columns={columns}
                  filename="myfile"
                  extension=".csv"
                />
              </div>

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
