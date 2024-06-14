import { curveNatural, line } from "d3";

export const Lines = ({
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  // tooltipFormat,
  // circleRadius = 10,
}) => (
  <g className="marks">
    <path
      fill="none"
      d={line()
        .curve(curveNatural)
        .x((item) => xScale(xValue(item)))
        .y((item) => yScale(yValue(item)))(data)}
    />
    {/* {data.map((item) => {
      return (
        <circle
          cx={xScale(xValue(item))}
          cy={yScale(yValue(item))}
          r={circleRadius}
        >
          <title>{tooltipFormat(xValue(item))}</title>
        </circle>
      );
    })} */}
  </g>
);
