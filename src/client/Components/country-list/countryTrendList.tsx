import * as React from 'react';
import { Col } from 'react-bootstrap';
import { COVIDTrend } from '../../../server/jobs/trendingCountries';
import { Place } from '../../../server/models/ICOVIDDataProvider';
import { CountryRowMin } from './countryRowMin';

export interface CountryListProps {
  countries: Array<COVIDTrend>;
  colors: boolean;
  icons: boolean;
}

export const CountryTrendList = function (props: CountryListProps) {
  const { countries, colors, icons } = props;
  let content;

  if (countries) {
    content = countries.map((trend) => {
      return (
        <CountryRowMin
          trend={trend}
          colors={colors}
          icons={icons}></CountryRowMin>
      );
    });
  }

  return (
    <div className="country-list">
      <Col lg="12" className="nopadding">
        {content}
      </Col>
    </div>
  );
};
