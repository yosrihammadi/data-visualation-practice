export const IrisMarks = ({
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  tooltipFormat,
  circleRadius = 10,
}) =>
  data.map((item) => {
    return (
      <circle
        className="mark"
        cx={xScale(xValue(item))}
        cy={yScale(yValue(item))}
        r={circleRadius}
      >
        <title>{tooltipFormat(xValue(item))}</title>
      </circle>
    );
  });
