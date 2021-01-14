import React from 'react';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { ee, EVTS } from './../../scripts/eventEmitter';
export interface CountryRowProps {
  country: Country;
  stat?: string;
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
        <img src={country.logo} />
      </div>
      <p className="text">{country.name}</p>
      <p className="text">{stat}</p>
    </div>
  );
};
