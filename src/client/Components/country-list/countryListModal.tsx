import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { COVIDPlaceModel } from '../../../../types';
import { Place } from '../../../server/models/ICOVIDDataProvider';
import { CountryList } from './countryList';

export interface CountryListProps {
  places: COVIDPlaceModel;
  translations: any;
}

export const CountryListModal = function (props: CountryListProps) {
  const { places, translations } = props;
  return (
    <div>
      <h3 className="centered">{translations['selectACountry']}</h3>
      <CountryList places={places}></CountryList>
    </div>
  );
};
