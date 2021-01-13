import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as Rechart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface LineChartProps {
  keys: Array<string>;
  data?: Array<any>;
}

export const LineChart: React.SFC<LineChartProps> = (props) => {
  const { data, keys } = props;
  const [renderedData, setRenderedData] = useState([
    { name: 'a', uv: 400, pv: 2400, amt: 3600 },
    { name: 'a', uv: 400, pv: 2400, amt: 3600 },
    { name: 'a', uv: 400, pv: 2400, amt: 3600 },
  ]);

  useEffect(() => {
    if (data === []) {
      // @ts-ignore
      setRenderedData([{ name: 'a', value: 12 }]);
    } else {
      console.log('triggered');
      // @ts-ignore
      setRenderedData(data);
    }
  }, [data]);

  return (
    <ResponsiveContainer height="100%" width="100%" aspect={2}>
      <Rechart
        data={renderedData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <Line type="monotone" dataKey={keys[0]} stroke="rgba(55, 81, 255, 1)" />
        <Line type="monotone" dataKey={keys[1]} stroke="#DFE0EB" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip wrapperClassName="tooltip-wrapper" />
      </Rechart>
    </ResponsiveContainer>
  );
};
