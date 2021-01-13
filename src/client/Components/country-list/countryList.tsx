import * as React from 'react';
import { CountryRow } from './countryRow';

export interface CountryListProps {}

export const CountryList = function (props: CountryListProps) {
  return <CountryRow country="United States" stat="15%"></CountryRow>;
};
