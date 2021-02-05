import millify from 'millify';
import React, { useLayoutEffect, useRef, useState } from 'react';

interface TrendRowProps {
  statistic: number;
  translations: any;
}

interface TrendRowState {}

export const TrendRow = (props: TrendRowProps) => {
  const { statistic, translations } = props;

  let isPositive = Number(statistic) > 0;
  let renderedStatistic;

  if (!isNaN(statistic) && isFinite(statistic)) {
    renderedStatistic = millify(statistic > 0 ? statistic : statistic * -1);
  } else {
    return null;
  }

  return (
    <div className="info-card-subtext">
      <p>
        <span>
          {translations[isPositive ? 'up' : 'down']}{' '}
            {renderedStatistic}{' '}
          {translations['fromLastWeek']}
        </span>
      </p>
    </div>
  );
};
