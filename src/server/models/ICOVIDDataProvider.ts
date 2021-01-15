import { Moment } from 'moment';

/*
    Interface for grabbing needed cases and deaths data to populate the COVID Dashboard
*/
export interface ICOVIDDataProvider {
  getCOVIDDataByDay: (
    country: string,
    days: number
  ) => Promise<Array<COVIDDay>>;
  getCOVIDDataForCountry: (country: string) => Promise<COVIDCountry>;
  getCOVIDCountries: () => Promise<Array<Country>>;
}

export interface COVIDDay {
  day: Moment;
  cases: number;
  deaths: number;
  case7DayAvg: string;
  death7DayAvg: string;
}

export interface COVIDCountry {
  cases: number;
  deaths: number;
}

export interface Country {
  logo: string;
  name: string;
}
