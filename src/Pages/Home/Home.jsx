import * as React from 'react';
import {withRouter} from 'react-router';

import {Guac} from 'guac-hoc/lib/Guac';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

import {sexOptions, ageOptions, raceOptions, livingOptions,educationOptions,
  workStatusOptions, citizenshipOptions, disabilityOptions} from '../NewUser/options';

class Home extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    window.socket = window.socket || io('localhost:80');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
    this.state = {
      user: {}
    };
    window.socket.on('getUser', (entity) => this.setEntity(entity));
    window.socket.emit('getUser', {id: FB.getUserID()});
  }

  setEntity(entity) {
    this.setState({user: entity});
  }

  render() {
    return (
      <div className={'home'}>
        <h3 className={'centered'}>Welcome back, {this.state.user.name}</h3>
        <div style={{height: '10px'}}/>
        <h4 className={'centered'}>{this.state.user.country}</h4>
        <Row>
          <Col xs={12}>
            <p className={'centered'}>Monthly Income: ${this.state.user.income || 0}</p>
          </Col>
          <Col xs={12}>
            <p className={'centered'}>Age: {ageOptions[this.state.user.age] || 'Unknown'}</p>
          </Col>
          <Col xs={12}>
            <p className={'centered'}>Gender: {sexOptions[this.state.user.gender] || 'Unknown'}</p>
          </Col>
          <Col xs={12}>
            <p className={'centered'}>Race: {raceOptions[this.state.user.race] || 'Unknown'}</p>
          </Col>
          <div style={{height: '30px'}}/>
          <Col xs={2}>
          </Col>
          <Col xs={4}>
            <Button className={''} onClick={() => this.props.history.push('/newgoal')}>
              New Goal
            </Button>
          </Col>
          <Col xs={4}>
            <Button className={''} onClick={() => this.props.history.push('/goals')}>
              Goals
            </Button>
          </Col>
          <Col xs={2}>
          </Col>
          <Col xs={2}>
          </Col>
          <Col xs={4}>
            <Button className={''} onClick={() => this.props.history.push('/newtransaction')}>
              New Transaction
            </Button>
          </Col>
          <Col xs={4}>
            <Button className={''} onClick={() => this.props.history.push('/transactions')}>
              Transactions
            </Button>
          </Col>
          <Col xs={2}>
          </Col>
        </Row>

      </div>
    );
  }
}

Home = withRouter(Guac(Home));

export default Home;
export {Home};
