import React, { Component } from 'react';
import Title from "../Title";

import styles from './index.css'


export default class Error extends Component {
  render() {

    return (
      <div className={styles.wifineeded}>
        <Title red={true}/>
        <div className={styles.top}>
          <img src={'/public/theme/decoration/F-4.png'} />
        </div>
        <div className={styles.message}>
          Пожалуйста,<br/>
          подключитесь<br/>
          к Wi-Fi<br/>
          <div className={styles.maslenica}>MASLENITSA</div>
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
    )
  }
}
