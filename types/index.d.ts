import { COVIDDay } from '../src/server/models/ICOVIDDataProvider';

declare type COVIDDataModel = {
  vaccines: Array<COVIDDay>;
  covidData: Array<COVIDDay>;
  population: number;
  calculations: {
    deathRate: string;
    populationImmunity: string;
    casesThisWeek: number;
    deathsThisWeek: number;
  };
};
