/*
    Interface for grabbing needed vaccination data
*/

import { Moment } from 'moment';

export interface ICOVIDVaccineProvider {
  getVaccinationByDay: (
    country: string,
    days: number,
    population: number
  ) => Promise<Array<VaccineDay>>;
  getVaccinationsByCountry: (country: string) => Promise<number>;
}

export type VaccineDay = {
  vaccines: number;
  immunityPercent: number;
  day: Moment | string;
};
