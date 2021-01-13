import React, { useEffect, useState } from 'react';
import '../style/app.less';

import { Col, Container, Row } from 'react-bootstrap';
import InfoCard from './info-card/info-card';
import { Navbar } from './navbar/navbar';
import { CountrySelector } from './country-selector/country-selector';
import { DataCard } from './data-card/dataCard';
import { LineChart } from './line-chart/lineChart';
import { CountryList } from './country-list/countryList';

import { api } from './../scripts/api';
import { COVIDDataModel } from '../../../types';
export function App() {
  const [country, setCountry] = useState('Germany');
  let [data, setCOVIDData] = useState({ calculations: {} } as COVIDDataModel);
  let { calculations } = data;
  // @ts-ignore
  useEffect(async () => {
    let results: COVIDDataModel = await api.getCOVIDDate(country);
    setCOVIDData(results);
  }, []);

  return (
    <div>
      <Navbar />
      <Container className="app-container">
        <Row className="covid-row">
          <CountrySelector country={'Germany'} />
        </Row>
        <Row className="covid-row">
          <InfoCard
            content={calculations.casesThisWeek || ''}
            description={'Cases this Week'}
            helpText={'test'}
            wrapperClass="purple-gradient"></InfoCard>
          <InfoCard
            content={calculations.deathsThisWeek || ''}
            description={'Deaths this Week'}
            helpText={'test'}
            wrapperClass="blue-gradient"></InfoCard>
          <InfoCard
            content={calculations.populationImmunity || ''}
            description={'Immunity Percent'}
            helpText={'test'}
            wrapperClass="red-gradient"></InfoCard>
          <InfoCard
            content={calculations.deathRate || ''}
            description={'Death Rate'}
            helpText={'test'}
            wrapperClass="green-gradient"></InfoCard>
        </Row>

        <Row className="covid-row">
          <Col lg="9">
            <DataCard
              title="Cases by Day"
              description="as of Jan. 3rd 2021 at 10:25pm">
              <LineChart
                keys={['cases', 'deaths']}
                data={data.covidData}></LineChart>
            </DataCard>
          </Col>
          <Col lg="3">
            <DataCard title="Top Hotspot Countries"></DataCard>
          </Col>
        </Row>
        <Row className="covid-row">
          <Col lg="9">
            <DataCard
              title="Vaccinations by Day"
              description="as of Jan. 3rd 2021 at 10:25pm">
              <LineChart
                keys={['vaccines', '']}
                data={data.vaccines}></LineChart>
            </DataCard>
          </Col>
          <Col lg="3">
            <DataCard title="Top Vaccinating Countries">
              <CountryList></CountryList>
            </DataCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
