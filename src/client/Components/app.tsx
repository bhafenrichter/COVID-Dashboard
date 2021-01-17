import React, { useEffect, useState } from 'react';
import { ee, EVTS } from './../scripts/eventEmitter';
import '../style/app.less';

import { Col, Container, Row } from 'react-bootstrap';
import InfoCard from './info-card/info-card';
import { Navbar } from './navbar/navbar';
import { CountrySelector } from './country-selector/country-selector';
import { DataCard } from './data-card/dataCard';
import { LineChart } from './line-chart/lineChart';
import { CountryTrendList } from './country-list/countryTrendList';
import { LoadingIndicator } from './loading-indicator/loadingIndicator';

import { api } from './../scripts/api';
import { COVIDDataModel } from '../../../types';
import { Country } from '../../server/models/ICOVIDDataProvider';

export function App() {
  const [country, setCountry] = useState({
    name: 'Germany',
    logo: 'http://localhost:3001/static/svg/DE.svg',
  });
  let [data, setCOVIDData] = useState({ calculations: {} } as COVIDDataModel);
  let [countries, setCountries] = useState([] as Array<Country>);

  let { calculations } = data;
  // @ts-ignore
  useEffect(() => {
    const fetchCountryData = async (newCountry: Country) => {
      ee.dispatch(EVTS.SHOW_LOADING);
      let results: COVIDDataModel = await api.getCOVIDDate(country.name);
      let fetchedCountries: Array<Country> = await api.getCountries();
      setCOVIDData(results);
      setCountries(fetchedCountries);
      ee.dispatch(EVTS.HIDE_LOADING);
    };
    fetchCountryData(country);
  }, [country]);

  // initialize events
  useEffect(() => {
    ee.subscribe(EVTS.CHANGE_COUNTRY, (args) => {
      setCountry(args);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Container className="app-container">
        <Row className="covid-row">
          <CountrySelector country={country} countries={countries} />
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
                keys={[
                  {
                    key: 'cases',
                    displayName: 'Cases',
                  },
                  {
                    key: 'deaths',
                    displayName: 'Deaths',
                  },
                  {
                    key: 'case7DayAvg',
                    displayName: '7 Day Average',
                  },
                ]}
                data={data.covidData}></LineChart>
            </DataCard>
          </Col>
          <Col lg="3">
            <DataCard min={true} title="Recovering">
              <CountryTrendList
                colors={true}
                icons={true}
                countries={data.trendingCountries
                  ?.slice(
                    data.trendingCountries.length - 5,
                    data.trendingCountries.length
                  )
                  .reverse()}></CountryTrendList>
            </DataCard>
            <DataCard min={true} title="Hotspots">
              <CountryTrendList
                colors={true}
                icons={true}
                countries={data.trendingCountries?.slice(
                  0,
                  5
                )}></CountryTrendList>
            </DataCard>
          </Col>
        </Row>
        <Row className="covid-row">
          <Col lg="9">
            <DataCard
              title="Vaccinations by Day"
              description="as of Jan. 3rd 2021 at 10:25pm">
              <LineChart
                keys={[
                  {
                    displayName: 'Vaccines Administered',
                    key: 'vaccines',
                  },
                ]}
                data={data.vaccines}></LineChart>
            </DataCard>
          </Col>
          <Col lg="3">
            <DataCard min={true} title="Top Vaccinating Countries">
              <CountryTrendList
                colors={false}
                icons={false}
                countries={data.trendingVaccinationCountries?.slice(
                  0,
                  10
                )}></CountryTrendList>
            </DataCard>
          </Col>
        </Row>
      </Container>
      <LoadingIndicator></LoadingIndicator>
    </div>
  );
}
