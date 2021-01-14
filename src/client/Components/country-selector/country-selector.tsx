import React, { useCallback, useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { Modal } from './../modal/modal';
import { CountryListModal } from './../country-list/countryListModal';
import { Country } from '../../../server/models/ICOVIDDataProvider';
interface CountrySelectorProps {
  country: Country;
  countries: Array<Country>;
}

export function CountrySelector(props: CountrySelectorProps) {
  const { country, countries } = props;
  const [modalVisible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible((prevVisible) => !prevVisible);
  };

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
        content={<CountryListModal countries={countries} />}
        onClose={toggleModal}></Modal>
    </div>
  );
}
