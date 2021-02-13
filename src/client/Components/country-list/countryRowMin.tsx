import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { COVIDTrend } from '../../../server/jobs/trendingCountries';
import { ee, EVTS } from '../../scripts/eventEmitter';

export interface CountryRowProps {
  trend: COVIDTrend;
  colors?: boolean;
  icons?: boolean;
  placeType?: string;
}

export const CountryRowMin = function (props: CountryRowProps) {
  const { trend, colors, icons } = props;
  let trendClass;

  if (Number(trend.trend) >= 0 && colors) {
    trendClass = 'trend-up';
  } else if (colors) {
    trendClass = 'trend-down';
  }

  return (
    <div
      className="country-row country-row-min"
      onClick={() => {
        ee.dispatch(EVTS.CHANGE_PLACE, {
          name: trend.country,
          logo: trend.logo,
        });
      }}>
      <p className="text">{trend.country}</p>

      <div className={trendClass + ' stat-body'}>
        <p className="text">{trend.trend}%</p>
        {icons ? (
          Number(trend.trend) < 0 ? (
            <FaCaretDown
              color={colors ? 'rgba(150, 230, 161, 1)' : ''}></FaCaretDown>
          ) : (
            <FaCaretUp
              color={colors ? 'rgba(255, 154, 158, 1)' : ''}></FaCaretUp>
          )
        ) : null}
      </div>
    </div>
  );
};
