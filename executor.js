const MongoConnection = require('mongo_connection');
const {DangerQueryError} = require('./utils/errors');

class Executor {
  constructor(options) {
    this._db = null;
    this._mongo = new MongoConnection(options);
    this._collection = {};
    this._COLLECTION_NAME = options.collectionName;
    this._restrictions = options.restrictions || {};
  }

  /**
   * Create collections and indexes
   * @return {Promise<void>}
   */
  async init() {
    console.log({methodName: 'init'}, 'Create mongodb connection');
    this._db = await this._mongo.connect();
    this._collection = this._db.collection(this._COLLECTION_NAME);
  }

  async execute(query) {
    const allPlansExecution = await this._collection.find(query).explain('allPlansExecution');
    let allow = false;
    if (!allow) {
      throw new DangerQueryError('DANGER_QUERY');
    }
    return this._collection.find(query);
  }
}

module.exports = Executor;
