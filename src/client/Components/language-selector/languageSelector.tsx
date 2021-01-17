import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ee, EVTS } from '../../scripts/eventEmitter';

interface LanguageSelectorProps {
  translations: any;
  language: string;
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { translations, language } = props;
  const switchLanguage = (lang: string) => {
    ee.dispatch(EVTS.CHANGE_LANGUAGE, lang);
  };

  return (
    <DropdownButton
      className={'dropdown-button'}
      title={translations[language]}>
      <DropdownItem onClick={() => switchLanguage('en')}>
        {translations['en']}
      </DropdownItem>
      <DropdownItem onClick={() => switchLanguage('de')}>
        {translations['de']}
      </DropdownItem>
    </DropdownButton>
  );
};
