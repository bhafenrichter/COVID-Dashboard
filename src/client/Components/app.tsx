import React, { useEffect, useState } from 'react';
import { ee, EVTS } from './../scripts/eventEmitter';
import '../style/app.less';
import { tracking } from './../scripts/ga';
import { useCookies } from 'react-cookie';

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
import { utils } from '../scripts/utils';
import { COOKIES } from './../scripts/cookie';

export function App() {
  let [data, setCOVIDData] = useState({ calculations: {} } as COVIDDataModel);
  let [countries, setCountries] = useState([] as Array<Country>);
  let [lang, setLang] = useState('en');
  let [trans, setTranslations]: any = useState({});
  let [favorites, setFavorites] = useState([] as Array<Country>);
  let [cookies, setCookie, removeCookie] = useCookies();

  let initialCountry = {
    name: 'United States of America',
    logo: 'US',
  };
  if (cookies[COOKIES.FAVORITE_COUNTRIES]) {
    // cleanup from older iteration
    if (typeof cookies[COOKIES.FAVORITE_COUNTRIES][0] == 'string') {
      removeCookie(COOKIES.FAVORITE_COUNTRIES);
      location.reload();
    } else if (cookies[COOKIES.FAVORITE_COUNTRIES].length > 0) {
      initialCountry = cookies[COOKIES.FAVORITE_COUNTRIES][0];
    }
  }

  const [country, setCountry] = useState(initialCountry);
  let { calculations } = data;

  // fetch covid and vaccine data
  useEffect(() => {
    const fetchCountryData = async (newCountry: Country) => {
      ee.dispatch(EVTS.SHOW_LOADING);
      let results: COVIDDataModel = await api.getCOVIDDate(country.name);
      let fetchedCountries: Array<Country> = await api.getCountries();
      setCOVIDData(results);
      setCountries(fetchedCountries);

      // read cookies to get favorite countries
      if (!cookies[COOKIES.FAVORITE_COUNTRIES]) {
        setFavorites([]);
      } else {
        setFavorites([...cookies[COOKIES.FAVORITE_COUNTRIES]]);
      }
      ee.dispatch(EVTS.HIDE_LOADING);
    };
    fetchCountryData(country);
  }, [country]);

  // fetch translation data
  useEffect(() => {
    const fetchTranslations = async () => {
      ee.dispatch(EVTS.SHOW_LOADING);
      let translations = await api.getLanguage(lang);
      setTranslations(translations);
      ee.dispatch(EVTS.HIDE_LOADING);
    };
    fetchTranslations();
  }, [lang]);

  // update countries with favorites
  useEffect(() => {
    let updated = countries;
    if (countries.length === 0) {
      return;
    }

    for (let i = 0; i < updated.length; i++) {
      updated[i].isFavorite = false;
    }

    for (let i = 0; i < favorites.length; i++) {
      updated.filter((x) => x.name === favorites[i].name)[0].isFavorite = true;
    }
    setCountries([...updated]);
  }, [favorites]);

  // initialize events
  useEffect(() => {
    ee.subscribe(EVTS.CHANGE_COUNTRY, (args) => {
      setCountry(args);
      tracking.track('Selected Country', args);
    });

    // Change language
    ee.subscribe(EVTS.CHANGE_LANGUAGE, (args) => {
      setLang(args);
    });

    // Add a favorite country
    ee.subscribe(EVTS.ADD_FAVORITE, (args) => {
      setFavorites((old) => {
        setCookie(COOKIES.FAVORITE_COUNTRIES, [...old, args]);
        return [...old, args];
      });
    });

    // Remove a favorite country
    ee.subscribe(EVTS.REMOVE_FAVORITE, (args) => {
      setFavorites((old: Array<any>) => {
        let filtered = old.filter((x) => x.name != args.name);
        setCookie(COOKIES.FAVORITE_COUNTRIES, filtered);
        return filtered;
      });
    });

    // initialize google analytics
    tracking.init();
    tracking.page(window.location.pathname);
  }, []);

  return (
    <div>
      <Navbar translations={trans} language={lang} />
      <Container className="app-container">
        <Row className="covid-row">
          <CountrySelector
            translations={trans}
            country={country}
            countries={countries}
          />
        </Row>
        <Row className="covid-row">
          <InfoCard
            content={calculations.casesThisWeek || ''}
            description={trans['casesThisWeek']}
            wrapperClass="purple-gradient"></InfoCard>
          <InfoCard
            content={calculations.deathsThisWeek || ''}
            description={trans['deathsThisWeek']}
            wrapperClass="blue-gradient"></InfoCard>
          <InfoCard
            content={calculations.populationImmunity || ''}
            description={trans['immunityPercent']}
            helpText={trans['immunityPercentHelp']}
            wrapperClass="red-gradient"></InfoCard>
          <InfoCard
            content={calculations.deathRate || ''}
            description={trans['deathRate']}
            helpText={trans['deathRateHelp']}
            wrapperClass="green-gradient"></InfoCard>
        </Row>

        <Row className="covid-row">
          <Col lg="9">
            <DataCard
              title={trans['casesByDay'] + country.name}
              description={utils.getTimeDescription(
                data.createdOn,
                trans['asOf']
              )}>
              <LineChart
                keys={[
                  {
                    key: 'cases',
                    displayName: trans['cases'],
                  },
                  {
                    key: 'deaths',
                    displayName: trans['deaths'],
                  },
                  {
                    key: 'case7DayAvg',
                    displayName: trans['7DayAverage'],
                  },
                ]}
                data={data.covidData}></LineChart>
              {/* Legend */}
              <div className="legend-wrapper">
                <p className="blue">{trans['cases']}</p>
                <p className="white">{trans['deaths']}</p>
                <p className="green">{trans['7DayAverage']}</p>
              </div>
            </DataCard>
            <DataCard
              title={trans['vaccinationsByDay'] + country.name}
              description={utils.getTimeDescription(
                data.createdOn,
                trans['asOf']
              )}>
              <LineChart
                keys={[
                  {
                    displayName: trans['vaccinesAdministered'],
                    key: 'vaccines',
                  },
                ]}
                data={data.vaccines}></LineChart>
              <div className="legend-wrapper">
                <p className="blue">{trans['vaccinesAdministered']}</p>
              </div>
            </DataCard>
          </Col>
          <Col lg="3">
            <DataCard
              title="World Figures"
              helpText={trans['recoveringHelp'] + ' ' + trans['hotspotHelp']}>
              <h5 className="text centered trending-headline">
                {trans['hotspots']}
              </h5>
              <CountryTrendList
                colors={true}
                icons={true}
                countries={data.trendingCountries
                  ?.slice(
                    data.trendingCountries.length - 5,
                    data.trendingCountries.length
                  )
                  .reverse()}></CountryTrendList>
              <h5 className="text centered trending-headline">
                {trans['recovering']}
              </h5>
              <CountryTrendList
                colors={true}
                icons={true}
                countries={data.trendingCountries?.slice(
                  0,
                  5
                )}></CountryTrendList>
            </DataCard>
            <DataCard
              min={true}
              title={trans['topVaccinatingCountries']}
              helpText={trans['vaccinationHelp']}>
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
