import React from 'react';
import { ee, EVTS } from './../../scripts/eventEmitter';
export interface CountryRowProps {
  country: string;
  stat?: string;
}

export const CountryRow = function (props: CountryRowProps) {
  const { country, stat } = props;
  return (
    <div
      className="country-row"
      onClick={() => {
        ee.dispatch(EVTS.CHANGE_COUNTRY, country);
        ee.dispatch(EVTS.CLOSE_MODAL, null);
      }}>
      <div className="country-flag">
        <img src="https://restcountries.eu/data/usa.svg" />
      </div>
      <p className="text">{country}</p>
      <p className="text">{stat}</p>
    </div>
  );
};
