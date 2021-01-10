import express from 'express';
export const router = express.Router();

import {
  covidDataProvider,
  vaccineProvider,
  countryProvider,
} from './../../scripts/index';

router.post('/country', async (req, res) => {
  const { country, days } = req.body;

  const vaccines = await vaccineProvider.getVaccinationByDay(country, days);
  const covidData = await covidDataProvider.getCOVIDDataByDay(country, days);
  const population = await countryProvider.getPopulation(country);

  res.send({
    vaccines,
    covidData,
    population,
  });
});
