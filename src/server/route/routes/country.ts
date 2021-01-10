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

  let totalCases = 0;
  let totalDeaths = 0;
  let totalVaccines = 0;
  covidData.forEach((entry) => {
    totalCases += entry.cases;
    totalDeaths += entry.deaths;
  });

  vaccines.forEach((entry) => {
    totalVaccines += entry.vaccines;
  });

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
