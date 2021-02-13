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
}

export interface COVIDDay {
  day: Moment | string;
  cases: number;
  deaths: number;
  case7DayAvg: string;
  death7DayAvg: string;
}

export interface COVIDCountry {
  cases: number;
  deaths: number;
}

export interface Place {
  id?: string;
  logo: string;
  name: string;
  trend?: number | string;
  isFavorite?: boolean;
}
