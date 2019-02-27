import React, { Component } from 'react';

import styles from './index.css';
import Title from "../Title";

export default class SelectPerson extends Component {
  state = {
    selectedId: null
  };

  preSelectPerson(id) {
    const { selectedId } = this.state;
    if (!selectedId) {
      console.log(`preSelectPerson ${id}`);
      this.setState({ selectedId: id });

      setTimeout(() => {
        this.setState({ selectedId: null });
        const { select } = this.props;
        select(id);
      }, 350);
    }
  };

  render() {
    const { selectedId } = this.state;
    const { persons } = this.props;

    return (
      <div className={styles.selectPerson}>
        <Title />
        <div className={styles.title}>Выберите инструмент</div>
        <div className={styles.persons}>
          {
            persons && persons.map(({ id, avatar, name }) => (
              <div
                key={id}
                className={selectedId === id ? styles.personSelected : styles.person}
                onClick={() => this.preSelectPerson(id)}
              >
                <img src={`/public/theme/avatars/${avatar}`} />
                <div className={styles.name}>{name}</div>
              </div>
            ))
          }
        </div>
        <div className={styles.bottom}>
          <div className={styles.first}>
            <img className={styles.left} src={`/public/theme/decoration/F-5.png`} />
            <img className={styles.right} src={`/public/theme/decoration/F-1.png`} />
          </div>
          <div className={styles.second}>
            <img className={styles.left} src={`/public/theme/decoration/F-4.png`} />
            <img className={styles.right} src={`/public/theme/decoration/F-7.png`} />
          </div>
        </div>
      </div>
    )
  }
}
