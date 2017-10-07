import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';
import { Login } from 'react-facebook';

import {AppBar} from 'yui-md/lib/AppBar';
import {Tab} from 'yui-md/lib/Tab';
import {TabList} from 'yui-md/lib/TabList';
import {Menu} from 'yui-md/lib/Menu';
import {MenuItem} from 'yui-md/lib/MenuItem';
import logo from 'static/images/logos/logo.svg';

import {LoginButton} from '../Assets/LoginButton';

class Header extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      isActive: {
        aboutMenu: false,
        eventsMenu: false
      }
    };
  }

  setMenuActive(menuName, active) {
    let currentlyActive = typeof(active) === 'undefined' ? !this.state.isActive[menuName] : active;
    this.state.isActive[menuName] = currentlyActive;
    this.setState({isActive: this.state.isActive});
  }

  handleResponse(data) {
    console.log(data);
  }

  render() {
    return (
      <AppBar height={82}
        style={{paddingTop: '12px', boxSizing: 'border-box'}}
        className={'z-depth-1'}
        backgroundColor={'white'}>
        <a href={'/'}>
          <img style={{display: 'inline-block',
                        height: '40px',
                        marginBottom: '-8px'}}
                src={logo}/>
        </a>
        <h4 style={{display: 'inline-block'}}>&nbsp;&nbsp;Alex</h4>
        <LoginButton/>
      </AppBar>
    );
  }
}

Header = Guac(Header);

export default Header;
export {Header};
