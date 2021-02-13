import { Place } from './ICOVIDDataProvider';

export interface ICountryDataProvider {
  getPopulation: (country: string) => Promise<number>;
  getCOVIDCountries: () => Promise<Array<Place>>;
}
