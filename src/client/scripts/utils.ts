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
};
