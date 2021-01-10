export interface ICountryDataProvider {
  getPopulation: (country: string) => Promise<number>;
}
