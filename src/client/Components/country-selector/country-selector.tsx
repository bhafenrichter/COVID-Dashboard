import React, { useCallback, useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { Modal } from './../modal/modal';
import { CountryListModal } from './../country-list/countryListModal';
import { Country } from '../../../server/models/ICOVIDDataProvider';
import { ee, EVTS } from '../../scripts/eventEmitter';
import { utils } from '../../scripts/utils';
interface CountrySelectorProps {
  country: Country;
  countries: Array<Country>;
}

export function CountrySelector(props: CountrySelectorProps) {
  const { country, countries } = props;
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
  const width = utils.getPixelWidthByPercent(0.75);
  const height = utils.getPixelHeightByPercent(0.75);

  return (
    <div className="country-selector">
      <h3 className="text country-selector-text" onClick={toggleModal}>
        COVID-19 Figures for {modalVisible}
        <span className="country-selector-country">{country.name}</span>
      </h3>
      <div className="country-flag" onClick={toggleModal}>
        <img src={country.logo} />
      </div>
      <div className="country-select" onClick={toggleModal}>
        <FaCaretDown />
      </div>
      <Modal
        visible={modalVisible}
        onClose={toggleModal}
        width={width}
        height={height}>
        <CountryListModal countries={countries} />
      </Modal>
    </div>
  );
}
