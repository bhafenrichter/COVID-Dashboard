import * as React from 'react';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { CountryList } from './countryList';

export interface CountryListProps {
  countries: Array<Country>;
}

export const CountryListModal = function (props: CountryListProps) {
  const { countries } = props;
  return (
    <div>
      <h3 className="centered">Select a Country</h3>
      <CountryList countries={countries}></CountryList>
    </div>
  );
};
