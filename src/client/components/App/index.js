import React, { useEffect, useState, useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

import Persons from '../Persons'

import styles from './index.css'

export default function App() {
  const mapState = useCallback(state => {
    console.log('useCallback');
    console.log(state);
    return state.server.persons;
  }, []);

  const persons = useMappedState(mapState);
  useEffect(() => {
    console.log('persons');
    console.log(persons);
  });
  return (
    <div className={styles.app}>
      <div className={styles.title}>
        Звонкая Масленница
      </div>
      <div className={styles.content}>
        { persons && <Persons persons={persons} /> }
        {/*{ persons && !person
          ? <Persons persons={[]} select={this.setPerson}/>
          : null
        }*/}
      </div>
    </div>
  )
}
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

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  json: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { persons } = state.server;

  return { persons };
};

const mapDispatchToProps = dispatch => (
  {
    selectPerson: (data) => {
      dispatch({
        type: 'server/getperson',
        data);
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
*/
