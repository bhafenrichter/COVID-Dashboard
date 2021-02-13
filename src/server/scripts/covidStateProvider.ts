import moment from 'moment';
import fetch from 'node-fetch';
import {
  COVIDCountry,
  COVIDDay,
  ICOVIDDataProvider,
} from '../models/ICOVIDDataProvider';
import { calculationsProvider } from './calculationsProvider';

class CovidStateDataProvider implements ICOVIDDataProvider {
  baseUrl = 'https://api.covidtracking.com/v1/states/{state}/daily.json';

  constructor() {}

  getCOVIDDataByDay = async (state: string, days: number) => {
    let caseUrl = this.baseUrl.replace('{state}', state.toLowerCase());
    let request = await fetch(caseUrl);
    let response: Array<any> = await request.json();

    response.reverse();
    let covidDays: Array<COVIDDay> = [];
    for (var i = 1; i < response.length; i++) {
      let date = response[i].date.toString();
      let year = date.substring(0, 4);
      let month = date.substring(5, 6);
      let day = date.substring(7, 8);
      covidDays.push({
        case7DayAvg: '',
        death7DayAvg: '',
        cases: response[i].positive - response[i - 1].positive,
        deaths: response[i].death - response[i - 1].death,
        day: moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('M/D'),
      });
    }

    for (var i = 0; i < covidDays.length; i++) {
      covidDays[i].case7DayAvg = calculationsProvider
        .calculateAverage(i, covidDays, 7)
        .toFixed(0);
    }

    // return only number of days needed
    covidDays = covidDays.splice(covidDays.length - days, days);

    return covidDays;
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

export const covidStateDataProvider = new CovidStateDataProvider();
