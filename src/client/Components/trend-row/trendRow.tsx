import millify from 'millify';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { TranslationContext } from '../app';

interface TrendRowProps {
  statistic: number;
}

interface TrendRowState {}

export const TrendRow = (props: TrendRowProps) => {
  const { statistic } = props;
  const translations = useContext(TranslationContext);

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
          {translations[isPositive ? 'up' : 'down']} {renderedStatistic}{' '}
          {translations['fromLastWeek']}
        </span>
      </p>
    </div>
  );
};
