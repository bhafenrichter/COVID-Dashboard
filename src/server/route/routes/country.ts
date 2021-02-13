import express from 'express';
import moment from 'moment';
import { COVIDTrend } from '../../jobs/trendingCountries';
import { languageProvider } from '../../scripts/languageProvider';
import { fileProvider } from './../../scripts/fileProvider';
import { COVIDPlaceModel } from './../../../../types/index';
export const router = express.Router();

import {
  covidCountryProvider,
  covidStateDataProvider,
  vaccineProvider,
  countryProvider,
  calculationsProvider,
} from './../../scripts/index';

router.get('/places', async (req, res) => {
  const states = await countryProvider.getCOVIDStates();
  const countries = await countryProvider.getCOVIDCountries();
  const model: COVIDPlaceModel = {
    states,
    countries,
  };
  res.send(model);
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
  const { country, state, days } = req.query;

  let vaccines,
    population: number,
    covidData,
    countryCOVIDTotals,
    countryVaccinationTotal;
  vaccines = covidData = countryCOVIDTotals = countryVaccinationTotal = {};

  let place = (country as string) || (state as string);

  population = await countryProvider.getPopulation(place);

  let dataProvider =
    typeof country === 'undefined'
      ? covidStateDataProvider
      : covidCountryProvider;

  vaccines = await vaccineProvider.getVaccinationByDay(
    place,
    Number(days),
    population
  );

  covidData = await dataProvider.getCOVIDDataByDay(place, Number(days));

  countryCOVIDTotals = await dataProvider.getCOVIDDataForCountry(place);
  countryVaccinationTotal = await vaccineProvider.getVaccinationsByCountry(
    place
  );

  let trendingCountries = fileProvider.readJSON(
    'covid.json'
  ) as Array<COVIDTrend>;

  trendingCountries = trendingCountries.map((x) => {
    return {
      ...x,
      normalizedTrend: (Number(x.trend) / 100) * population,
    };
  });

  trendingCountries
    .sort((x, y) =>
      Number(x.normalizedTrend) < Number(y.normalizedTrend) ? 1 : -1
    )
    .slice(0, 10);

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

  // return a bad value, we don't want to cache this!
  if (vaccines.length === 0 || covidData.length === 0) {
    // @ts-ignore
    res.badResponse = true;
  }

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
