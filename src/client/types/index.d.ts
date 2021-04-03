declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.jpg';
declare module '*.gif';
declare module '*.less';

declare module 'rodal';

interface Translations {
  home: string;
  casesThisWeek: string;
  deathsThisWeek: string;
  immunityPercent: string;
  deathRate: string;
  casesByDay: string;
  recovering: string;
  hotspots: string;
  vaccinationsByDay: string;
  topVaccinatingCountries: string;
  noDataReported: string;
  covidFiguresFor: string;
  selectACountry: string;
  cases: string;
  deaths: string;
  language: string;
  en: string;
  de: string;
  es: string;
  vaccinesAdministered: string;
  '7DayAverage': string;
  immunityPercentHelp: string;
  deathRateHelp: string;
  recoveringHelp: string;
  hotspotHelp: string;
  vaccinationHelp: string;
  about: string;
  asOf: string;
  up: string;
  down: string;
  fromLastWeek: string;
}
