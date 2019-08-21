import { createStore, applyMiddleware, compose } from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
// import error from 'redux-socket.io-error-thunk';
import { rootReducer } from '../reducers/index';
import { port } from '../../../config';

// eslint-disable-next-line no-restricted-globals
const socket = io(`https://${location.hostname}:${port}/webmobile`);
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default function configureStore() {
  const store = compose(
    applyMiddleware(socketIoMiddleware),
  )(createStore)(rootReducer);

  socket.on('connect_timeout', () => store.dispatch({ type: 'disconnect' }));
  socket.on('connect_error', () => store.dispatch({ type: 'disconnect' }));
  socket.on('reconnect_error', () => store.dispatch({ type: 'disconnect' }));
  socket.on('reconnect', () => store.dispatch({ type: 'reconnect' }));
  socket.on('stop', () => {socket.disconnect(); store.dispatch({ type: 'disconnect' })});

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers/index').rootReducer);
    });
  }

  return store;
}
