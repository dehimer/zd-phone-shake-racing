import React from 'react';

import ScreenName from "../ScreenName";
import styles from './index.css'

export default ({ person }) => {
  return (
    <div className={styles.shaker}>
      <ScreenName name={<>Тряси<br/>и играй</>}/>
      <div className={styles.content}>
        <img src={`public/avatars/${person.avatar}`}/>
      </div>
    </div>
  )
}
