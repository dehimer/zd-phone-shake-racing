import React, { Component } from 'react';
import { connect } from 'react-redux';


import SelectPerson from '../SelectPerson';
import Shaker from '../Shaker';
import NoFreePersons from '../NoFreePersons';

import styles from './index.css'

class App extends Component {
  render() {
    const { persons, person, selectPerson } = this.props;

    let contentEl = null;
    if (person) {
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
  const { persons, person } = state.server;
  return { persons, person };
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
