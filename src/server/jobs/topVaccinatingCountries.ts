import { vaccineProvider } from '../scripts/vaccineProvider';
import { fileProvider } from '../scripts/fileProvider';
import { countryProvider } from '../scripts/countryProvider';
import { COVIDTrend } from './trendingCountries';

export const getTopVaccinatingCountries = async () => {
  // get data for all countries
  const config = fileProvider.readJSON('countries.json');
  const countriesToQuery = config.countries;
  let vaccineResults: Array<COVIDTrend> = [];

  // merge it into one spreadsheet
  for (let i = 0; i < countriesToQuery.length; i++) {
    let current = countriesToQuery[i];
    let data = await vaccineProvider.getVaccinationsByCountry(current);
    let population = await countryProvider.getPopulation(current);
    vaccineResults.push({
      country: current,
      trend: ((data / population) * 100).toFixed(2),
      logo: countryProvider.getLogo(current),
    });
  }

  // order the data and return it
  vaccineResults.sort((x, y) => (Number(x.trend) < Number(y.trend) ? 1 : -1));

  // save the spreadsheet
  fileProvider.writeJSON('vaccines.json', vaccineResults);
};
