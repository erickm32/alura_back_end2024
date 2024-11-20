import fs from 'fs';
import { MongoClient, ServerApiVersion } from 'mongodb';

export default class MongoConnection {
  static #instance;
  
  static getInstance() {
    if (!this.#instance) {
      this.#instance = new MongoConnection()
    }
    return this.#instance;
  }

  get db() { return this.client.db('sample_mflix'); }

  constructor() {
    if (MongoConnection.#instance) {
      throw new Error("Use .getInstance to access the singleton connection");
    }

    const mongodbConnectionUri = this._setupCredentials();
    console.log(mongodbConnectionUri);
    this.client = new MongoClient(mongodbConnectionUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    this._run().then((_) => console.log('then')).catch(console.dir);
  }

  async closeConnection() {
    // Ensures that the client will close when you finish/error
    console.log('finnaly')
    await this.client.close();
  }

  async _run() {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db("sample_mflix").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }

  _setupCredentials() {
    try {
      return fs.readFileSync('mongo_access.txt', 'utf8');
    } catch (err) {
      console.error('Erro ao ler o arquivo:', err);
    }
  }
}

