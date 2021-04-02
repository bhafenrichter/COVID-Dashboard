import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { COVIDPlaceModel } from '../../../../types';
import { Place } from '../../../server/models/ICOVIDDataProvider';
import { CountryList } from './countryList';
import { TranslationContext } from './../app';

export interface CountryListProps {
  places: COVIDPlaceModel;
}

export const CountryListModal = function (props: CountryListProps) {
  const { places } = props;
  const translations = useContext(TranslationContext);
  return (
    <div>
      <h3 className="centered">{translations['selectACountry']}</h3>
      <CountryList places={places}></CountryList>
    </div>
  );
};
