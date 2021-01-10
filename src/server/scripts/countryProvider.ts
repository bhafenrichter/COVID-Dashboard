import { ICountryDataProvider } from '../models/ICountryDataProvider';

import { getAlpha2Code } from 'i18n-iso-countries';
import fetch from 'node-fetch';

class CountryProvider implements ICountryDataProvider {
  BASE_URL = 'https://restcountries.eu/rest/v2/alpha/{COUNTRY_CODE}';
  createRequest = async (country: string) => {
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
  getLogo = async (country: string) => {
    let countryData = await this.createRequest(country);
    return countryData.flag;
  };
}

export const countryProvider = new CountryProvider();
