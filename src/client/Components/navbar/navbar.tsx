import React from 'react';
import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap';
import { About } from './../about/about';
import { LanguageSelector } from './../language-selector/languageSelector';
import { FaBars } from 'react-icons/fa';
import { tracking } from '../../scripts/ga';

interface NavbarProps {
  translations: any;
  language: string;
}

export function Navbar(props: NavbarProps) {
  const { translations, language } = props;
  return (
    <BSNavbar className="navbar" expand="lg">
      <Container>
        <BSNavbar.Brand href="#">COVID Dashboard</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars className="navbar-mobile-icon"></FaBars>
        </BSNavbar.Toggle>
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link
              href="#about"
              onClick={() => tracking.track('Navbar Clicked', 'About')}>
              <About translations={translations}></About>
            </Nav.Link>
            <Nav.Link href="#about">
              <LanguageSelector
                language={language}
                translations={translations}></LanguageSelector>
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
