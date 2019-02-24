import React from 'react';
import styles from './index.css'

export default () => (
  <div className={styles.error}>
    <div className={styles.message}>
      Что то пошло<br/>не так
      <br/>
      <br/>
      попробуйте ещё<br/>раз
    </div>
  </div>
)
