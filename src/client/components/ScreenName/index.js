import React from 'react';

import styles from './index.css'

export default ({name}) => {
  return (
    <div className={styles.name}>
      { name }
    </div>
  )
}
