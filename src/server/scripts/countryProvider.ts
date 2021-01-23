import { ICountryDataProvider } from '../models/ICountryDataProvider';

import { getAlpha2Code } from 'i18n-iso-countries';
import fetch from 'node-fetch';
import { fileProvider } from './fileProvider';

class CountryProvider implements ICountryDataProvider {
  BASE_URL = 'https://restcountries.eu/rest/v2/alpha/{COUNTRY_CODE}';
  createRequest = async (country: string) => {
    if (country === 'United States') {
      country += ' of America';
    }
    let countryCode = getAlpha2Code(country, 'en');
    let requestUrl = this.BASE_URL.replace('{COUNTRY_CODE}', countryCode);

    let request = await fetch(requestUrl);
    let response = await request.json();

    return response;
  };
  getPopulation = async (country: string) => {
    // check the cache
    let cache = fileProvider.readJSON('populations.json');

    if (!cache) {
      cache = {};
    }

    if (cache[country]) {
      return cache[country];
    }

    let countryData = await this.createRequest(country);

    // save to the cache for later use
    cache[country] = countryData.population;
    fileProvider.writeJSON('populations.json', cache);

    return countryData.population;
  };
  getLogo = (country: string) => {
    let countryCode = getAlpha2Code(country, 'en');
    return `${countryCode}`;
  };
}

export const countryProvider = new CountryProvider();
