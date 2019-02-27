import React from 'react';
import SVG from 'react-inlinesvg';

import styles from "./index.css";

export default ({ back, color }) => (
  <div className={styles.title}>
    <div className={styles.top}>
      <div className={back ? styles.arrow : styles.left} onClick={back ? back : ()=>{}}>
        {
          back
            ? <img alt='back' src={`/public/theme/arrow_${color}.svg`} />
            : <img alt='f6' src={`/public/theme/decoration/F-6.png`} />
        }
      </div>
      <div className={styles.center}>
        <img src={'/public/theme/title.svg'} />
      </div>
      <div className={styles.right}>
        <img src={'/public/theme/decoration/F-2.png'} />
      </div>
    </div>
    <div className={styles.bottom}>
      <img className={styles.bottom} src={'/public/theme/decoration/F-3.png'} />
    </div>
  </div>
)
