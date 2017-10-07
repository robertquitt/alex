const mongoClient = require('mongodb').MongoClient,
      assert = require('assert');

const defaultUrl = 'mongodb://mangoman:knave@ds064198.mlab.com:64198/project-alex';

class DB {
  constructor(url = defaultUrl) {
    console.log(url);
    this.url = url;
    this.mongoClient = mongoClient;
    mongoClient.connect(this.url, function(err, db) {
      assert.equal(null, err);
      console.log('Connected successfully to server');
      db.collection('users');
      db.collection('transactions');
      db.collection('financialRisk');

      db.close();
    });
  }

  //Callback signature: function(boolean)
  checkUserExists(id, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      var cursor = db.collection('users').find({
          id: id
      });
      cursor.count((err, count) => {callback(count != 0); console.log(err, count)});
      db.close();
    });
  }

  //Callback signature: function()
  addUser(user, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      var cursor = db.collection('users').insertOne(user);
      db.close();
      callback();
    });
  }
}

export default DB;
export {DB};
