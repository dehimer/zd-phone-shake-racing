import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


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

// App.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   persons: PropTypes.array,
//   person: PropTypes.object,
// };

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
/*
class App extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    console.log(props);
    console.log(state);
    return null;
  }

  state = {
    person: null
  };

  componentDidMount() {
    // console.log('componentDidMount');
    // const userId = localStorage.getItem('userId');
    // console.log(`userId: ${userId}`);
  }

  setPerson = ({ id: personId }) => {
    const { selectPerson } = this.props;
    console.log('setPerson');
    // generate player id
    const userId = uuidv1();
    this.setState({ userId: uuidv1() }, () => {
    });
    // send to server selected person and player id
    selectPerson({ userId, personId });
    //

    // this.setState({ person }, () => {
    //   // send
    // })
  };

  derivi

  // const showUserFieldsScreen = false;
  // зачем хранить в памяти?
  // нужно в памяти хранить только id клиента и при его соединение и любых операциях использовать его
  // этот id появляется по завершению ввода данных о себе
  // check all fields

  // id берётся из localStorage

  // клиент проверяет (где?) есть ли у него в ls id и если нет, то шлёт запрос

  render() {
    const { persons, person } = this.state;

    return (
      <div>
        { persons && !person
          ? <Persons persons={[]} select={this.setPerson}/>
          : null
        }
      </div>
    )
  }
}


*/
