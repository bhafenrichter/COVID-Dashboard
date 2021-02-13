import ReactGA from 'react-ga';

export const tracking = {
  init: () => {
    // ReactGA.initialize('G-PJ4C7DD8TD');
    ReactGA.initialize('G-M3X2R5KY87');
  },

  track: (category: string, action: string) => {
    if ('gtag' in window) {
      // @ts-ignore
      gtag('event', category, {
        event_category: action,
        eventLabel: 'custom_event',
      });
    }
  },
  page: (path: string) => {
    tracking.init();
    ReactGA.pageview(path);
  },
};
