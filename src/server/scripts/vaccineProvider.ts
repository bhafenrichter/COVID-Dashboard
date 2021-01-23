import csvtojson from 'csvtojson';
import moment from 'moment';
import request from 'request';

import {
  ICOVIDVaccineProvider,
  VaccineDay,
} from './../models/ICOVIDVaccineDataProvider';

class VaccineProvider implements ICOVIDVaccineProvider {
  BASE_URL =
    'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv';

  getVaccinationByDay = async (
    country: string,
    days: number,
    population: number
  ) => {
    const cutoffDate = moment().subtract(days, 'days');
    let results: Array<VaccineDay> = [];
    let vaccineRequest = request.get(this.BASE_URL);

    await csvtojson()
      // @ts-ignore
      .fromStream(vaccineRequest)
      .subscribe(
        (json) => {
          let vaccinationDate = moment(json.date);
          if (country === 'United States of America') {
            country = 'United States';
          }

          if (
            json.location?.toLowerCase() === country?.toLowerCase() &&
            vaccinationDate > cutoffDate
          ) {
            let currentVaccine: VaccineDay = {
              day: vaccinationDate.format('MMM Do'),
              vaccines: Number(json.daily_vaccinations) as number,
              immunityPercent:
                results.reduce((x, y) => x + y.vaccines, 0) / population,
            };
            results.push(currentVaccine);
          }
        },
        () => {
          console.log('error');
        },
        () => {
          // console.log('complete');
        }
      );

    return results;
  };
  getVaccinationsByCountry = async (country: string) => {
    const vaccines = await this.getVaccinationByDay(country, 9999, 0);
    let totalVaccines = 0;
    vaccines.forEach((entry) => {
      totalVaccines += entry.vaccines;
    });
    return totalVaccines;
  };
}

export const vaccineProvider = new VaccineProvider();
