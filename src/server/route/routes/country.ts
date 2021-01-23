import express from 'express';
import moment from 'moment';
import { COVIDTrend } from '../../jobs/trendingCountries';
import { languageProvider } from '../../scripts/languageProvider';
import { fileProvider } from './../../scripts/fileProvider';

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

router.get('/language', async (req, res) => {
  const { lang } = req.query;

  if (lang) {
    const translation = languageProvider.getLanguage(lang.toString());
    res.send(translation);
  }
});

router.get('/country', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { country, days } = req.query;

  const population = await countryProvider.getPopulation(country as string);

  const vaccines = await vaccineProvider.getVaccinationByDay(
    country as string,
    Number(days),
    population
  );

  const covidData = await covidDataProvider.getCOVIDDataByDay(
    country as string,
    Number(days)
  );

  const countryCOVIDTotals = await covidDataProvider.getCOVIDDataForCountry(
    country as string
  );
  const countryVaccinationTotal = await vaccineProvider.getVaccinationsByCountry(
    country as string
  );

  let trendingCountries = fileProvider.readJSON(
    'covid.json'
  ) as Array<COVIDTrend>;
  trendingCountries.slice(0, 10);

  let trendingVaccinationCountries = fileProvider.readJSON(
    'vaccines.json'
  ) as Array<COVIDTrend>;
  trendingVaccinationCountries.slice(
    trendingVaccinationCountries.length - 10,
    trendingVaccinationCountries.length - 1
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

  const createdOn = moment();

  res.send({
    vaccines,
    covidData,
    population,
    calculations,
    trendingCountries,
    trendingVaccinationCountries,
    createdOn,
  });
});
