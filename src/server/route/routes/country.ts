import express from 'express';
import { COVIDTrend } from '../../jobs/trendingCountries';
import { utils } from '../../scripts/utils';
import { fileProvider } from "./../../scripts/fileProvider";

export const router = express.Router();

import {
  covidDataProvider,
  vaccineProvider,
  countryProvider,
  calculationsProvider,
} from './../../scripts/index';

router.get('/countries', async (req, res) => {
  const countries = await covidDataProvider.getCOVIDCountries();
  res.send(countries);
});

router.get('/country', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { country, days } = req.query;

  const vaccines = await vaccineProvider.getVaccinationByDay(
    country as string,
    Number(days)
  );
  const covidData = await covidDataProvider.getCOVIDDataByDay(
    country as string,
    Number(days)
  );
  const population = await countryProvider.getPopulation(country as string);

  const countryCOVIDTotals = await covidDataProvider.getCOVIDDataForCountry(
    country as string
  );
  const countryVaccinationTotal = await vaccineProvider.getVaccinationsByCountry(
    country as string
  );

  let trendingCountries = fileProvider.readJSON('covid.json') as Array<COVIDTrend>;
  trendingCountries.slice(0, 10);

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
    trendingCountries,
  });
});
