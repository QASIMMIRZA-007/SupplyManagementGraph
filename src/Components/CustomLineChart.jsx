// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const CustomLineChart = ({ lineChatData, selectedOption }) => {

//   const dataKeys = {
//     "All": ["pv", "curr", "pow", "freq", "vol"],
//     "Current": ["curr"],
//     "Voltage": ["vol"],
//     "Frequency": ["freq"],
//     "Power": ["pow"]
//   };
//   const keysToShow = dataKeys[selectedOption] || dataKeys["All"];

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart width={50} height={200} data={lineChatData}>
//         <XAxis dataKey="name" hide={false} />
//         <YAxis   hide={true}  />
//         <Tooltip  />
//         <Legend />
//         {keysToShow.map(key => (
//           <Line
//             key={key}
//             type="monotone"
//             dataKey={key}
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//         ))}
//         {/* <Line
//           type="monotone"
//           dataKey="pv"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="curr"
//           stroke="#ffff00"
//           activeDot={{ r: 8 }}
//         />
//          <Line
//           type="monotone"
//           dataKey="pow"
//           stroke="#82c"
//           activeDot={{ r: 8 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="freq"
//           stroke="#ffc658"
//           activeDot={{ r: 8 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="vol"
//           stroke="#ff7300"
//           activeDot={{ r: 8 }}
//         /> */}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomLineChart;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ lineChatData, selectedOption }) => {
  const dataKeys = {
    All: ["pv", "curr", "pow", "freq", "vol"],
    Current: ["curr"],
    Voltage: ["vol"],
    Frequency: ["freq"],
    Power: ["pow"],
  };
  const keysToShow = dataKeys[selectedOption] || dataKeys["All"];

  const lineColors = {
    pv: "#8884d8",
    curr: "#ffff00",
    pow: "#82c",
    freq: "#ffc658",
    vol: "#ff7300",
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={50} height={200} data={lineChatData}>
        <XAxis dataKey="name" hide={false} />
        <YAxis hide={true} />
        <Tooltip />
        <Legend />
        {keysToShow.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={lineColors[key]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
