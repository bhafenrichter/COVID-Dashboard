import { COVIDDay } from './ICOVIDDataProvider';

export interface ICalculationsProvider {
  getCalculations: (
    cases: Array<COVIDDay>,
    population: number,
    totalCases: number,
    totalDeaths: number,
    totalVaccinations: number
  ) => any;
  getCasesThisWeek: (cases: Array<COVIDDay>) => number;
  getCasesTrendingDirection: (cases: Array<COVIDDay>) => TRENDING_STATE;
  getDeathsThisWeek: (cases: Array<COVIDDay>) => number;
  getDeathsTrendingDirection: (cases: Array<COVIDDay>) => TRENDING_STATE;
  getPopulationImmunity: (
    population: number,
    totalVaccinations: number,
    totalCases: number,
    totalDeaths: number
  ) => string;
  getDeathRate: (totalDeaths: number, totalCases: number) => string;
}

export enum TRENDING_STATE {
  UP = 1,
  DOWN = -1,
  NEUTRAL = 0,
}
