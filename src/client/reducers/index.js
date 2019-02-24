import { combineReducers } from 'redux';
import server from './server';
import socket from './socket';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  server,
  socket
});
