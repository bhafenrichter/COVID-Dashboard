import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Line,
  LineChart as Rechart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface LineChartProps {
  keys: Array<{ key: string; displayName: string }>;
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
    if (data !== []) {
      // @ts-ignore
      setRenderedData(data);
    }
  }, [data]);

  if (data && data.length === 0) {
    return (
      <div className="chart-wrapper">
        <p className="centered text">No Data Reported</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer height="100%" width="100%" aspect={2}>
      <Rechart
        data={renderedData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <Line
          type="monotone"
          dataKey={keys[0].key}
          name={keys[0].displayName}
          stroke="rgba(55, 81, 255, 1)"
          dot={false}
        />
        {keys.length > 1 ? (
          <Line
            type="monotone"
            name={keys[1].displayName}
            dataKey={keys[1].key}
            stroke="#DFE0EB"
            dot={false}
          />
        ) : null}
        {keys.length > 2 ? (
          <Line
            type="monotone"
            name={keys[2].displayName}
            dataKey={keys[2].key}
            stroke="green"
            strokeWidth={3}
            dot={false}
          />
        ) : null}

        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip wrapperClassName="tooltip-wrapper" />
      </Rechart>
    </ResponsiveContainer>
  );
};
