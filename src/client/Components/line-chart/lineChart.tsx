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
  data?: Array<any>;
}

export const LineChart: React.SFC<LineChartProps> = (props) => {
  const { data } = props;
  const [renderedData, setRenderedData] = useState([
    { name: 'a', uv: 400, pv: 2400, amt: 3600 },
    { name: 'a', uv: 400, pv: 2400, amt: 3600 },
    { name: 'a', uv: 400, pv: 2400, amt: 3600 },
  ]);

  useEffect(() => {
    if (data === []) {
      // setRenderedData([{name: 'a', value: 12}]);
    }
  }, [data]);

  return (
    <ResponsiveContainer height="100%" width="100%" aspect={2}>
      <Rechart
        data={renderedData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <Line type="monotone" dataKey="uv" stroke="#DFE0EB" />
        <Line type="monotone" dataKey="pv" stroke="rgba(55, 81, 255, 1)" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip />
      </Rechart>
    </ResponsiveContainer>
  );
};
