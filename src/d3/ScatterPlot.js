import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { IrisAxisLeft } from "./IrisAxisLeft";
import { extent, format, scaleLinear, scaleOrdinal } from "d3";
import { ColorMarks } from "./ColorMarks";

const width = 960;
const menuHeight = 75;
const height = 720 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv";

export const ScatterPlot = () => {
  const data = useData({ csvUrl });
  const xAxisLabel = "Petal Length";
  const xValue = (d) => d.petal_length;

  const yAxisLabel = "Petal Length";
  const yValue = (d) => d.sepal_width;

  console.log(data);
  const colorValue = (d) => d.species;

  if (!data) return <div>Loading...</div>;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <>
      {/* <div className="menu-container">
        <label for="x-select">X:</label>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
        <label for="y-select">Y:</label>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div> */}
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffset={15}
            tickFormat={xAxisTickFormat}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset} , ${
              innerHeight / 2
            }) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <IrisAxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            tickOffset={15}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
          >
            {xAxisLabel}
          </text>
          <ColorMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={6}
            colorScale={colorScale}
            colorValue={colorValue}
          />
        </g>
      </svg>
    </>
  );
};
