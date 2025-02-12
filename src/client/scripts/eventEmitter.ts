import { EventEmitter } from 'eventemitter3';

const eventEmitter = new EventEmitter();
export const ee = {
  dispatch: (eventName: string, args?: any) => {
    eventEmitter.emit(eventName, args);
  },
  subscribe: (eventName: string, command: (args: any) => void) => {
    eventEmitter.on(eventName, (args) => command(args));
  },
};

export const EVTS = {
  CHANGE_PLACE: 'Change Place',
  CLOSE_MODAL: 'Close Modal',
  SHOW_LOADING: 'Show Loading',
  HIDE_LOADING: 'Hide Loading',
  CHANGE_LANGUAGE: 'Change Language',
  ADD_FAVORITE: 'Add Favorite',
  REMOVE_FAVORITE: 'Remove Favorite',
};
