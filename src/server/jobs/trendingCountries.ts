import { fileProvider } from '../scripts/fileProvider';
import { utils } from '../scripts/utils';
import { covidDataProvider } from './../scripts/covidProvider';
import { countryProvider } from './../scripts/countryProvider';

export type COVIDTrend = {
  country: string;
  trend: number | string;
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
    await utils.timeout(3000);
    let country = countriesToCheck[i];
    let covidData = await covidDataProvider.getCOVIDDataByDay(country, 7);
    let firstDay = covidData[0];
    let lastDay = covidData[covidData.length - 1];
    let trend = Number(lastDay?.case7DayAvg) / Number(firstDay?.case7DayAvg) - 1;
    let result: COVIDTrend = {
      country: country,
      trend: (trend * 100).toFixed(2),
      logo: countryProvider.getLogo(country),
    };
    results.push(result);
  }

  // add to final results and sort the final data
  results = results.sort((x, y) => {
    return Number(x.trend) < Number(y.trend) ? 1 : -1;
  });

  fileProvider.writeJSON('covid.json', results);

  return results;
};
