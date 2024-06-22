export const ColorLegend = ({ colorScale, tickSpacing = 25, tickSize }) =>
  colorScale.domain().map((domainValue, index) => (
    <g transform={`translate(0, ${index * tickSpacing})`}>
      <circle fill={colorScale(domainValue)} r={tickSize} />
      <text x={tickSize + tickSize / 2} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
