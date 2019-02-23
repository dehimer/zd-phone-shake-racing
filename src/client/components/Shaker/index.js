import React, { Component } from 'react';

import ScreenName from "../ScreenName";
import styles from './index.css'
import {connect} from "react-redux";

class Shaker extends Component {
  componentDidMount() {
    const { shake, person } = this.props;

    this.intReadAc = setInterval(()=>{
      if (window.DeviceMotionEvent !== undefined) {
        window.ondevicemotion = function(e) {
          const { acceleration } = e;
          if(acceleration.x != null)
          {
            shake({ person, acceleration });
          }
        }
      }
    },100);
  }

  componentWillUnmount() {
    clearInterval(this.intReadAc);
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
