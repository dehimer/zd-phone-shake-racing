import React, { Component } from 'react';
import _ from 'underscore';

import ScreenName from "../ScreenName";
import styles from './index.css'
import {connect} from "react-redux";

class Shaker extends Component {
  state = {
    maxAcceleration: 10,
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

      const currentAcceleration = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

      let { maxAcceleration } = this.state;
      if (maxAcceleration < currentAcceleration) {

        maxAcceleration = currentAcceleration;

        this.setState({
          maxAcceleration
        })
      }

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
    const { person } = this.props;

    return (
      <div className={styles.shaker}>
        <ScreenName name={<>Тряси<br/>и играй</>}/>
        <div className={styles.content}>
          <img src={`/public/avatars/${person.avatar}`}/>
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
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shaker);
