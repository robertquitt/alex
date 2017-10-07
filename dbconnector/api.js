var mongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://mangoman:knave@ds064198.mlab.com:64198/project-alex';

mongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  db.close();
});
