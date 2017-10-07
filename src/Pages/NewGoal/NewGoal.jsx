import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Input, Dropdown} from 'yui-md/lib/Input';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';
import {goalCategories} from './options';


/*
  Props:
  - editing <boolean>: editing mode or not
  - id <int>: id of goal
*/
class NewGoal extends React.Component {
  constructor(props) {
    super(props);
    this.bindAllMethods();
    window.socket = window.socket || io('localhost:9080');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
    if (props.match && props.match.params && props.match.params.id) {
      this.editing = true;
    }
    if (props.editing || this.editing) {
      var id = parseInt(props.match.params.id);
      window.socket.emit('getGoal', {id: id, userId: FB.getUserID()});
    }
    window.socket.on('getGoal', (goal) => {
      if (goal) {this.setState({newGoalData: goal})}
    });
    window.socket.on('redirectGoals', () => {
      this.props.history.push('/goals');
    });
    this.state = {
      newGoalData: {
        type: 'personal'
      }
    };
  }

  tryCreateNewGoal() {
    let newGoalData = this.state.newGoalData;
    newGoalData.userId = FB.getUserID();
    window.socket.emit('newGoal', newGoalData);
  }

  tryEditGoal() {
    let newGoalData = this.state.newGoalData;
    newGoalData.userId = FB.getUserID();
    window.socket.emit('editGoal', newGoalData);
  }

  tryDeleteGoal() {
    let newGoalData = this.state.newGoalData;
    newGoalData.userId = FB.getUserID();
    window.socket.emit('deleteGoal', newGoalData);
  }

  changeValue(field, newValue) {
    let newGoalData = this.state.newGoalData;
    newGoalData[field] = newValue;
    this.setState({newGoalData: newGoalData});
  }

  render() {
    return (
      <div className={'new-goal'}>
        <h3 className={'centered'}>{this.props.editing || this.editing ? 'Edit Goal' : 'Create a New Goal'}</h3>
        <Row>
          <Col xs={12}>
            <Input label={'Goal'} value={this.state.newGoalData.goal}
              changeValue={(newValue) => this.changeValue('goal', newValue)}/>
          </Col>
          <Col xs={6}>
            <Input label={'Cost'} value={this.state.newGoalData.cost}
              changeValue={(newValue) => this.changeValue('cost', newValue)}/>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Type'} options={goalCategories} selected={this.state.newGoalData.type}
              setSelected={(newValue) => this.changeValue('type', newValue)}/>
          </Col>
        </Row>
        <div style={{height: '30px'}}/>
        <Row>
          <Col xs={2}>
          </Col>
          <Col xs={4}>
            <Button onClick={this.props.editing || this.editing ? this.tryEditGoal : this.tryCreateNewGoal}>
              {this.props.editing || this.editing ? 'Submit' : 'New Goal'}
            </Button>
          </Col>
          <Col xs={4}>
            <Button onClick={this.props.editing || this.editing ? this.tryDeleteGoal : () => this.props.history.push('/home')}>
              {this.props.editing || this.editing ? 'Delete' : 'Home'}
            </Button>
          </Col>
          <Col xs={2}>
          </Col>
        </Row>
      </div>
    );
  }
}

NewGoal = withRouter(Guac(NewGoal));

export default NewGoal;
export {NewGoal};
