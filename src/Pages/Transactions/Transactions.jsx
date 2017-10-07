import * as React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Chart} from 'chart.js';

import {Card, CardTextArea} from 'yui-md/lib/Card';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

const _u = require('underscore');

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

class Transactions extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    window.socket = window.socket || io('localhost:80');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
    this.state = {
      transactions: [],
      groupedTransactions: {}
    };
    window.socket.emit('getTransactions', {userId: FB.getUserID()});
    window.socket.on('getTransactions', (data) => {
      this.setState({transactions: data.transactions});
      let groupedTransactions = {};
      for (var i in data.transactions) {
        var transaction = data.transactions[i];
        var date = new Date(transaction.timestamp);
        var key = date.getFullYear() + ' ' + months[date.getMonth()];
        if (key in groupedTransactions) {
          groupedTransactions[key].push(transaction);
        } else {
          groupedTransactions[key] = [transaction];
        }
      }

      for (var key in groupedTransactions) {
        groupedTransactions[key] = groupedTransactions[key].reduce(function(a, b) {return a + b.cost}, 0);
      }

      this.setState({groupedTransactions: groupedTransactions});
      var xy = _u.unzip(_u.sortBy(_u.zip(Object.keys(groupedTransactions),
                                      Object.values(groupedTransactions)),
                                (arr) => arr[0]));
      var x = xy[0];
      var y = xy[1];
      setTimeout(() => new Chart(ReactDOM.findDOMNode(this.chartRef), {
        type: 'line',
        data: {
          labels: x,
          datasets: [{
            data: y,
            label: 'Expenses',
            borderColor: 'rgba(255, 0, 0, 1)'
          }]
        }
      }), 200);
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
          <canvas id="chart" ref={(ref) => this.chartRef = ref} width={'100%'} height={'50vh'}></canvas>
        </Row>
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
