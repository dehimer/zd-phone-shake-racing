import React from 'react';

import styles from './index.css';

import ScreenName from '../ScreenName';

export default function SelectPerson({ persons, select }) {
  // console.log('SelectPerson');
  // console.log(persons);

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
                <img src={`public/avatars/${avatar}`}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
