import React, { useCallback, useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import { Modal } from './../modal/modal';

interface CountrySelectorProps {
  country: string;
}

export function CountrySelector(props: CountrySelectorProps) {
  const { country } = props;
  const [modalVisible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    console.log('re-render triggered: ' + modalVisible);
  }, [modalVisible]);

  return (
    <div className="country-selector">
      <h3 className="text country-selector-text" onClick={toggleModal}>
        COVID-19 Figures for {modalVisible}
        <span className="country-selector-country">{country}</span>
      </h3>
      <div className="country-flag" onClick={toggleModal}>
        <img src="https://restcountries.eu/data/deu.svg" />
      </div>
      <div className="country-select" onClick={toggleModal}>
        <FaCaretDown />
      </div>
      <Modal
        visible={modalVisible}
        content={<div>test testington</div>}
        onClose={toggleModal}></Modal>
    </div>
  );
}
