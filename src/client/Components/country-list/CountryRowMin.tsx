import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { ee, EVTS } from '../../scripts/eventEmitter';

export interface CountryRowProps {
  country: string;
  stat?: string | number;
  logo: string;
  colors?: boolean;
  icons?: boolean;
}

export const CountryRowMin = function (props: CountryRowProps) {
  const { country, stat, colors, icons, logo } = props;
  let trendClass;

  if (Number(stat) >= 0 && colors) {
    trendClass = 'trend-up';
  } else if (colors) {
    trendClass = 'trend-down';
  }

  return (
    <div
      className="country-row country-row-min"
      onClick={() => ee.dispatch(EVTS.CHANGE_COUNTRY, { name: country, logo })}>
      <p className="text">{country}</p>

      <div className={trendClass + ' stat-body'}>
        <p className="text">{stat}%</p>
        {icons ? (
          Number(stat) < 0 ? (
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
