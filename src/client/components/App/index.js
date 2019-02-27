import React, { Component } from 'react';
import { connect } from 'react-redux';

import WifiNeeded from '../WifiNeeded';
import SelectPerson from '../SelectPerson';
import Shaker from '../Shaker';
import Error from '../Error';

import styles from './index.css'

class App extends Component {
  state = {};

  checkAcceleration() {
    let x = null;
    const accelerationHandler = (e) => {
      const { acceleration } = e;

      if (acceleration.x !== null) {
        x = acceleration.x;
      }

      window.removeEventListener('devicemotion', accelerationHandler, false);
    };

    window.addEventListener('devicemotion', accelerationHandler, false);

    setTimeout(() => {
      if (x === null) {
        this.setState({ noAcceleration: true });
      }
    }, 1000);
  };

  componentDidMount() {
    this.checkAcceleration();
  }

  render() {
    const { persons, person, selectPerson, socket: { disconnected, reconnect } } = this.props;
    const { noAcceleration } = this.state;

    const error = disconnected || reconnect || window.DeviceMotionEvent === undefined || noAcceleration;

    let contentEl = null;
    if (location.hostname !== 'localhost' && !location.hostname.includes('192.168.')) {
      contentEl = <WifiNeeded />
    } else if (error) {
      const kind = (disconnected || reconnect) ? 'connection' : 'acceleration';
      contentEl = <Error kind={kind} />;
    } else if (person) {
      contentEl = <Shaker person={person} />;
    } else if (persons) {
      contentEl = <SelectPerson persons={persons} select={(id) => selectPerson(id)} />;
    }


    return (
      <div className={styles.app}>
        <div className={styles.content}>
          { contentEl }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { socket, server } = state;
  const { persons, person } = server;

  return { persons, person, socket };
};

const mapDispatchToProps = dispatch => (
  {
    selectPerson: (id) => {
      dispatch({
        type: 'server/selectperson',
        data: id
      });
    },
    unselectPerson: (id) => {
      dispatch({
        type: 'server/unselectperson',
        data: id
      });
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
