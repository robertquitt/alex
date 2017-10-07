import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Card, CardTextArea} from 'yui-md/lib/Card';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

class Goals extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    window.socket = window.socket || io('localhost:9080');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
    this.state = {
      goals: []
    };
    window.socket.emit('getGoals', {userId: FB.getUserID()});
    window.socket.on('getGoals', (data) => {
      console.log(data.goals);
      this.setState({goals: data.goals});
    });
  }


  getGoalComponents(goals) {
    console.log('hello');
    var goalComponents = []
    for (var i in goals) {
      var goal = goals[i];
      goalComponents.push(
        <Card key={i}>
          <CardTextArea onClick={() => this.props.history.push('/goal/' + goal.id)}>
            <div>
              <p>
                <b>Goal: </b>{goal.goal}&emsp;&emsp;&emsp;
                <b>Type: </b>{goal.type}&emsp;&emsp;&emsp;
                <b>Cost: </b>{goal.cost}&emsp;&emsp;&emsp;
              </p>
            </div>
          </CardTextArea>
        </Card>
      );
    }
    return goalComponents;
  }

  render() {
    return (
      <div className={'goals'}>
        <h3 className={'centered'}>Goals</h3>
        <Row>
          <Col xs={0} sm={2}/>
          <Col xs={12} sm={8}>
            {this.getGoalComponents(this.state.goals)}
          </Col>
          <Col xs={0} sm={2}/>
        </Row>
        <div style={{height: '30px'}}/>
        <Row>
          <Button className={'centered'} onClick={() => this.props.history.push('/home')}>
            Home
          </Button>
        </Row>
      </div>
    );
  }
}


Goals = withRouter(Guac(Goals));

export default Goals;
export {Goals};
