import * as React from 'react';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { CountryList } from './countryList';

export interface CountryListProps {
  countries: Array<Country>;
  translations: any;
}

export const CountryListModal = function (props: CountryListProps) {
  const { countries, translations } = props;
  return (
    <div>
      <h3 className="centered">{translations['selectACountry']}</h3>
      <CountryList countries={countries}></CountryList>
    </div>
  );
};
