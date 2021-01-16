import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export interface CountryRowProps {
  country: string;
  stat?: string | number;
  logo?: string;
}

export const CountryRowMin = function (props: CountryRowProps) {
  const { country, stat } = props;
  let trendClass;

  if (Number(stat) > 0) {
    trendClass = 'trend-up';
  } else {
    trendClass = 'trend-down';
  }

  return (
    <div
      className="country-row country-row-min">
      <p className="text">{country}</p>
      <div className={trendClass + ' stat-body'}>
        <p className="text">{stat}%</p>
        {Number(stat) < 0 ? <FaCaretDown color="green"></FaCaretDown> : <FaCaretUp color="red"></FaCaretUp>}
      </div>
    </div>
  );
};
