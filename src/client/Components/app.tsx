import React, { useEffect, useState, useContext, createContext } from 'react';
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
import { TrendRow } from './trend-row/trendRow';
import { api } from './../scripts/api';
import { COVIDDataModel, COVIDPlaceModel } from '../../../types';
import { Place } from '../../server/models/ICOVIDDataProvider';
import { utils } from '../scripts/utils';
import { COOKIES } from './../scripts/cookie';

export const TranslationContext = createContext<Translations>({
  home: 'Home',
  casesThisWeek: 'Cases this Week',
  deathsThisWeek: 'Deaths this Week',
  immunityPercent: 'Percent Vaccinated',
  deathRate: 'Death Rate',
  casesByDay: 'Cases by Day for ',
  recovering: 'Recovering',
  hotspots: 'Hotspots',
  vaccinationsByDay: 'Vaccinations by Day for ',
  topVaccinatingCountries: 'Top Vaccinating Countries',
  noDataReported: 'No Data Reported',
  covidFiguresFor: 'COVID Figures for ',
  selectACountry: 'Select a Country',
  cases: 'Cases',
  deaths: 'Deaths',
  language: 'Language',
  en: 'English',
  de: 'German',
  es: 'Spanish',
  vaccinesAdministered: 'Vaccines Administered',
  '7DayAverage': '7 Day Average',
  immunityPercentHelp:
    'Vaccination Percentage is calculated by taking the total number of vaccinations and dividing it by the total population.',
  deathRateHelp:
    'The Death Rate is calculated by taking the total number of cases and dividing it by the total number of COVID-related deaths.',
  recoveringHelp:
    'Recovering countries have a significantly lower 7 day average than they did a week ago.',
  hotspotHelp:
    "Hotspots are countries who's 7 day average today is significantly greater than their 7 day average a week ago.",
  vaccinationHelp:
    'This percentage is calculated based on the number of Vaccines administered and dividing by the countries total population.',
  about: 'About',
  asOf: 'as of ',
  up: 'Up',
  down: 'Down',
  fromLastWeek: 'from last week',
});

export function App() {
  let [data, setCOVIDData] = useState({ calculations: {} } as COVIDDataModel);
  let [places, setPlaces] = useState({} as COVIDPlaceModel);
  let [lang, setLang] = useState('en');
  let [trans, setTranslations]: any = useState({});
  let [favorites, setFavorites] = useState([] as Array<Place>);
  let [cookies, setCookie, removeCookie] = useCookies();

  let initialCountry: Place = {
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
    const fetchCountryData = async (x: Place) => {
      ee.dispatch(EVTS.SHOW_LOADING);
      let placeType: string = utils.getPlaceType(places, country.name);
      let results: COVIDDataModel = await api.getCOVIDDate(
        country.id || country.name,
        placeType
      );
      let fetchedPlaces: COVIDPlaceModel = await api.getPlaces();
      setCOVIDData(results);
      setPlaces(fetchedPlaces);

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
    if (!places || !places.countries || !places.states) {
      return;
    }
    setPlaces(utils.appendFavorites(places, favorites));
  }, [favorites]);

  // initialize events
  useEffect(() => {
    ee.subscribe(EVTS.CHANGE_PLACE, (args) => {
      setCountry(args);
      tracking.track('selected_country', args.name);
    });

    // Change language
    ee.subscribe(EVTS.CHANGE_LANGUAGE, (args) => {
      tracking.track('changed_language', args);
      setLang(args);
    });

    // Add a favorite country
    ee.subscribe(EVTS.ADD_FAVORITE, (args) => {
      tracking.track('set_favorite', args.name);
      setFavorites((old) => {
        setCookie(COOKIES.FAVORITE_COUNTRIES, [...old, args]);
        return [...old, args];
      });
    });

    // Remove a favorite country
    ee.subscribe(EVTS.REMOVE_FAVORITE, (args) => {
      tracking.track('removed_favorite', args.name);
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
    <TranslationContext.Provider value={trans}>
      <div>
        <Navbar language={lang} />
        <Container className="app-container">
          <Row className="covid-row">
            <CountrySelector country={country} places={places} />
          </Row>
          <Row className="covid-row">
            <InfoCard
              content={calculations.casesThisWeek || ''}
              subContent={
                <TrendRow
                  statistic={data.calculations.casesTrending}></TrendRow>
              }
              description={trans['casesThisWeek']}
              wrapperClass="purple-gradient"></InfoCard>
            <InfoCard
              content={calculations.deathsThisWeek || ''}
              subContent={
                <TrendRow
                  statistic={data.calculations.deathsTrending}></TrendRow>
              }
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
                  {trans['recovering']}
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
                  {trans['hotspots']}
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
    </TranslationContext.Provider>
  );
}
