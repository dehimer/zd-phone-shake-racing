import React, { Component } from 'react';
import { connect } from 'react-redux';


import SelectPerson from '../SelectPerson';
import Shaker from '../Shaker';
import NoFreePersons from '../NoFreePersons';
import Error from '../Error';

import styles from './index.css'

class App extends Component {
  render() {
    const { persons, person, selectPerson, socket: { disconnected } } = this.props;

    const error = disconnected;

    let contentEl = null;
    if (error) {
      contentEl = <Error />;
    } else if (person) {
      contentEl = <Shaker person={person} />;
    } else if (persons) {
      const allPersonsInUse = persons && persons.length === 0;

      if (allPersonsInUse) {
        contentEl = <NoFreePersons />;
      } else {
        contentEl = <SelectPerson persons={persons} select={(id) => selectPerson(id)} />;
      }
    }


    return (
      <div className={styles.app}>
        <div className={styles.title}>
          Звонкая Масленница
        </div>
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
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
