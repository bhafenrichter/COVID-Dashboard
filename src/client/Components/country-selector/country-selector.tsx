import React, { useContext, useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { Modal } from './../modal/modal';
import { CountryListModal } from './../country-list/countryListModal';
import { Place } from '../../../server/models/ICOVIDDataProvider';
import { ee, EVTS } from '../../scripts/eventEmitter';
import { utils } from '../../scripts/utils';
import { FlagIcon } from '../country-list/flagIcon';
import { COVIDPlaceModel } from '../../../../types';
import { TranslationContext } from './../app';
interface CountrySelectorProps {
  country: Place;
  places: COVIDPlaceModel;
}

export function CountrySelector(props: CountrySelectorProps) {
  const { country, places } = props;
  const translations = useContext(TranslationContext);
  const [modalVisible, setVisible] = useState(false);

  useEffect(() => {
    ee.subscribe(EVTS.CLOSE_MODAL, (args) => {
      setVisible(false);
    });
  }, []);

  const toggleModal = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  // calculate the width and height of the modal
  const width = utils.getPixelWidthByPercent(0.9);
  const height = utils.getPixelHeightByPercent(0.9);

  return (
    <div className="country-selector">
      <h3 className="text country-selector-text" onClick={toggleModal}>
        {translations['covidFiguresFor']} {modalVisible}
        <span className="country-selector-country">{country.name}</span>
      </h3>
      <div className="country-flag" onClick={toggleModal}>
        <FlagIcon
          name={country.logo}
          placeType={utils.getPlaceType(places, country.name)}
        />
      </div>
      <div className="country-select" onClick={toggleModal}>
        <FaCaretDown />
      </div>
      <Modal
        visible={modalVisible}
        onClose={toggleModal}
        width={width}
        height={height}>
        <CountryListModal places={places} />
      </Modal>
    </div>
  );
}
