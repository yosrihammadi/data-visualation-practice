export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((ticketValue) => (
    <g key={ticketValue} className="tick">
      <text
        style={{ textAnchor: "end" }}
        dy=".32em"
        x={-3}
        y={yScale(ticketValue) + yScale.bandwidth() / 2}
      >
        {ticketValue}
      </text>
    </g>
  ));
