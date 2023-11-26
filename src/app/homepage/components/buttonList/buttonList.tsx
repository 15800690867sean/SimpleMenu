'use client';

import React, { Component } from 'react';
import styles from './buttonList.module.css';
import ButtonItem from '../buttonItem/buttonItem';

export default class ButtonList extends Component {
  state = {
    activeIdx: 0,
  };

  options = [
    {
      title: 'Default mode',
      desc: 'All content is static, and the login information is stored locally'
    },
    {
      title: 'JSON mode',
      desc: 'All content is obtained from JSON, and the content may change based on your clicks'
    },
    {
      title: 'Database mode',
      desc: 'The login information is stored in the database'
    },
  ];

  render() {
    const {activeIdx} = this.state;
    return (
      <div className={styles.list}>
        <div className={styles.titleBar}>
          {this.options.map(
            (item, index) => 
              <div
                style={{
                  textDecoration: activeIdx === index ? 'underline' : '',
                  cursor: 'pointer',
                }}
                key={item.title}
                onClick={() => {
                  this.setState({
                    activeIdx: index,
                  })
                }}
              >
                {item.title}
              </div>
            )
          }
        </div>
        <h2 className={styles.welcome}>
          Welcome to the homepage
        </h2>
        <p style={{ marginBottom: '2vh' }}>{this.options[activeIdx].desc}</p>
        <div className={styles.body}>
          <ButtonItem></ButtonItem>
        </div>
      </div>
    )
  }
}
