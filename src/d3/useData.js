import { csv } from "d3";
import { useEffect, useState } from "react";

export const useData = ({ csvUrl, slice, formatRow = (item) => item }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (item) => {
      return formatRow(item);
    };
    csv(csvUrl, row).then((data) => {
      if (slice) {
        return setData(data.slice(0, slice));
      }
      return setData(data);
    });
  }, [csvUrl, formatRow, slice]);

  return data;
};
