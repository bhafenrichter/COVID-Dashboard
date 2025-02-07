import 'core-js/stable';
import 'regenerator-runtime/runtime';
const TIMEOUT = 10000;
describe('COVID Data Provider', () => {
  it(
    'Connect to COVID Country Data Provider',
    async () => {
      const dataProvider = require('./../src/server/scripts/covidCountryProvider');
      const req = await dataProvider.covidDataProvider.getCOVIDDataByDay(
        'germany',
        30
      );
      expect(req).toBeDefined();
    },
    TIMEOUT
  );
  it(
    'Connect to COVID State Data Provider',
    async () => {
      const dataProvider = require('./../src/server/scripts/covidStateProvider');
      const req = await dataProvider.covidStateDataProvider.getCOVIDDataByDay(
        'MO',
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

  it('Read JSON Data', async () => {
    const provider = require('./../src/server/scripts/fileProvider');
    let data = provider.fileProvider.readJSON('test.json');
    expect(data).toBeDefined();
  });

  it('Write JSON Data', async () => {
    const provider = require('./../src/server/scripts/fileProvider');
    let data = provider.fileProvider.writeJSON('test2.json', {
      name: 'brandon',
    });
    expect(data).toBe(true);
  });

  it('Delete JSON Data', async () => {
    const provider = require('./../src/server/scripts/fileProvider');
    provider.fileProvider.deleteJSON('test2.json');

    let data = provider.fileProvider.readJSON('test2.json');
    expect(data).toBeNull();
  });

  it('Run Trending Countries', async () => {
    0;
    const provider = require('./../src/server/jobs/trendingCountries');
    await provider.trendingCountries(false);
    expect(true).toBe(true);
  }, 10000000);

  it('Run Vaccinating Countries', async () => {
    const provider = require('./../src/server/jobs/topVaccinatingCountries');
    await provider.getTopVaccinatingCountries();
    expect(true).toBe(true);
  }, 10000000);
});
