export const api = {
  getCOVIDDate: async (country: string, placeType: string) => {
    let request = await fetch(`/api/country?${placeType}=${country}&days=30`);
    let results = await request.json();
    return results;
  },
  getPlaces: async () => {
    let request = await fetch(`/api/places`);
    let results = await request.json();
    return results;
  },
  getLanguage: async (lang: string) => {
    let request = await fetch(`/api/language?lang=${lang}`);
    let results = await request.json();
    return results;
  },
};
