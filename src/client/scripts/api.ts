export const api = {
  getCOVIDDate: async (country: string) => {
    let request = await fetch(`/api/country?country=${country}&days=30`);
    let results = await request.json();
    return results;
  },
  getCountries: async () => {
    let request = await fetch(`/api/countries`);
    let results = await request.json();
    return results;
  },
  getLanguage: async (lang: string) => {
    let request = await fetch(`/api/language?lang=${lang}`);
    let results = await request.json();
    return results;
  },
};
