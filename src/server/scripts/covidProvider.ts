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

class COVIDDataProvider implements ICOVIDDataProvider {
  BASE_URL = 'https://api.covid19api.com/';
  CASE_URL = 'total/country/{country}/status/confirmed';
  DEATH_URL = 'total/country/{country}/status/deaths';
  URL_DATE_FORMAT = 'YYYY-MM-DD';

  constructor() {}

  getCOVIDCountries = async () => {
    let request = await fetch(`${this.BASE_URL}countries`);
    let response: Array<any> = await request.json();
    // response.splice(0, response.length - 50);
    return response
      .map((x: any) => ({
        name: x.Country,
        logo: `http://localhost:3001/static/svg/${x.ISO2}.svg`,
      }))
      .sort((x, y) => (x.name > y.name ? 1 : -1));
  };

  getCOVIDDataByDay = async (country: string, days: number) => {
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

    const cases = await fetch(caseUrl);
    const caseResults = await cases.json();

    const deaths = await fetch(deathUrl);
    const deathResults = await deaths.json();

    // merge the data together into a nice array
    if (caseResults.length === deathResults.length) {
      for (let i = 0; i < caseResults.length; i++) {
        let currentDay: COVIDDay = {
          day: moment(caseResults[i].Date),
          cases: i != 0 ? caseResults[i].Cases - caseResults[i - 1].Cases : 0,
          deaths:
            i != 0 ? deathResults[i].Cases - deathResults[i - 1].Cases : 0,
        };
        results.push(currentDay);
      }
    }

    // results.sort((a, b) => (a.day > b.day ? -1 : 1));

    return results;
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
