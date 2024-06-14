import { extent, max, min, scaleLinear, scaleTime, timeFormat } from "d3";
import { AxisBottom } from "./AxisBottom";
import { useData } from "./useData";
import { IrisAxisLeft } from "./IrisAxisLeft";
import { Lines } from "./Lines";

const csvUrl =
  "https://gist.githubusercontent.com/dandgerson/2841e9b30f3a7c2c9da7bb4d06ecc3fc/raw/af20862430cf8eb0c4716672e4857001412d8380/week_temperatature.csv";
const width = 1080;
const height = 720;
const margin = { top: 20, right: 30, bottom: 60, left: 100 };
const xAxisLabelOffset = 40;
const yAxisLabelOffset = 50;

const formatRow = (item) => {
  item.temperature = parseFloat(item.temperature);
  item.timestamp = new Date(item.timestamp);
  return item;
};

// const slice = 10;

export default function TemperatureLineChart() {
  const data = useData({ csvUrl, formatRow });

  if (!data) return <div>Loading...</div>;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = height - margin.left - margin.right;

  const xValue = (item) => item.timestamp;
  const yValue = (item) => item.temperature;

  const xAxisLabel = "Timestamp";
  const yAxisLabel = "Temperature";

  const tickOffset = 8;

  const xAxisTickFormat = timeFormat("%a");

  // define width of bar
  const xScale = scaleTime()
    // .domain([min(data, xValue), max(data, xValue)])
    .domain([min(data, xValue), max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  // Prepare to divide categories by height so they get y coordinates different of others
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={tickOffset}
        />
        <text
          className="axis-label"
          style={{ textAnchor: "middle" }}
          // x={-yAxisLabelOffset}
          // y={innerHeight / 2}
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <IrisAxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={tickOffset}
        />
        <text
          className="axis-label"
          style={{ textAnchor: "middle" }}
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
        >
          {xAxisLabel}
        </text>
        <Lines
          data={data}
          xScale={xScale}
          yScale={yScale}
          yValue={yValue}
          xValue={xValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={4}
        />
      </g>
    </svg>
  );
}
