import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Input, Dropdown} from 'yui-md/lib/Input';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';
import {transactionCategories} from './options';
import {iourl} from 'static/configs/static';

/*
  Props:
  - editing <boolean>: editing mode or not
  - id <int>: id of transaction
*/
class NewTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.bindAllMethods();
    window.socket = window.socket || io(iourl);
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
    if (props.match && props.match.params && props.match.params.id) {
      this.editing = true;
    }
    if (props.editing || this.editing) {
      var id = parseInt(props.match.params.id);
      window.socket.emit('getTransaction', {id: id, userId: FB.getUserID()});
    }
    window.socket.on('getTransaction', (transaction) => {
      if (transaction) {this.setState({newTransactionData: transaction})}
    });
    window.socket.on('redirectTransactions', () => {
      this.props.history.push('/transactions');
    });
    this.state = {
      newTransactionData: {
        type: 'personal'
      }
    };
  }

  tryCreateNewTransaction() {
    let newTransactionData = this.state.newTransactionData;
    newTransactionData.userId = FB.getUserID();
    newTransactionData.timestamp = new Date();
    window.socket.emit('newTransaction', newTransactionData);
  }

  tryEditTransaction() {
    let newTransactionData = this.state.newTransactionData;
    newTransactionData.userId = FB.getUserID();
    window.socket.emit('editTransaction', newTransactionData);
  }

  tryDeleteTransaction() {
    let newTransactionData = this.state.newTransactionData;
    newTransactionData.userId = FB.getUserID();
    window.socket.emit('deleteTransaction', newTransactionData);
  }

  changeValue(field, newValue) {
    let newTransactionData = this.state.newTransactionData;
    newTransactionData[field] = newValue;
    this.setState({newTransactionData: newTransactionData});
  }

  render() {
    return (
      <div className={'new-transaction'}>
        <h3 className={'centered'}>{this.props.editing || this.editing ? 'Edit Transaction' : 'Create a New Transaction'}</h3>
        <Row>
          <Col xs={12}>
            <Input label={'Transaction'} value={this.state.newTransactionData.transaction}
              changeValue={(newValue) => this.changeValue('transaction', newValue)}/>
          </Col>
          <Col xs={6}>
            <Input label={'Cost'} value={this.state.newTransactionData.cost}
              changeValue={(newValue) => this.changeValue('cost', parseInt(newValue))}/>
          </Col>
          <Col xs={6}>
            <Dropdown label={'Type'} options={transactionCategories} selected={this.state.newTransactionData.type}
              setSelected={(newValue) => this.changeValue('type', newValue)}/>
          </Col>
        </Row>
        <div style={{height: '30px'}}/>
        <Row>
          <Col xs={2}>
          </Col>
          <Col xs={4}>
            <Button onClick={this.props.editing || this.editing ? this.tryEditTransaction : this.tryCreateNewTransaction}>
              {this.props.editing || this.editing ? 'Submit' : 'Create'}
            </Button>
          </Col>
          <Col xs={4}>
            <Button onClick={this.props.editing || this.editing ? this.tryDeleteTransaction : () => this.props.history.push('/home')}>
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

NewTransaction = withRouter(Guac(NewTransaction));

export default NewTransaction;
export {NewTransaction};
