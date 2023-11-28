'use client';

import React, { ChangeEvent, Component } from 'react';
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
    }
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
      fetch(`http://localhost:3000/api/menuData`, {
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
        alert(`JSON request failed: ${error.message}`);
      });
    } else if (this.state.activeIdx === 0) {
      this.setState({ buttons: btnArr });
    };
  }

  // change the menu according to the JSON data and clicks
  changeMenu = (key: string): void => {
    this.currentButtonTree = this.currentButtonTree[key];
    this.setState({
      buttons: Object.keys(this.currentButtonTree),
    });
  };

  // reset the menu with the origin JSON data obtained from the api
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
  };

  // handle the JSON file uploaded by user
  handleUpload = (files: FileList | null): void => {
    if (!files) {
      alert('The file is invalid')
      return;
    };
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileStr = event.target?.result as string || '';
      const jsonObj = JSON.parse(fileStr);
      this.buttonTree = jsonObj;
      this.currentButtonTree = jsonObj;
      // set the buttons according to the initial JSON
      this.setState({ buttons: Object.keys(this.currentButtonTree) });
    };
  };

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
              marginBottom: '2vh',
            }}
            onClick={this.handleReset}
          >
            Reset the menu
          </p>
        }
        {activeIdx === 1 && 
          <input onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleUpload(e.target.files)} type="file" title='uploader' accept='application/json' />
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
