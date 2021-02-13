import moment, { Moment } from 'moment';
import { COVIDPlaceModel } from '../../../types';
import { Place } from '../../server/models/ICOVIDDataProvider';
import { countryProvider } from '../../server/scripts/countryProvider';

export const utils = {
  getScreenWidth: () => {
    return window.innerWidth;
  },
  getScreenHeight: () => {
    return window.innerHeight;
  },

  getPixelWidthByPercent: (percent: number) => {
    return utils.getScreenWidth() * percent;
  },

  getPixelHeightByPercent: (percent: number) => {
    return utils.getScreenHeight() * percent;
  },

  getTimeDescription: (date: string, prefix: string) => {
    let momentDate = moment(date);
    return (
      prefix +
      momentDate.format('MMMM Do YYYY') +
      ' at ' +
      momentDate.format('h:mm A')
    );
  },

  getPlaceType: (placeModel: COVIDPlaceModel, name: string) => {
    if (placeModel && placeModel?.states?.map((x) => x.name).includes(name)) {
      return 'state';
    }
    return 'country';
  },

  appendFavorites: (placeModel: COVIDPlaceModel, favorites: Place[]) => {
    let states = placeModel.states;
    let countries = placeModel.countries;

    for (let i = 0; i < countries.length; i++) {
      countries[i].isFavorite = false;
    }

    for (let i = 0; i < favorites.length; i++) {
      let current = countries.filter((x) => x.name === favorites[i].name);

      if (current.length > 0) {
        current[0].isFavorite = true;
      }
    }

    for (let i = 0; i < states.length; i++) {
      states[i].isFavorite = false;
    }

    for (let i = 0; i < favorites.length; i++) {
      let current = states.filter((x) => x.name === favorites[i].name);

      if (current.length > 0) {
        current[0].isFavorite = true;
      }
    }

    let results: COVIDPlaceModel = {
      states,
      countries,
    };
    return results;
  },
};
