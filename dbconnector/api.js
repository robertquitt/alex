import DB from './dbconnector.js';
import {spawn} from 'child_process';
var db = new DB();

function addApi(server) {
  var io = require('socket.io')(server);

  //On connection, bind to socket.
  io.on('connection', function(socket) {
    socket.on('checkUserExists', function(data) {
      var id = data.id;
      db.checkUserExists(id, (doesExist) => {
        socket.emit('userExists', {exists: doesExist});
      });
    });

    socket.on('newUser', function(data) {
      var user = data;
      const riskScript = spawn('python3', [__dirname + '/../alexRiskFactor/calculatorScript.py', JSON.stringify(user)]);
      riskScript.stdout.on('data', (data) => {
        var riskJson = JSON.parse(data.toString('utf8'));
        user.riskBelow100 = riskJson.riskBelow100;
        user.riskBelow125 = riskJson.riskBelow125;
        user.riskBelow50 = riskJson.riskBelow50;
        db.addUser(user, () => {
          socket.emit('redirectHome', {});
        })
      });
      riskScript.stderr.on('data', (data) => {
        console.log(data.toString('utf8'));
      });
    });

    socket.on('getUser', function(data) {
      var id = data.id;
      db.getUser(id, (user) => {
        socket.emit('getUser', user);
      });
    });

    socket.on('newGoal', function(data) {
      var goal = data;
      db.addGoal(goal, () => {
        socket.emit('redirectHome', {});
      });
    });
    socket.on('getGoals', function(data) {
      var userId = data.userId;
      db.getGoals(userId, (goals) => {
        socket.emit('getGoals', {goals: goals});
      });
    });
    socket.on('getGoal', function(data) {
      var goal = data;
      db.getGoal(goal, (goal) => {
        socket.emit('getGoal', goal);
      });
    });
    socket.on('editGoal', function(data) {
      var goal = data;
      db.editGoal(goal, () => {
        socket.emit('redirectHome', {});
      });
    });
    socket.on('deleteGoal', function(data) {
      var goal = data;
      db.deleteGoal(goal, () => {
        socket.emit('redirectGoals', {});
      })
    });

    socket.on('newTransaction', function(data) {
      var transaction = data;
      db.addTransaction(transaction, () => {
        socket.emit('redirectHome', {});
      });
    });
    socket.on('getTransactions', function(data) {
      var userId = data.userId;
      db.getTransactions(userId, (transactions) => {
        socket.emit('getTransactions', {transactions: transactions});
      });
    });
    socket.on('getTransaction', function(data) {
      var transaction = data;
      db.getTransaction(transaction, (transaction) => {
        socket.emit('getTransaction', transaction);
      });
    });
    socket.on('editTransaction', function(data) {
      var transaction = data;
      db.editTransaction(transaction, () => {
        socket.emit('redirectHome', {});
      });
    });
    socket.on('deleteTransaction', function(data) {
      var transaction = data;
      db.deleteTransaction(transaction, () => {
        socket.emit('redirectTransactions', {});
      })
    });
  });
}

export default addApi;
export {addApi};
