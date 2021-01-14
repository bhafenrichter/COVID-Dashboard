import * as React from 'react';
import { Col } from 'react-bootstrap';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { CountryRow } from './countryRow';

export interface CountryListProps {
  countries: Array<Country>;
}

const NUM_COLUMNS = 3;

export const CountryList = function (props: CountryListProps) {
  const { countries } = props;

  let renderedCountries: Array<Array<JSX.Element>> = [[]];
  let renderedColumns: Array<JSX.Element> = [];
  if (countries) {
    // generate the columns
    let arrayIndex = 0;
    let itemsPerRow = Math.floor(countries.length / NUM_COLUMNS);
    for (let i = 0; i < NUM_COLUMNS; i++) {
      renderedCountries[i] = [];
      // render vertical row by vertical row
      for (let j = 0; j < itemsPerRow; j++) {
        if (i * itemsPerRow + j < countries.length) {
          renderedCountries[i].push(
            <CountryRow
              country={countries[i * itemsPerRow + j]?.name}></CountryRow>
          );
        }
      }
    }

    // render the columns
    for (let i = 0; i < NUM_COLUMNS; i++) {
      renderedColumns.push(
        <Col lg={12 / NUM_COLUMNS}>{renderedCountries[i]}</Col>
      );
    }
  }
  return <div className="country-list">{renderedColumns}</div>;
};
