import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Input, Dropdown} from 'yui-md/lib/Input';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

import {sexOptions, ageOptions, raceOptions, livingOptions,educationOptions,
  workStatusOptions, citizenshipOptions, disabilityOptions} from './options';

class NewUser extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      newUserData: {
      }
    };
    window.socket = window.socket || io('localhost:80');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
  }

  tryCreateNewUser() {
    let newUserData = this.state.newUserData;
    newUserData.id = FB.getUserID();
    window.socket.emit('newUser', newUserData);
  }

  changeValue(field, newValue) {
    let newUserData = this.state.newUserData;
    newUserData[field] = newValue;
    console.log(newUserData);
    this.setState({newUserData: newUserData});
  }

  render() {
    return (
      <div className={'new-user'}>
        <h3 className={'centered'}>Alex says Hi!</h3>
        <p className={'centered title'}>Please enter this info for the best experience</p>
        <Row>
          <Col xs={12}>
            <Input label={'Name'} value={this.state.newUserData.name}
              changeValue={(newValue) => this.changeValue('name', newValue)}/>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Country'} value={this.state.newUserData.country}
              changeValue={(newValue) => this.changeValue('country', newValue)}/>
          </Col>
          <Col xs={6}>
            <Input label={'Income ($/month)'} value={this.state.newUserData.income}
              changeValue={(newValue) => this.changeValue('income', newValue)}/>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Race'}
              options={raceOptions}
              setSelected={(newValue) => this.changeValue('race', newValue)}
              selected={this.state.newUserData.race}>
              {this.state.newUserData.race}
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Family Situation'}
              options={livingOptions}
              setSelected={(newValue) => this.changeValue('family', newValue)}
              selected={this.state.newUserData.family}>
              {this.state.newUserData.family}
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Age'}
              options={ageOptions}
              setSelected={(newValue) => this.changeValue('age', newValue)}
              selected={this.state.newUserData.age}>
              {this.state.newUserData.age}
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Gender'}
              options={sexOptions}
              setSelected={(newValue) => this.changeValue('gender', newValue)}
              selected={this.state.newUserData.gender}>
              {this.state.newUserData.gender}
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Education'}
              options={educationOptions}
              setSelected={(newValue) => this.changeValue('education', newValue)}
              selected={this.state.newUserData.education}>
              {this.state.newUserData.education}
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Citizenship'}
              options={citizenshipOptions}
              setSelected={(newValue) => this.changeValue('citizenship', newValue)}
              selected={this.state.newUserData.citizenship}>
              {this.state.newUserData.citizenship}
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Work Status'}
              options={workStatusOptions}
              setSelected={(newValue) => this.changeValue('workStatus', newValue)}
              selected={this.state.newUserData.workStatus}>
              {this.state.newUserData.workStatus}
            </Dropdown>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Disability Status'}
              options={disabilityOptions}
              setSelected={(newValue) => this.changeValue('disability', newValue)}
              selected={this.state.newUserData.disability}>
              {this.state.newUserData.disability}
            </Dropdown>
          </Col>
        </Row>
        <div style={{height: '30px'}}/>
        <Button className={'centered'} onClick={this.tryCreateNewUser}>
          Join Us
        </Button>
      </div>
    );
  }
}

NewUser = withRouter(Guac(NewUser));

export default NewUser;
export {NewUser};
