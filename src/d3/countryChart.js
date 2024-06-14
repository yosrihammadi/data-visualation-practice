import { format, max, scaleBand, scaleLinear } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useData } from "./useData";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";
const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 60, left: 150 };
const xAxisLabelOffset = 40;

const formatRow = (item) => {
  item.Population = parseFloat(item["2020"] * 1000);
  return item;
};

const slice = 10;

export default function CountryChart() {
  const data = useData({ csvUrl, slice, formatRow });

  if (!data) return <div>Loading...</div>;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = height - margin.left - margin.right;

  const yValue = (item) => item.Country;
  const xValue = (item) => item.Population;

  const siFormat = format(".2s");
  const xAxisTickFormat = (v) => siFormat(v).replace("G", "B");

  // Prepare to divide categories by height so they get y coordinates different of others
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.2);

  // define width of bar
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          style={{ textAnchor: "middle" }}
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
        >
          Population
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          yValue={yValue}
          xValue={xValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
}
