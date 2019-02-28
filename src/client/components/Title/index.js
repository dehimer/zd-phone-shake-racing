import React from 'react';

import styles from "./index.css";

export default ({ back, color, red }) => (
  <div className={styles.title}>
    <div className={styles.top}>
      <div className={back ? styles.arrow : styles.left}>
        {
          back
            ? (
              <>
                <img alt='back' src={`/public/theme/arrow_${color}.svg`} />
                <div className={styles.arrowArea} onClick={back ? back : ()=>{}}/>
              </>
            )
            : <img alt='f6' src={`/public/theme/decoration/F-6.png`} />
        }
      </div>
      <div className={styles.center}>
        <img src={`/public/theme/title${red ? '_red' : ''}.svg`} />
      </div>
      <div className={styles.right}>
        <img src={'/public/theme/decoration/F-2.png'} />
      </div>
    </div>
    <div className={styles.bottom}>

      {
        !red
          ? <img className={styles.bottom} src={'/public/theme/decoration/F-3.png'} />
          : null
      }

    </div>
  </div>
)
