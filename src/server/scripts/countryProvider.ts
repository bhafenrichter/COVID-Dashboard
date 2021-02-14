import { ICountryDataProvider } from '../models/ICountryDataProvider';

import { getAlpha2Code } from 'i18n-iso-countries';
import fetch from 'node-fetch';
import { fileProvider } from './fileProvider';
import { Place } from '../models/ICOVIDDataProvider';

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

  getCOVIDCountries = async () => {
    let selectedCountries: Array<string> = fileProvider.readJSON(
      'countries.json'
    ).countries;
    let results = selectedCountries
      .map((x) => {
        return {
          name: x,
          logo: getAlpha2Code(x, 'en'),
        };
      })
      .sort((x, y) => (x.name > y.name ? 1 : -1));
    return results;
  };

  getCOVIDStates = async () => {
    let states: any = fileProvider.readJSON('states.json');
    let results: Array<Place> = [];

    Object.keys(states).forEach((x: any) => {
      results.push({
        id: x,
        name: states[x],
        logo: x,
      });
    });
    results.sort((x: Place, y: Place) => (x.name > y.name ? 1 : -1));
    return results;
  };
}

export const countryProvider = new CountryProvider();
