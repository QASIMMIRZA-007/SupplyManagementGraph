

// import React, { Component } from "react";
// import { render } from "react-dom";

// import GaugeChart from "react-gauge-chart";

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "React",
//     };
//   }

//   render() {
//     return (
//       <div>
//         <GaugeChart
//           id="gauge-chart"
//           nrOfLevels={1}
//           colors={["#00ff00"]}
//           arcWidth={0.3}
//           percent={0.45}
//           textColor={"#00ff00"}
//         //   hideText={true} // If you want to hide the text
//         />
//         <div className="text">
//           {/* <h3 className="pie-heading">45.06 %</h3>
//           <p className="pie-para">consumed from the grid</p> */}
//         </div>
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById("root"));


import React, { Component } from "react";
import { render } from "react-dom";
import GaugeChart from "react-gauge-chart";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      humidity: 0.45, // Set an initial value for humidity (percentage)
    };
  }

  componentDidMount() {
    // Fetch data or set data from your object list
    // Example: Assume you have an object with humidity value
    const objectList = {
      exampleObject: {
        humidity: 0.60, 
      },
     
    };

    // Get the humidity value from the object list
    const humidityValue = objectList.exampleObject?.humidity || 0.45;

    // Update the state with the new humidity value
    this.setState({ humidity: humidityValue });
  }

  render() {
    return (
      <div>
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={1}
          colors={["#00ff00"]}
          arcWidth={0.3}
          percent={this.state.humidity}
          textColor={"#00ff00"}
        />
      
      
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
