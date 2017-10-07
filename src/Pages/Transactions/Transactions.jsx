import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Card, CardTextArea} from 'yui-md/lib/Card';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

class Transactions extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    window.socket = window.socket || io('localhost:80');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
    this.state = {
      transactions: []
    };
    window.socket.emit('getTransactions', {userId: FB.getUserID()});
    window.socket.on('getTransactions', (data) => {
      this.setState({transactions: data.transactions});
    });
  }

  getTransactionComponents(transactions) {
    var transactionComponents = []
    for (var i in transactions) {
      var transaction = transactions[i];
      transactionComponents.push(
        <Card key={i}>
          <CardTextArea onClick={() => this.props.history.push('/transaction/' + transaction.id)}>
            <div>
              <p>
                <b>Transaction: </b>{transaction.transaction}&emsp;&emsp;&emsp;
                <b>Type: </b>{transaction.type}&emsp;&emsp;&emsp;
                <b>Cost: </b>{transaction.cost}&emsp;&emsp;&emsp;
              </p>
            </div>
          </CardTextArea>
        </Card>
      );
    }
    return transactionComponents;
  }

  render() {
    return (
      <div className={'transactions'}>
        <h3 className={'centered'}>Transactions</h3>
        <Row>
          <Col xs={0} sm={2}/>
          <Col xs={12} sm={8}>
            {this.getTransactionComponents(this.state.transactions)}
          </Col>
          <Col xs={0} sm={2}/>
        </Row>
        <div style={{height: '30px'}}/>
        <Row>
          <Col xs={3} md={4}/>
          <Col xs={6} md={4}>
            <Button className={'centered'} onClick={() => this.props.history.push('/home')}>
              Home
            </Button>
          </Col>
          <Col xs={3} md={4}/>
        </Row>
      </div>
    );
  }
}


Transactions = withRouter(Guac(Transactions));

export default Transactions;
export {Transactions};
