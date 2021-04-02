import React, { useContext } from 'react';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { ee, EVTS } from '../../scripts/eventEmitter';
import { TranslationContext } from './../app';

interface LanguageSelectorProps {
  language: string;
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { language } = props;
  const translations = useContext(TranslationContext);
  const switchLanguage = (lang: string) => {
    ee.dispatch(EVTS.CHANGE_LANGUAGE, lang);
  };

  return (
    <DropdownButton
      className={'dropdown-button'}
      // @ts-ignore
      title={translations[language]}>
      <DropdownItem onClick={() => switchLanguage('en')}>
        {translations['en']}
      </DropdownItem>
      <DropdownItem onClick={() => switchLanguage('de')}>
        {translations['de']}
      </DropdownItem>
      <DropdownItem onClick={() => switchLanguage('es')}>
        {translations['es']}
      </DropdownItem>
    </DropdownButton>
  );
};
