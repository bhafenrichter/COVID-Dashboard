import millify from 'millify';
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
import { utils } from './../../scripts/utils';
export interface LineChartProps {
  keys: Array<{ key: string; displayName: string }>;
  data?: Array<any>;
}

const MIN_SCREEN_TOOLTIP_WIDTH = 991;

export const LineChart: React.SFC<LineChartProps> = (props) => {
  const { data, keys } = props;
  const [renderedData, setRenderedData] = useState([]);

  // don't show tooltip on mobile
  let showTooltip = utils.getScreenWidth() > MIN_SCREEN_TOOLTIP_WIDTH;

  // cleanup the numbers for better mobile experience
  const DataFormater = (number: number) => {
    if (!isNaN(number) && isFinite(number)) {
      return millify(number);
    }
    return number.toString();
  };

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
        <YAxis tickFormatter={DataFormater} />
        {showTooltip ? (
          <Tooltip
            wrapperClassName="tooltip-wrapper"
            formatter={DataFormater}
          />
        ) : null}
      </Rechart>
    </ResponsiveContainer>
  );
};
