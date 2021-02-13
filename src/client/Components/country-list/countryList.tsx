import * as React from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { Place } from '../../../server/models/ICOVIDDataProvider';
import { CountryRow } from './countryRow';
import { CountryRowMin } from './countryRowMin';
import { CountryRowDivider } from './countryRowDivider';
import { COVIDTrend } from '../../../server/jobs/trendingCountries';
import { COVIDPlaceModel } from '../../../../types';
import { useState } from 'react';

export interface CountryListProps {
  places: COVIDPlaceModel;
  singleCol?: boolean;
}

const NUM_COLUMNS = 3;

export const CountryList = function (props: CountryListProps) {
  const { places, singleCol } = props;
  const [selectedList, setSelectedList] = useState('state');

  let toggleList = (list: string) => {
    setSelectedList(list);
  };

  let renderRows = (countriesToRender: Array<Place>, placeType: string) => {
    let renderedCountries: Array<Array<JSX.Element>> = [[]];
    let renderedColumns: Array<JSX.Element> = [];
    if (!singleCol) {
      // generate the columns
      let itemsPerRow =
        countriesToRender.length >= NUM_COLUMNS
          ? Math.ceil(countriesToRender.length / NUM_COLUMNS)
          : NUM_COLUMNS;

      for (let i = 0; i < NUM_COLUMNS; i++) {
        renderedCountries[i] = [];
        // render vertical row by vertical row
        for (let j = 0; j < itemsPerRow; j++) {
          if (i * itemsPerRow + j < countriesToRender.length) {
            let current = countriesToRender[i * itemsPerRow + j];
            renderedCountries[i].push(
              <CountryRow
                key={current.name}
                country={current}
                placeType={placeType}></CountryRow>
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
      let content = countriesToRender.map((place) => {
        let trend: COVIDTrend = {
          country: place.name,
          trend: Number(place.trend) || 0,
          logo: place.logo,
        };
        <CountryRowMin trend={trend} placeType={placeType}></CountryRowMin>;
      });
      renderedColumns.push(<Col lg={12}>{content}</Col>);
      renderedCountries.push(renderedColumns);
    }

    return renderedColumns;
  };

  if (places && places.countries && places.states) {
    // separate favorite and non-favorite countries
    let favoriteCountries = places.countries.filter(
      (x) => x.isFavorite === true
    );
    let nonFavoriteCountries = places.countries.filter(
      (x) => x.isFavorite !== true
    );
    let favoriteStates = places.states.filter((x) => x.isFavorite === true);
    let nonFavoriteStates = places.states.filter((x) => x.isFavorite !== true);

    let renderedFavoriteCountries = renderRows(
      favoriteCountries.concat(favoriteStates),
      'country'
    );
    let renderedNonFavoriteCountries = renderRows(
      nonFavoriteCountries,
      'country'
    );

    let renderedNonFavoriteStates = renderRows(nonFavoriteStates, 'state');

    return (
      <div className="country-list">
        <CountryRowDivider title="Favorites"></CountryRowDivider>
        {favoriteCountries.length > 0 ? (
          <Row>{renderedFavoriteCountries}</Row>
        ) : (
          <p className="centered">No Favorites Selected</p>
        )}

        <ButtonGroup className="country-list-button-group">
          <Button
            variant="secondary"
            className={selectedList === 'state' ? 'selected' : ''}
            onClick={() => toggleList('state')}>
            US States
          </Button>
          <Button
            variant="secondary"
            className={selectedList === 'country' ? 'selected' : ''}
            onClick={() => toggleList('country')}>
            Countries
          </Button>
        </ButtonGroup>

        {selectedList === 'state' ? (
          <Row>{renderedNonFavoriteStates}</Row>
        ) : (
          <Row>{renderedNonFavoriteCountries}</Row>
        )}
      </div>
    );
  }
  return null;
};
