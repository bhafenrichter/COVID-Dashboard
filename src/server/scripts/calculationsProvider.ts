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
      deathsThisWeek: this.getDeathsThisWeek(cases),
      deathsTrending: this.getDeathsTrendingDirection(cases),
      populationImmunity: this.getPopulationImmunity(
        population,
        totalVaccinations,
        totalCases,
        totalDeaths
      ),
      deathRate: this.getDeathRate(totalDeaths, totalCases),
    };
  };
  getCasesTrendingDirection = (cases: COVIDDay[]) => {
    const thisWeek = cases.slice(0, 6).map((x) => x.cases);
    const lastWeek = cases.slice(7, 13).map((x) => x.cases);
    return thisWeek > lastWeek ? TRENDING_STATE.UP : TRENDING_STATE.DOWN;
  };
  getDeathsTrendingDirection = (cases: COVIDDay[]) => {
    const thisWeek = cases.slice(0, 6).map((x) => x.deaths);
    const lastWeek = cases.slice(7, 13).map((x) => x.deaths);
    return thisWeek > lastWeek ? TRENDING_STATE.UP : TRENDING_STATE.DOWN;
  };
  getCasesThisWeek = (cases: COVIDDay[]) => {
    const thisWeek = cases.slice(0, 6).map((x) => x.cases);
    return thisWeek.reduce((x, y) => x + y);
  };
  getDeathsThisWeek = (cases: COVIDDay[]) => {
    const thisWeek = cases.slice(0, 6).map((x) => x.deaths);
    return thisWeek.reduce((x, y) => x + y);
  };
  getPopulationImmunity = (
    population: number,
    totalVaccinations: number,
    totalCases: number,
    totalDeaths: number
  ) => {
    let immunityRate = totalVaccinations / population;
    return immunityRate.toFixed(3);
  };
  getDeathRate = (totalDeaths: number, totalCases: number) => {
    return (totalDeaths / totalCases).toFixed(3);
  };
}

export const calculationsProvider = new CalculationsProvider();
