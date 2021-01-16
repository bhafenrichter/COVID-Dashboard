import { fileProvider } from '../scripts/fileProvider';
import { utils } from '../scripts/utils';
import { covidDataProvider } from './../scripts/covidProvider';

export type COVIDTrend = {
  country: string;
  trend: number;
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
    let result: COVIDTrend = {
      country: country,
      trend: Number(lastDay?.case7DayAvg) / Number(firstDay?.case7DayAvg) - 1,
    };
    results.push(result);
  }

  // add to final results and sort the final data
  results.sort((x, y) => {
    return x.trend > y.trend ? 1 : -1;
  });

  fileProvider.writeJSON('covid.json', results);

  return results;
};
