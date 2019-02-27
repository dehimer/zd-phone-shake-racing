import React, { Component } from 'react';
import _ from 'underscore';

import Title from '../Title';
import styles from './index.css'
import {connect} from "react-redux";

class Shaker extends Component {
  state = {
    acceleration: { x: 0, y: 0, z: 0 },
    currentAccelerations: [],
    maxAcceleration: 10,
    err: null
  };

  constructor(props) {
    super(props);

    // this.handleAcceleration = _.throttle(this.handleAcceleration, 70);
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

        this.setState((prevState) => {
          const currentAccelerations = prevState.currentAccelerations;

          currentAccelerations.push(currentAcceleration);
          if (currentAccelerations.length > 3) {
            currentAccelerations.shift();
          }

          const nAcceleration = currentAcceleration/maxAcceleration;

          if (
            currentAccelerations.length === 3
            && currentAccelerations[1] > currentAccelerations[0]
            && currentAccelerations[1] > currentAccelerations[2]
            && nAcceleration > 0.1
          ) {
            shake({ id: person.id, a: nAcceleration });
          }

          return {
            maxAcceleration,
            currentAccelerations,
            acceleration
          }
        });

    }
  };

  componentDidMount() {
    // emulate events
    /*setInterval(() => {
      this.handleAcceleration({
        acceleration: {
          x: Math.random(),
          y: Math.random(),
          z: Math.random()
        }
      })
    }, 100);*/
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
        <div className={styles.instrument}>
          <img
            style={{
              transform: `translate(${x}%, ${y}%) scale(${1+z/50})`
            }}
            src={`/public/theme/avatars/${person.avatar}`}
          />
        </div>
        <div className={styles.message} >
          <div className={styles.top}>
            <img src={'/public/theme/decoration/F-4.png'} />
          </div>

          <div className={styles.text}>
            Потрясите телефоном,<br/>управляйтие мелодией
          </div>

          <div className={styles.bottom}>
            <div className={styles.left}>
              <img src={'/public/theme/decoration/F-5.png'} />
            </div>
            <div className={styles.right}>
              <img src={'/public/theme/decoration/F-1.png'} />
            </div>
          </div>
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
