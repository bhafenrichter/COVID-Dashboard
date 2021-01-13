import React from 'react';
import '../style/app.less';

import { Container, Row } from 'react-bootstrap';
import InfoCard from './info-card/info-card';
import { Navbar } from './navbar/navbar';
import { CountrySelector } from './country-selector/country-selector';
export function App() {
  return (
    <div>
      <Navbar />
      <Container className="app-container">
        <Row>
          <CountrySelector country={'Germany'} />
        </Row>
        <Row>
          <InfoCard
            content={'1'}
            description={'Cases this Week'}
            helpText={'test'}
            wrapperClass="purple-gradient"></InfoCard>
          <InfoCard
            content={'1'}
            description={'Deaths this Week'}
            helpText={'test'}
            wrapperClass="blue-gradient"></InfoCard>
          <InfoCard
            content={'1'}
            description={'Immunity Percent'}
            helpText={'test'}
            wrapperClass="red-gradient"></InfoCard>
          <InfoCard
            content={'1'}
            description={'Death Rate'}
            helpText={'test'}
            wrapperClass="green-gradient"></InfoCard>
        </Row>
      </Container>
    </div>
  );
}
