/*
    API Calls implemented through https://api.covid19api.com/
*/
import fetch from 'node-fetch';
import moment from 'moment';
import {
  COVIDCountry,
  COVIDDay,
  ICOVIDDataProvider,
} from '../models/ICOVIDDataProvider';
import { fileProvider } from './fileProvider';
import { getAlpha2Code } from 'i18n-iso-countries';

class COVIDDataProvider implements ICOVIDDataProvider {
  BASE_URL = 'https://api.covid19api.com/';
  CASE_URL = 'total/country/{country}/status/confirmed';
  DEATH_URL = 'total/country/{country}/status/deaths';
  URL_DATE_FORMAT = 'YYYY-MM-DD';

  constructor() {}

  getCOVIDCountries = async () => {
    let selectedCountries: Array<string> = fileProvider.readJSON(
      'countries.json'
    ).countries;
    let results = selectedCountries
      .map((x) => {
        return {
          name: x,
          logo: getAlpha2Code(x, 'en'),
        };
      })
      .sort((x, y) => (x.name > y.name ? 1 : -1));
    return results;
  };

  getCOVIDDataByDay = async (country: string, days: number) => {
    // for 7 day averages, we need to get data from previous days too
    days += 7;

    const endDate = moment(new Date());
    const startDate = moment(new Date());
    startDate.subtract(days, 'days');

    let results: Array<COVIDDay> = [];
    let caseUrl = `${this.BASE_URL}${this.CASE_URL}?from=${startDate.format(
      this.URL_DATE_FORMAT
    )}&to=${endDate.format(this.URL_DATE_FORMAT)}`;
    caseUrl = caseUrl.replace('{country}', country);

    let deathUrl = `${this.BASE_URL}${this.DEATH_URL}?from=${startDate.format(
      this.URL_DATE_FORMAT
    )}&to=${endDate.format(this.URL_DATE_FORMAT)}`;
    deathUrl = deathUrl.replace('{country}', country);

    // hackerman
    let cases, caseResults, deaths, deathResults;
    cases = caseResults = deaths = deathResults = [];

    try {
      cases = await fetch(caseUrl);
      caseResults = (await cases.json()) as Array<any>;

      deaths = await fetch(deathUrl);
      deathResults = await deaths.json();
    } catch (e) {
      console.log('API down.  Time to take a break.');
      return [];
    }

    // merge the data together into a nice array
    if (caseResults.length === deathResults.length) {
      for (let i = 1; i < caseResults.length; i++) {
        let currentDay: COVIDDay = {
          day: moment(caseResults[i].Date).format('M/D'),
          // cases returns the total number of cases, not for that specific day
          cases: caseResults[i].Cases - caseResults[i - 1].Cases,
          // will be populated later
          case7DayAvg: '',
          // deaths returns the total number of cases, not for that specific day
          deaths: deathResults[i].Cases - deathResults[i - 1].Cases,
          death7DayAvg: '',
        };
        results.push(currentDay);
      }
    }

    // calculate the averages
    for (let i = 0; i < results.length; i++) {
      results[i].case7DayAvg = this.calculateAverage(i, results, 7).toFixed(0);
    }

    results = results.slice(6, results.length);
    // results.sort((a, b) => (a.day > b.day ? -1 : 1));

    return results;
  };
  calculateAverage = (
    index: number,
    entries: Array<any>,
    daysToAverage: number
  ) => {
    if (index < daysToAverage - 1) {
      return 0;
    }

    let casesToAverage = entries.slice(index - daysToAverage + 1, index + 1);
    let sum: number = casesToAverage.reduce(
      (total: number, current: any, i: number) => {
        return total + current.cases;
      },
      0
    );

    return sum / daysToAverage;
  };
  getCOVIDDataForCountry = async (country: string) => {
    const results = await this.getCOVIDDataByDay(country, 9999);

    let totalCases = 0;
    let totalDeaths = 0;

    results.forEach((entry) => {
      totalCases += entry.cases;
      totalDeaths += entry.deaths;
    });

    let result: COVIDCountry = {
      cases: totalCases,
      deaths: totalDeaths,
    };
    return result;
  };
}

export const covidDataProvider = new COVIDDataProvider();
