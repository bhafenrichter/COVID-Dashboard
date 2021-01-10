import React from 'react';
import { Container } from 'react-bootstrap';

interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <div className="navbar">
      <Container>
        <h2 className="navbar-headline">COVID Dashboard</h2>
      </Container>
    </div>
  );
}
