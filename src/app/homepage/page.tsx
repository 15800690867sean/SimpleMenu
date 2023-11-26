'use client';

import React, { Component } from 'react';
import ButtonList from './components/buttonList/buttonList';
import './index.css';

export default class page extends Component {
  render() {
    return (
      <div className='page'>
        <ButtonList></ButtonList>
      </div>
    )
  }
};
