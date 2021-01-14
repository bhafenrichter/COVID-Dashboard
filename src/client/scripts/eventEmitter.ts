import { EventEmitter } from 'eventemitter3';

const eventEmitter = new EventEmitter();
export const ee = {
  dispatch: (eventName: string, args: any) => {
    eventEmitter.emit(eventName, args);
  },
  subscribe: (eventName: string, command: (args: any) => void) => {
    eventEmitter.on(eventName, (args) => command(args));
  },
};

export const EVTS = {
  CHANGE_COUNTRY: 'Change Country',
  CLOSE_MODAL: 'Close Modal',
};
