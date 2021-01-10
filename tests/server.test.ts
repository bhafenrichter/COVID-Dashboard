import 'core-js/stable';
import 'regenerator-runtime/runtime';
const TIMEOUT = 10000;
describe('COVID Data Provider', () => {
  it(
    'Connect to COVID Data Provider',
    async () => {
      const dataProvider = require('./../src/server/scripts/covidProvider');
      const req = await dataProvider.covidDataProvider.getCOVIDDataByDay(
        'germany',
        30
      );
      expect(req).toBeDefined();
    },
    TIMEOUT
  );
  it(
    'Connect to COVID Vaccination Provider',
    async () => {
      const dataProvider = require('./../src/server/scripts/vaccineProvider');
      const req = await dataProvider.vaccineProvider.getVaccinationByDay(
        'germany',
        30
      );
      expect(req).toBeDefined();
    },
    TIMEOUT
  );
  it(
    'Connect to Country Provider',
    async () => {
      const dataProvider = require('./../src/server/scripts/countryProvider');

      const req = await dataProvider.countryProvider.getPopulation(
        'United States'
      );
      expect(req).toBeDefined();

      const req2 = await dataProvider.countryProvider.getLogo('United States');
      expect(req2).toBeDefined();
    },
    TIMEOUT
  );
});
