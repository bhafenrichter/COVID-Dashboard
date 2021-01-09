/*
    API Calls implemented through https://api.covid19api.com/
*/

import { COVIDCountry, COVIDDay, ICOVIDDataProvider } from "../models/ICOVIDDataProvider";

;

class COVIDDataProvider implements ICOVIDDataProvider {
    BASE_URL = 'https://api.covid19api.com/';

    constructor() {}

    getCOVIDDataByDay = (country: string, days: number) => {
        return null;
    };
    getCOVIDDataForCountry = (country: string) => {
        return null;
    };
}

export const covidData = new COVIDDataProvider();