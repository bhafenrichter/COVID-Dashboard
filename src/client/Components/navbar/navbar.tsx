import React from 'react';
import { Container } from 'react-bootstrap';
import { LanguageSelector } from './../language-selector/languageSelector';

interface NavbarProps {
  translations: any;
  language: string;
}

export function Navbar(props: NavbarProps) {
  const { translations, language } = props;
  return (
    <div className="navbar">
      <Container>
        <h2 className="navbar-headline">COVID Dashboard</h2>
        <LanguageSelector
          language={language}
          translations={translations}></LanguageSelector>
      </Container>
    </div>
  );
}
