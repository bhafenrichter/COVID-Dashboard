/*
    Used to serve calculations for the dashboard in terms of COVID numbers
*/

import {
  ICalculationsProvider,
  TRENDING_STATE,
} from '../models/ICalculationsProvider';
import { COVIDDay } from '../models/ICOVIDDataProvider';

class CalculationsProvider implements ICalculationsProvider {
  getCalculations = (
    cases: COVIDDay[],
    population: number,
    totalCases: number,
    totalDeaths: number,
    totalVaccinations: number
  ) => {
    return {
      casesThisWeek: this.getCasesThisWeek(cases),
      casesTrending: this.getCasesTrendingDirection(cases),
      getDeathsThisWeek: this.getDeathsThisWeek(cases),
      deathsTrending: this.getDeathsTrendingDirection(cases),
      populationImmunity: this.getPopulationImmunity(
        population,
        totalVaccinations
      ),
      deathRate: this.getDeathRate(totalDeaths, totalCases),
    };
  };
  getCasesTrendingDirection = (cases: COVIDDay[]) => {
    return TRENDING_STATE.UP;
  };
  getDeathsTrendingDirection = (cases: COVIDDay[]) => {
    return TRENDING_STATE.UP;
  };
  getCasesThisWeek = (cases: COVIDDay[]) => {
    return 0;
  };
  getDeathsThisWeek = (cases: COVIDDay[]) => {
    return 0;
  };
  getPopulationImmunity = (population: number, totalVaccinations: number) => {
    return 0;
  };
  getDeathRate = (totalDeaths: number, totalCases: number) => {
    return 0;
  };
}

export const calculationsProvider = new CalculationsProvider();
