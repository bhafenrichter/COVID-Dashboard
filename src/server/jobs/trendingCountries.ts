import { fileProvider } from '../scripts/fileProvider';
import { utils } from '../scripts/utils';
import { covidDataProvider } from './../scripts/covidProvider';
import { countryProvider } from './../scripts/countryProvider';
import { COVIDDay } from '../models/ICOVIDDataProvider';

// need to be averaging at least this many cases to be considered
// for leaderboard
const AVERAGE_CUTOFF = 1000;
const DAYS_OF_ZERO_CASES_ALLOWED = 2;

export type COVIDTrend = {
  country: string;
  trend: number | string;
  normalizedTrend?: number | string;
  logo: string;
};

export const trendingCountries = async (allCountries: boolean) => {
  // get countries from .json file
  let config;
  let countriesToCheck;
  if (allCountries) {
    config = await covidDataProvider.getCOVIDCountries();
    countriesToCheck = config.map((x) => x.name);
  } else {
    const config = fileProvider.readJSON('countries.json');
    countriesToCheck = config.countries;
  }

  let results: Array<COVIDTrend> = [];

  // iterate through countries, get data from api
  // retrieve the important data

  for (let i = 0; i < countriesToCheck.length; i++) {
    await utils.timeout(5000);
    let country = countriesToCheck[i];
    let covidData = await covidDataProvider.getCOVIDDataByDay(country, 8);
    let firstDay = covidData[0];
    let lastDay = covidData[covidData.length - 1];
    let trend =
      Number(lastDay?.case7DayAvg) / Number(firstDay?.case7DayAvg) - 1;
    let result: COVIDTrend = {
      country: country,
      trend: (trend * 100).toFixed(2),
      logo: countryProvider.getLogo(country),
    };

    if (isValidDataset(covidData)) {
      results.push(result);
    }
  }

  // add to final results and sort the final data
  results = results.sort((x, y) => {
    return Number(x.trend) < Number(y.trend) ? 1 : -1;
  });

  fileProvider.writeJSON('covid.json', results);

  return results;
};

const isValidDataset = (covidData: Array<COVIDDay>) => {
  if (covidData.length === 0) {
    return false;
  }
  // doesn't contain any negative data
  if (covidData.filter((x) => x.cases < 0).length > 0) {
    return false;
  }

  // don't allow a ton of zeroed days
  if (
    covidData.filter((x) => x.cases === 0).length > DAYS_OF_ZERO_CASES_ALLOWED
  ) {
    return false;
  }

  if (Number(covidData[0].case7DayAvg) < AVERAGE_CUTOFF) {
    return false;
  }

  return true;
};
