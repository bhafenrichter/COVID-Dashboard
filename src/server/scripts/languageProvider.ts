import { fileProvider } from "./fileProvider"

export const languageProvider = {
  getLanguage: (lang: string) => {
    try{
      return fileProvider.readJSON(`lang/${lang}.json`);
    } catch(e) {
      return fileProvider.readJSON(`lang/en.json`);
    }
  }
}