const Promise = require('bluebird');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

const DEFAULT_OPTIONS = {
  poolSize: 10,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  ignoreUndefined: true,
};


/**
 * Mongo connection
 */
class MongoConnection {
  /**
   * @param {Object} options - Mongo connection string + options
   * @param {String[]} options.hosts - Hosts
   * @param {Number} options.port - Port
   * @param {String} options.database - Database name
   * @param {String} [options.user] - Username
   * @param {String} [options.password] - Password
   * @param {String} [options.replicaSet] - Replica set name
   * @param {Object} [options.options] - Additional options
   */
  constructor(options) {
    const hostsList = options.hosts.map(host => `${host}:${options.port}`).join(',');
    this.ObjectID = ObjectID;
    this._DB_NAME = options.database;
    this._url = `mongodb://${options.user}:${options.password}@${hostsList}/${this._DB_NAME}?readOnly=true${options.replicaSet && `&replicaSet=${options.replicaSet}`}`;
    this._options = {...DEFAULT_OPTIONS, ...options.options};
  }

  /**
   * Connect to specific database asynchronously
   * @return {Promise<Object>}
   */
  async connect() {
    try {
      const client = await MongoClient.connect(this._url, this._options);
      return client.db(this._DB_NAME);
    } catch (err) {
      console.log(err, 'CONNECT_ERROR');
      throw err;
    }
  }
}


module.exports = MongoConnection;
