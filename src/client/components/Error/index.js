import React from 'react';
import styles from './index.css'

export default ({ kind }) => {
  const defaultMessage = <>
    Что то пошло<br/>не так
    <br/>
    <br/>
    попробуйте ещё<br/>раз
  </>;

  let connectionErrorMessage = <>
    Нет связи
  </>;

  let accelerationErrorMessage = <>
    Устройство <br/>не поддерживается
    <br/>
    :(
  </>;

  let message = defaultMessage;
  if (kind === 'connection') {
    message = connectionErrorMessage;
  } else if (kind === 'acceleration') {
    message = accelerationErrorMessage;
  }

  return (
    <div className={styles.error}>
      <div className={styles.message}>
        { message }
      </div>
    </div>
  )
}
