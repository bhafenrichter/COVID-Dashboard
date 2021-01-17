import { ICountryDataProvider } from '../models/ICountryDataProvider';

import { getAlpha2Code } from 'i18n-iso-countries';
import fetch from 'node-fetch';

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
    let countryData = await this.createRequest(country);
    return countryData.population;
  };
  getLogo = (country: string) => {
    let countryCode = getAlpha2Code(country, 'en');
    return `http://localhost:3001/static/svg/${countryCode}.svg`;
  };
}

export const countryProvider = new CountryProvider();
