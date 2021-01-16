import { vaccineProvider } from "../scripts/vaccineProvider"
import { fileProvider } from "../scripts/fileProvider";
import { countryProvider } from "../scripts/countryProvider";

export const getTopVaccinatingCountries = async () => {
  // get data for all countries
  const config = fileProvider.readJSON('countries.json');
  const countriesToQuery = config.countries;
  let vaccineResults = [];

  // merge it into one spreadsheet
  for (let i = 0; i < countriesToQuery.length; i++) {
    let current = countriesToQuery[i];
    let data = await vaccineProvider.getVaccinationsByCountry(current);
    let population = await countryProvider.getPopulation(current);
    vaccineResults.push({
      country: current,
      immunity: ((data / population) * 100).toFixed(2),
    });
  }

  // order the data and return it
  vaccineResults.sort((x,y) => Number(x.immunity) > Number(y.immunity) ? 1 : -1);

  // save the spreadsheet
  fileProvider.writeJSON('vaccines.json', vaccineResults);
}