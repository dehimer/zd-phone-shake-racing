import React from 'react';

import styles from './index.css';

import ScreenName from '../ScreenName';

export default function SelectPerson({ persons, select }) {
  return (
    <div className={styles.selectPerson}>
      <ScreenName name={<>Выберите<br/>инструмент</>}/>
      <div className={styles.personsWrapper}>
        <div className={styles.persons}>
          {
            persons && persons.map(({ id, avatar }) => (
              <div
                key={id}
                className={styles.person}
                onClick={() => select(id)}
              >
                <img src={`/public/theme/avatars/${avatar}`}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
