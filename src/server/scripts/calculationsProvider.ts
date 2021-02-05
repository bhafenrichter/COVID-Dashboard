/*
    Used to serve calculations for the dashboard in terms of COVID numbers
*/

import {
  ICalculationsProvider,
  TRENDING_STATE,
} from '../models/ICalculationsProvider';
import { COVIDDay } from '../models/ICOVIDDataProvider';
import { utils } from './utils';

class CalculationsProvider implements ICalculationsProvider {
  getCalculations = (
    cases: COVIDDay[],
    population: number,
    totalCases: number,
    totalDeaths: number,
    totalVaccinations: number
  ) => {
    return {
      casesThisWeek: utils.formatNumber(
        this.getStatisticThisWeek(cases, 'cases')
      ),
      casesTrending: this.getCOVIDTrend(cases, 'cases'),
      deathsThisWeek: utils.formatNumber(
        this.getStatisticThisWeek(cases, 'deaths')
      ),
      deathsTrending: this.getCOVIDTrend(cases, 'deaths'),
      populationImmunity: utils.formatPercent(
        this.getPopulationImmunity(population, totalVaccinations)
      ),
      deathRate: utils.formatPercent(
        this.getDeathRate(totalDeaths, totalCases)
      ),
    };
  };
  getCOVIDTrend = (cases: COVIDDay[], attribute: string) => {
    if (cases.length === 0) {
      return 0;
    }

    const thisWeek = this.getStatisticThisWeek(cases, attribute);
    const lastWeek = this.getStatisticThisWeek(cases, attribute, 6);
    return thisWeek - lastWeek;
  };
  getStatisticThisWeek = (cases: COVIDDay[], attribute: string, offset = 0) => {
    if (cases.length === 0) {
      return 0;
    }
    const thisWeek = cases
      .slice(cases.length - 6 - offset, cases.length - offset)
      // @ts-ignore
      .map((x) => x[attribute]);
    return thisWeek.reduce((x, y) => x + y);
  };
  getPopulationImmunity = (population: number, totalVaccinations: number) => {
    if (totalVaccinations === 0) {
      return 'Unknown';
    }
    let immunityRate = totalVaccinations / population;
    return immunityRate.toFixed(3);
  };
  getDeathRate = (totalDeaths: number, totalCases: number) => {
    return (totalDeaths / totalCases).toFixed(3);
  };
}

export const calculationsProvider = new CalculationsProvider();
