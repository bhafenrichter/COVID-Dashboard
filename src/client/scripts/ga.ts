import ReactGA from 'react-ga';

export const tracking = {
  init: () => {
    ReactGA.initialize('G-PJ4C7DD8TD');
  },

  track: (category:string, action: string) => {
    ReactGA.event({
      category: category,
      action: action,
    });
  },
  page: (path: string) => {
    ReactGA.pageview(path);
  }
}