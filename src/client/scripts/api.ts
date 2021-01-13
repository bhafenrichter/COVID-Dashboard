export const api = {
  getCOVIDDate: async (country: string) => {
    let request = await fetch(
      `http://localhost:3001/api/country?country=${country}&days=30`
    );
    let results = await request.json();
    console.log(results);
    return results;
  },
  getCountries: async () => {},
};
