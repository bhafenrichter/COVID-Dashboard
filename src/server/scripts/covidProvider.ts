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
  CASE_URL = 'country/{country}/status/confirmed';
  DEATH_URL = 'country/{country}/status/deaths';

  constructor() {}

  getCOVIDDataByDay = async (country: string, days: number) => {
    const endDate = moment(new Date());
    const startDate = endDate.subtract(days, 'days');
    let results: Array<COVIDDay> = [];
    let caseUrl = `${this.BASE_URL}${
      this.CASE_URL
    }?from=${startDate.toISOString()}&to=${endDate.toISOString()}`;
    caseUrl = caseUrl.replace('{country}', country);

    let deathUrl = `${this.BASE_URL}${
      this.DEATH_URL
    }?from=${startDate.toISOString()}&to=${endDate.toISOString()}`;
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

    return results;
  };
  getCOVIDDataForCountry = async (country: string) => {
    let results: COVIDCountry = {
      cases: 0,
      deaths: 0,
    };
    return results;
  };
}

export const covidData = new COVIDDataProvider();
