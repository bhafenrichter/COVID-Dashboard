import React, { useContext } from 'react';
import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap';
import { LanguageSelector } from './../language-selector/languageSelector';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TranslationContext } from '../app';

interface NavbarProps {
  language: string;
}

export function Navbar(props: NavbarProps) {
  const { language } = props;
  const translations = useContext(TranslationContext);

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
            <Nav.Link></Nav.Link>
            <Link to="/" className="text">
              {translations['home']}
            </Link>
            <Nav.Link>
              <Link to="/about" className="text">
                {translations['about']}
              </Link>
            </Nav.Link>

            <Nav.Link>
              <LanguageSelector language={language}></LanguageSelector>
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
