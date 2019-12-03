const assert = require('assert');
const {MongoClient} = require('mongodb');
const {mongo} = require('./config');

const client = new MongoClient(
    mongo,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
);

client
    .connect()
    .catch(err => assert.ifError(err));

exports.db = client.db();
