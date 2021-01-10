/*
    Interface for grabbing needed vaccination data
*/

import { Moment } from 'moment';

export interface ICOVIDVaccineProvider {
  getVaccinationByDay: (
    country: string,
    days: number
  ) => Promise<Array<VaccineDay>>;
}

export type VaccineDay = {
  vaccines: number;
  day: Moment;
};
