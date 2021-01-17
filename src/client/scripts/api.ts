export const api = {
  getCOVIDDate: async (country: string) => {
    let request = await fetch(
      `http://localhost:3001/api/country?country=${country}&days=30`
    );
    let results = await request.json();
    console.log(results);
    return results;
  },
  getCountries: async () => {
    let request = await fetch(`http://localhost:3001/api/countries`);
    let results = await request.json();
    return results;
  },
  getLanguage: async (lang: string) => {
    let request = await fetch(`http://localhost:3001/api/language?lang=${lang}`);
    let results = await request.json();
    return results;
  }
};
