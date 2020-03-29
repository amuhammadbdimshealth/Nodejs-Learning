const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = `mongodb+srv://amuhammad:24Aug1989@arif-cluster0-r4goo.mongodb.net/shop?retryWrites=true&w=majority`
let _db; // to store the connection. Initially its undefined

// Creates the connection to the server once
const mongoConnect = callback => {
  mongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
      console.log('Connected to the server');
      // callback(client);
      _db = client.db(); //_db holds the connection
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    })
};

// getDb function is called by application components to get access to the database. 
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found'
}

/* From Documentation
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;