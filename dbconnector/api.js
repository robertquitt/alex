import DB from './dbconnector.js';
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
      db.addUser(user, () => {
        socket.emit('redirectHome', {});
      })
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
      console.log('getGoals');
      db.getGoals(userId, (goals) => {
        socket.emit('getGoals', {goals: goals});
      });
    });
  });
}

export default addApi;
export {addApi};
