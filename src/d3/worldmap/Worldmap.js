import { useJsonData } from "../useData";
import { WorldMarks } from "./WorldMarks";

const width = 1080;
const height = 720;

export const Worldmap = () => {
  const data = useJsonData({
    jsonUrl: "https://unpkg.com/world-atlas@2.0.2/countries-50m.json",
  });

  if (!data) return <pre>Loading...</pre>;

  return (
    <svg width={width} height={height}>
      <WorldMarks data={data} />
    </svg>
  );
};
