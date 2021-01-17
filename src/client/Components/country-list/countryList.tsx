import * as React from 'react';
import { Col } from 'react-bootstrap';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { CountryRow } from './countryRow';
import { CountryRowMin } from './countryRowMin';

export interface CountryListProps {
  countries: Array<Country>;
  singleCol?: boolean;
}

const NUM_COLUMNS = 3;

export const CountryList = function (props: CountryListProps) {
  const { countries, singleCol } = props;

  let renderedCountries: Array<Array<JSX.Element>> = [[]];
  let renderedColumns: Array<JSX.Element> = [];
  if (countries) {
    if (!singleCol) {
      // generate the columns
      let itemsPerRow = Math.floor(countries.length / NUM_COLUMNS);
      for (let i = 0; i < NUM_COLUMNS; i++) {
        renderedCountries[i] = [];
        // render vertical row by vertical row
        for (let j = 0; j < itemsPerRow; j++) {
          if (i * itemsPerRow + j < countries.length) {
            let current = countries[i * itemsPerRow + j];
            renderedCountries[i].push(
              <CountryRow key={current.name} country={current}></CountryRow>
            );
          }
        }
      }

      // render the columns
      for (let i = 0; i < NUM_COLUMNS; i++) {
        renderedColumns.push(
          <Col key={i.toString()} lg={12 / NUM_COLUMNS}>
            {renderedCountries[i]}
          </Col>
        );
      }
    } else {
      let content = countries.map((country) => (
        <CountryRowMin
          key={country.name}
          country={country.name}
          logo={country.logo}
          stat={country.trend}></CountryRowMin>
      ));
      renderedColumns.push(<Col lg={12}>{content}</Col>);
      renderedCountries.push(renderedColumns);
    }
  }
  return <div className="country-list">{renderedColumns}</div>;
};
