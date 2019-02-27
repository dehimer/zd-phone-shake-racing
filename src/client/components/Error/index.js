import React, { Component } from 'react';
import Title from "../Title";

import styles from './index.css'


export default class Error extends Component {
  state = {};

  handleClick = () => {
    this.setState({ clicked: true });

    setTimeout(() => {
      location.reload(true);
    }, 300);
  };

  render() {
    const { kind } = this.props;
    const { clicked } = this.state;

    const defaultMessage = <>
      Что-то пошло<br/>не так
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
        <Title />
        <div className={styles.message}>
          { message }
        </div>
        <div className={styles.control}>
          <div className={styles.top}>
            <img src={'/public/theme/decoration/F-4.png'} />
          </div>

          <div className={clicked ? styles.buttonWhite : styles.button} onClick={this.handleClick}>
            <div className={styles.name}>Попробовать ещё раз</div>
            {
              clicked
                ? <img src={ '/public/theme/button_hover.svg'}/>
                : <img src={ '/public/theme/button.svg'}/>
            }
          </div>

          <div className={styles.bottom}>
            <div className={styles.left}>
              <img src={'/public/theme/decoration/F-5.png'} />
            </div>
            <div className={styles.right}>
              <img src={'/public/theme/decoration/F-1.png'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
