export const Marks = ({
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  tooltipFormat,
}) =>
  data.map((item) => {
    return (
      <rect
        key={yValue(item)}
        className="mark"
        x={0}
        y={yScale(yValue(item))}
        width={xScale(xValue(item))}
        height={yScale.bandwidth()}
      >
        <title>{tooltipFormat(xValue(item))}</title>
      </rect>
    );
  });
