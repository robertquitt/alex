const mongoClient = require('mongodb').MongoClient,
      assert = require('assert');

const defaultUrl = 'mongodb://mangoman:knave@ds064198.mlab.com:64198/project-alex';

class DB {
  constructor(url = defaultUrl) {
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
      cursor.count((err, count) => callback(count != 0));
      db.close();
    });
  }

  //Callback signature: function()
  addUser(user, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      db.collection('users').insertOne(user);
      db.close();
      callback();
    });
  }

  //Callback signature: function(user)
  getUser(id, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      db.collection('users').findOne({id: id}, {}).then((user) => callback(user));
      db.close();
    });
  }

  //Callback signature: function()
  addGoal(goal, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      goal.id = new Date().getTime();
      db.collection('goals').insertOne(goal);
      db.close();
      callback();
    });
  }

  //Callback signature: function(goal)
  getGoal(goal, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      db.collection('goals').findOne({id: goal.id, userId: goal.userId}, {}).then((goal) => callback(goal));
      db.close();
      callback();
    });
  }

  //Callback signature: function(goals)
  getGoals(userId, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      db.collection('goals').find().toArray().then((goals) => callback(goals));
    });
  }

  //Callback signature: function()
  editGoal(goal, callback) {
    this.mongoClient.connect(this.url, function(err, db) {
      db.collection('goals').findOneAndReplace({id: goal.id, userId: goal.userId}, goal);
      db.close();
      callback();
    });
  }
}

export default DB;
export {DB};
