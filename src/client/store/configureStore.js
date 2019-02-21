import { createStore, applyMiddleware, compose } from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import { rootReducer } from '../reducers/index';
import { port } from '../../../config';

// eslint-disable-next-line no-restricted-globals
const socket = io(`http://${location.hostname}:${port}`);
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default function configureStore() {
  const store = compose(
    applyMiddleware(socketIoMiddleware),
  )(createStore)(rootReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers/index').rootReducer);
    });
  }

  return store;
}
