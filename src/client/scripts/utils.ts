import moment, { Moment } from "moment";

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

  getTimeDescription: (date: string) => {
    let momentDate = moment(date);
    return 'as of ' + momentDate.format('MMMM Do YYYY') + ' at ' + momentDate.format('h:mm A');
  }
};
