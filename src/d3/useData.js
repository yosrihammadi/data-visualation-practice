import { csv, json } from "d3";
import { useEffect, useState } from "react";
import { feature, mesh } from "topojson";

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
  }, [csvUrl, slice]);

  return data;
};

export const useJsonData = ({ jsonUrl, slice }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (item) => {
      return item;
    };
    json(jsonUrl, row).then((topology) => {
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    });
  }, [jsonUrl, slice]);

  return data;
};
