import React from 'react';

import styles from './index.css';

// import ScreenName from '../ScreenName';

export default function SelectPerson({ persons, select }) {
  return (
    <div className={styles.selectPerson}>
      <div className={styles.title}>Выберите инструмент</div>
      <div className={styles.persons}>
        {
          persons && persons.map(({ id, avatar, name }) => (
            <div
              key={id}
              className={styles.person}
              onClick={() => select(id)}
            >
              <img src={`/public/theme/avatars/${avatar}`}/>
              <div className={styles.name}>{name}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
