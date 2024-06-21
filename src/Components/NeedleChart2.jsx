import React, { Component } from "react";
import { render } from "react-dom";
import GaugeChart from "react-gauge-chart";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      humidity: 0.45,
    };
  }

  componentDidMount() {
    const objectList = {
      exampleObject: {
        humidity: 0.48,
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
