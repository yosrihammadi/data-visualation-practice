export const ColorMarks = ({
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  tooltipFormat,
  circleRadius = 10,
  colorScale,
  colorValue,
}) =>
  data.map((item) => {
    return (
      <circle
        cx={xScale(xValue(item))}
        cy={yScale(yValue(item))}
        fill={colorScale(colorValue(item))}
        r={circleRadius}
      >
        <title>{tooltipFormat(xValue(item))}</title>
      </circle>
    );
  });
