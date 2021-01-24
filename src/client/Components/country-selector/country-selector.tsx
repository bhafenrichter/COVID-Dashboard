import React, { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { Modal } from './../modal/modal';
import { CountryListModal } from './../country-list/countryListModal';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { ee, EVTS } from '../../scripts/eventEmitter';
import { utils } from '../../scripts/utils';
import { FlagIcon } from '../country-list/flagIcon';
interface CountrySelectorProps {
  country: Country;
  countries: Array<Country>;
  translations: any;
}

export function CountrySelector(props: CountrySelectorProps) {
  const { country, countries, translations } = props;
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
        <FlagIcon name={country.logo} />
      </div>
      <div className="country-select" onClick={toggleModal}>
        <FaCaretDown />
      </div>
      <Modal
        visible={modalVisible}
        onClose={toggleModal}
        width={width}
        height={height}>
        <CountryListModal translations={translations} countries={countries} />
      </Modal>
    </div>
  );
}
