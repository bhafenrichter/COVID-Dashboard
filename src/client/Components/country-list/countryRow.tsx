import React from 'react';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { ee, EVTS } from './../../scripts/eventEmitter';
import LazyLoad from 'react-lazyload';

export interface CountryRowProps {
  country: Country;
  stat?: string | number;
  logo?: string;
}

export const CountryRow = function (props: CountryRowProps) {
  const { country, stat, logo } = props;
  return (
    <div
      className="country-row"
      onClick={() => {
        ee.dispatch(EVTS.CHANGE_COUNTRY, country);
        ee.dispatch(EVTS.CLOSE_MODAL, null);
      }}>
      <div className="country-flag">
        <LazyLoad>
          <img src={country.logo} />
        </LazyLoad>
      </div>
      <p className="text">{country.name}</p>
      <p className="text">{stat}</p>
    </div>
  );
};
