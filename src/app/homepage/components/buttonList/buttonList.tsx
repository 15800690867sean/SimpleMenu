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
  buttons: string[]; 
};

export default class ButtonList extends Component<IProps, IState> {
  state = {
    activeIdx: 0,
    isLogin: false,
    buttons: btnArr,
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

  // Used to store the JSON obtained from the api --- JSON Mode
  buttonTree: Record<string, any> = {};

  // Used to store the current button tree according to the user clicks--- JSON Mode
  currentButtonTree: Record<string, any> = {};

  componentDidMount(): void {
    const status = localStorage.getItem('loginStatus');
    if (status) {
      this.setState({
        isLogin: true,
      });
    };
  };

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    // The mode is not changed
    if (prevState.activeIdx === this.state.activeIdx) {
      return;
    };
    // JSON Mode
    if (this.state.activeIdx === 1) {
      fetch("/api/menuData", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        const {data} = await res.json();
        this.buttonTree = data;
        this.currentButtonTree = data;
        // set the buttons according to the initial JSON
        this.setState({ buttons: Object.keys(this.currentButtonTree) });
      }).catch((error: Error) => {
        alert(`JSON request failed: ${error.message}`)
      });
    } else if (this.state.activeIdx === 0) {
      this.setState({ buttons: btnArr });
    };
  }

  changeMenu = (key: string): void => {
    this.currentButtonTree = this.currentButtonTree[key];
    this.setState({
      buttons: Object.keys(this.currentButtonTree),
    });
  };

  handleReset = (): void => {
    this.currentButtonTree = this.buttonTree;
    this.setState({
      buttons: Object.keys(this.currentButtonTree),
    });
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
      buttons,
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
        {activeIdx === 1 && 
        <p
          style={{
            color: 'red',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={this.handleReset}
        >
          Reset the menu
        </p>
        }
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
          {buttons.map((item) => (
            <ButtonItem key={item} btnName={item} callback={
              activeIdx === 1
                ? () => {
                  this.changeMenu(item);
                } 
                : () => {
                  alert(`You clicked ${item}`)
            }}/>
          ))}
        </div>
      </div>
    )
  }
}
