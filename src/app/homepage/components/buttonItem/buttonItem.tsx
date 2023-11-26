'use client';

import React, { Component } from 'react';
import styles from './buttonItem.module.css';

interface IState {};

interface IProps {
  btnName?: string;
  callback?: () => void;
  children?: React.ReactNode;
};

export default class ButtonItem extends Component<IProps, IState> {
  render() {
    const { btnName, callback, children } = this.props;
    return (
      <div className={styles.item} onClick={() => callback ? callback() : null}>
        {btnName}
        {children}
      </div>
    )
  }
}
