import "./App.css";
import IrisScatterPlot from "./d3/IrisScatterPlot";
import TemperatureLineChart from "./d3/TemperatureLineChart";
import CountryChart from "./d3/countryChart";
import NamedColors from "./d3/namedColors";
import { Worldmap } from "./d3/worldmap/Worldmap";

function App() {
  return (
    <div className="app">
      <Worldmap />
      {/* <TemperatureLineChart /> */}
      {/* <IrisScatterPlot /> */}
      {/* <CountryChart /> */}
      {/* <NamedColors /> */}
      {/* <FaceEmoji /> */}
      {/* <MouseInteraction /> */}
    </div>
  );
}

export default App;
