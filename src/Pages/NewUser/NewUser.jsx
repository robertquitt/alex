import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Input, Dropdown} from 'yui-md/lib/Input';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

class NewUser extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      newUserData: {
      }
    };
    window.socket = window.socket || io('localhost:9080');
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
            <Input label={'Name'} changeValue={(newValue) => this.changeValue('name', newValue)}>
              {this.state.newUserData.name}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Country'} changeValue={(newValue) => this.changeValue('country', newValue)}>
              {this.state.newUserData.country}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Race'}
              changeValue={(newValue) => this.changeValue('race', newValue)}>
              {this.state.newUserData.race}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Family Situation'}
              changeValue={(newValue) => this.changeValue('family', newValue)}>
              {this.state.newUserData.housing}
            </Input>
          </Col>
          <Col xs={6}>
            <Input label={'Age'}
              changeValue={(newValue) => this.changeValue('age', newValue)}>
              {this.state.newUserData.age}
            </Input>
          </Col>
          <Col xs={6}>
            <Input label={'Gender'}
              changeValue={(newValue) => this.changeValue('gender', newValue)}>
              {this.state.newUserData.gender}
            </Input>
          </Col>
          <Col xs={6}>
            <Input label={'Income ($/month)'}
              changeValue={(newValue) => this.changeValue('income', newValue)}>
              {this.state.newUserData.income}
            </Input>
          </Col>
          <Col xs={6}>
            <Input label={'Education'}
              changeValue={(newValue) => this.changeValue('education', newValue)}>
              {this.state.newUserData.state}
            </Input>
          </Col>
          <Col xs={12}>
            <Input label={'Citizenship'}
              changeValue={(newValue) => this.changeValue('citizenship', newValue)}>
              {this.state.newUserData.citizenship}
            </Input>
          </Col>
          <Col xs={12}>
            <Input label={'Work Status'}
              changeValue={(newValue) => this.changeValue('workStatus', newValue)}>
              {this.state.newUserData.citizenship}
            </Input>
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
