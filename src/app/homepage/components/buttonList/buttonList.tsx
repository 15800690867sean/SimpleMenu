'use client';

import React, { Component } from 'react';
import styles from './buttonList.module.css';
import ButtonItem from '../buttonItem/buttonItem';
import { btnArr } from '@/app/homepage/components/mockBtn';
import Link from 'next/link';

interface IProps {};

interface IState {
  activeIdx: number;
  isLogin: boolean;
};

export default class ButtonList extends Component<IProps, IState> {
  state = {
    activeIdx: 0,
    isLogin: false,
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

  componentDidMount(): void {
    const status = localStorage.getItem('loginStatus');
    if (status) {
      this.setState({
        isLogin: true,
      });
    };
  };

  handleLogout = (): void => {
    localStorage.removeItem('loginStatus');
    this.setState({
      isLogin: false,
    });
    alert('Logout Successfully!');
  }

  render() {
    const {
      activeIdx,
      isLogin,
    } = this.state;
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
          {isLogin 
          ? <ButtonItem
            btnName='logout'
            callback={this.handleLogout}
          />
          : <ButtonItem>
            <Link
              style={{
                display: 'block',
                height: '100%',
                width: '100%'
              }}
              href={'/login'}
            >
              login
            </Link>
          </ButtonItem>}
          {btnArr.map((item) => (
            <ButtonItem key={item} btnName={item} callback={() => {
              alert(`You clicked ${item}`)
            }}/>
          ))}
        </div>
      </div>
    )
  }
}
