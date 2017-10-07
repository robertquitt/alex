import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';
import {Login} from 'react-facebook';

import io from 'socket.io-client';

import {LoginButton} from '../../Assets/LoginButton';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    window.socket = window.socket || io('localhost:9080');
    window.socket.on('userExists', (data) => {
      console.log(data);
      if (data.exists) {
        this.props.history.push('/home');
      } else {
        this.props.history.push('/newuser');
      }
    });
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <div className={'login-page'}>
        <div style={{height: '20px'}}/>
        <h2 className='centered'>
          Alex
        </h2>
        <h4 className='centered'>
          Your AI-Powered Financial Advisor
        </h4>
        <div style={{height: '80px'}}/>
        <LoginButton verbose/>
      </div>
    );
  }
}

LoginPage = withRouter(Guac(LoginPage));

export default LoginPage;
export {LoginPage};
