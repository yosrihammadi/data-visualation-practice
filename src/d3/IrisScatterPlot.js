import { extent, format, max, min, scaleLinear } from "d3";
import { AxisBottom } from "./AxisBottom";
import { useData } from "./useData";
import { IrisMarks } from "./IrisMarks";
import { IrisAxisLeft } from "./IrisAxisLeft";

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
const width = 1080;
const height = 720;
const margin = { top: 20, right: 30, bottom: 60, left: 100 };
const xAxisLabelOffset = 40;
const yAxisLabelOffset = 50;

const formatRow = (item) => {
  item.sepal_length = parseFloat(item.sepal_length);
  item.sepal_width = parseFloat(item.sepal_width);
  item.petal_length = parseFloat(item.petal_length);
  item.petal_width = parseFloat(item.petal_width);
  return item;
};

// const slice = 10;

export default function IrisScatterPlot() {
  const data = useData({ csvUrl, formatRow });

  if (!data) return <div>Loading...</div>;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = height - margin.left - margin.right;

  const yValue = (item) => item.sepal_length;
  const xValue = (item) => item.sepal_width;

  const xAxisLabel = "Sepal Length";
  const yAxisLabel = "Sepal Width";

  const tickOffset = 15;

  const siFormat = format(".2s");
  const xAxisTickFormat = (v) => siFormat(v).replace("G", "B");

  // define width of bar
  const xScale = scaleLinear()
    // .domain([min(data, xValue), max(data, xValue)])
    .domain([min(data, xValue) - 0.2, max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  // Prepare to divide categories by height so they get y coordinates different of others
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

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
        <IrisMarks
          data={data}
          xScale={xScale}
          yScale={yScale}
          yValue={yValue}
          xValue={xValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg>
  );
}
