import React, { Component } from "react";
import { render } from "react-dom";
import GaugeChart from "react-gauge-chart";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() { 
    return (
      <div>
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={1}
          colors={["#ff0"]}
          arcWidth={0.3}
          percent={0.22}
          textColor={"#ff0"}
          //   hideText={true} // If you want to hide the text
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
