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
    this.state = {
      newGoalData: {
        type: 'personal'
      }
    };
    window.socket = window.socket || io('localhost:9080');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
    if (props.editing) { window.socket.emit('getGoal', {id: id});
    }
    window.socket.on('getGoal', (goal) => {
      this.setState(newGoalData: goal);
    });
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

  changeValue(field, newValue) {
    let newGoalData = this.state.newGoalData;
    newGoalData[field] = newValue;
    this.setState({newGoalData: newGoalData});
  }

  render() {
    return (
      <div className={'new-goal'}>
        <h3 className={'centered'}>Create a New Goal</h3>
        <Row>
          <Col xs={12}>
            <Input label={'Goal'} changeValue={(newValue) => this.changeValue('goal', newValue)}>
              {this.state.newGoalData.item}
            </Input>
          </Col>
          <Col xs={6}>
            <Input label={'Cost'} changeValue={(newValue) => this.changeValue('cost', newValue)}>
              {this.state.newGoalData.cost}
            </Input>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Type'} options={goalCategories} selected={this.state.newGoalData.type}
              setSelected={(newValue) => this.changeValue('type', newValue)}/>
          </Col>
        </Row>
        <div style={{height: '30px'}}/>
        <Row>
          <Button className={'centered'} onClick={this.tryCreateNewGoal}>
            {this.props.editing ? 'Submit Changes' : 'New Goal'}
          </Button>
        </Row>
      </div>
    );
  }
}

NewGoal = withRouter(Guac(NewGoal));

export default NewGoal;
export {NewGoal};
