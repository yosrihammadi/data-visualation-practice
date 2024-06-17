import { useState } from "react";
import { Dropdown } from "../components/Dropdown";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { IrisAxisLeft } from "./IrisAxisLeft";
import { IrisMarks } from "./IrisMarks";
import { extent, format, max, min, scaleLinear } from "d3";

const width = 960;
const menuHeight = 75;
const height = 720 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];

const getLabel = (value) => {
  for (const attribute of attributes) {
    if (attribute.value === value) {
      return attribute.label;
    }
  }
};
const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv";

export const ScatterPlot = () => {
  const data = useData({ csvUrl });
  const initalXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initalXAttribute);
  const xAxisLabel = getLabel(xAttribute);
  const xValue = (d) => d[xAttribute];

  const initalYAttribute = "sepal_length";
  const [yAttribute, setYAttribute] = useState(initalYAttribute);
  const yAxisLabel = getLabel(yAttribute);
  const yValue = (d) => d[yAttribute];

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
  return (
    <div>
      <label for="x-select">X:</label>
      <Dropdown
        id="x-select"
        options={attributes}
        onSelectedValueChange={setXAttribute}
        selectedValue={xAttribute}
      />
      <label for="y-select">Y:</label>
      <Dropdown
        id="y-select"
        options={attributes}
        onSelectedValueChange={setYAttribute}
        selectedValue={yAttribute}
      />
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
          <IrisMarks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    </div>
  );
};
