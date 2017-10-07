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
  });
}

export default addApi;
export {addApi};
