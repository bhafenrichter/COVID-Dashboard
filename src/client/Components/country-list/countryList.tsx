import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { CountryRow } from './countryRow';
import { CountryRowMin } from './countryRowMin';
import { CountryRowDivider } from './countryRowDivider';

export interface CountryListProps {
  countries: Array<Country>;
  singleCol?: boolean;
}

const NUM_COLUMNS = 3;

export const CountryList = function (props: CountryListProps) {
  const { countries, singleCol } = props;

  let renderRows = (countriesToRender: Array<Country>) => {
    let renderedCountries: Array<Array<JSX.Element>> = [[]];
    let renderedColumns: Array<JSX.Element> = [];
    if (!singleCol) {
      // generate the columns
      let itemsPerRow =
        countriesToRender.length > NUM_COLUMNS
          ? Math.ceil(countriesToRender.length / NUM_COLUMNS)
          : NUM_COLUMNS;
      for (let i = 0; i < NUM_COLUMNS; i++) {
        renderedCountries[i] = [];
        // render vertical row by vertical row
        for (let j = 0; j < itemsPerRow; j++) {
          if (i * itemsPerRow + j < countriesToRender.length) {
            let current = countriesToRender[i * itemsPerRow + j];
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

    return renderedColumns;
  };

  if (countries) {
    // separate favorite and non-favorite countries
    let favoriteCountries = countries.filter((x) => x.isFavorite === true);
    let nonFavoriteCountries = countries.filter((x) => x.isFavorite !== true);

    let renderedFavorites = renderRows(favoriteCountries);
    let renderedNonFavorites = renderRows(nonFavoriteCountries);

    return (
      <div>
        <CountryRowDivider title="Favorites"></CountryRowDivider>
        {favoriteCountries.length > 0 ? (
          <Row>{renderedFavorites}</Row>
        ) : (
          <p className="centered">No Favorites Selected</p>
        )}
        <CountryRowDivider title="All Countries"></CountryRowDivider>
        <Row>{renderedNonFavorites}</Row>
      </div>
    );
  }
  return null;
};
