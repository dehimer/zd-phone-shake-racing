import React, { Component } from 'react';
import _ from 'underscore';

import Title from '../Title';
// import ScreenName from "../ScreenName";
import styles from './index.css'
import {connect} from "react-redux";

class Shaker extends Component {
  state = {
    acceleration: { x: 0, y: 0, z: 0 },
    currentAcceleration: 0,
    maxAcceleration: 10,
    err: null
  };

  constructor(props) {
    super(props);

    this.handleAcceleration = _.throttle(this.handleAcceleration, 100);
  }

  handleAcceleration = (e) => {
    const { shake, person } = this.props;

    const { acceleration } = e;

    if (acceleration.x != null)
    {
        const { x, y, z } = acceleration;

        const sumOfSquares = Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2);
        const currentAcceleration = (sumOfSquares > 0) ? Math.sqrt(sumOfSquares) : 0;

        let { maxAcceleration } = this.state;
        if (maxAcceleration < currentAcceleration) {
          maxAcceleration = currentAcceleration;
        }

        this.setState({
          maxAcceleration,
          currentAcceleration,
          acceleration
        });

        shake({ id: person.id, acceleration: currentAcceleration/maxAcceleration });
    }
  };

  componentDidMount() {
    window.addEventListener('devicemotion', this.handleAcceleration, false);
  }

  componentWillUnmount() {
    window.removeEventListener('devicemotion', this.handleAcceleration, false);
  }

  render() {
    const { person, unselectPerson } = this.props;
    const { acceleration: { x, y, z } } = this.state;

    return (
      <div className={styles.shaker}>
        <Title back={() => unselectPerson(person.id)} color={'green'} />
        <div className={styles.content}>
          <img
            style={{
              transform: `translate(${x}%, ${y}%) scale(${1+z/50})`
            }}
            src={`/public/theme/avatars/${person.avatar}`}
          />
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
    shake: (data) => {
      dispatch({
        type: 'server/shake',
        data
      });
    },

    unselectPerson: (id) => {
      dispatch({
        type: 'server/unselectperson',
        data: id
      });
    }
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shaker);
