import 'core-js/stable';
import 'regenerator-runtime/runtime';
const TIMEOUT = 10000;
describe('COVID Data Provider', () => {
  it(
    'Connect to COVID Data Provider',
    async () => {
      const dataProvider = require('./../src/server/scripts/covidProvider');
      const req = await dataProvider.covidData.getCOVIDDataByDay('germany', 30);
      expect(true).toBe(true);
    },
    TIMEOUT
  );
});
