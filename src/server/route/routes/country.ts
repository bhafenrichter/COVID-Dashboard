import express from 'express';
export const router = express.Router();

import {
  covidDataProvider,
  vaccineProvider,
  countryProvider,
  calculationsProvider,
} from './../../scripts/index';

router.post('/country', async (req, res) => {
  const { country, days } = req.body;

  const vaccines = await vaccineProvider.getVaccinationByDay(country, days);
  const covidData = await covidDataProvider.getCOVIDDataByDay(country, days);
  const population = await countryProvider.getPopulation(country);

  const countryCOVIDTotals = await covidDataProvider.getCOVIDDataForCountry(
    country
  );
  const countryVaccinationTotal = await vaccineProvider.getVaccinationsByCountry(
    country
  );

  let totalCases = countryCOVIDTotals.cases;
  let totalDeaths = countryCOVIDTotals.deaths;
  let totalVaccines = countryVaccinationTotal;

  const calculations = await calculationsProvider.getCalculations(
    covidData,
    population,
    totalCases,
    totalDeaths,
    totalVaccines
  );

  res.send({
    vaccines,
    covidData,
    population,
    calculations,
  });
});
