import { COVIDDay } from './ICOVIDDataProvider';

export interface ICalculationsProvider {
  getCalculations: (
    cases: Array<COVIDDay>,
    population: number,
    totalCases: number,
    totalDeaths: number,
    totalVaccinations: number
  ) => any;
  getCOVIDTrend: (cases: Array<COVIDDay>, attribute: string) => number;
  getStatisticThisWeek: (
    cases: Array<COVIDDay>,
    attribute: string,
    offset?: number
  ) => number;
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
