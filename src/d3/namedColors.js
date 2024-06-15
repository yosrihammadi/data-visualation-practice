import { arc, csv, svg } from "d3";
import { useEffect, useState } from "react";
import { message } from "./message";

const csvUrl =
  "https://gist.githubusercontent.com/yosrihammadi/ab591e4f7c9d521eaa9ba490a785d2bd/raw/669c4f57ba98ed0cb7cbf8ff0ae73128f6df9f51/named%2520css%2520colors";
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc().innerRadius(0).outerRadius(width);
// .startAngle(Math.PI / 2)
// .endAngle((Math.PI * 3) / 2);

export default function NamedColors() {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) return <pre>Loading...</pre>;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {data.map((item, i) => {
          return (
            <path
              fill={item["RGB hex value"]}
              d={pieArc({
                startAngle: (i / data.length) * 2 * Math.PI,
                endAngle: ((i + 1) / data.length) * 2 * Math.PI,
              })}
            />
          );
        })}
      </g>
    </svg>
  );

  return <pre>Data is {data ? message(data) : "loading"}</pre>;
}
