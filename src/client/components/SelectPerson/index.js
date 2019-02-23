import React from 'react';
import { useDispatch } from 'redux-react-hook';

import styles from './index.css';

export default function SelectPerson({ persons }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.selectPerson}>
      <div className={styles.title}>
        Выберите<br/>инструмент
      </div>
      <div className={styles.personsWrapper}>
        <div className={styles.persons}>
          {
            persons.map(({ id, avatar }) => (
              <div
                key={id}
                className={styles.person}
                onClick={() => {
                  dispatch({
                    type: 'server/selectperson',
                    data: id
                  })
                }}
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
