import { ObjectId } from 'mongodb';
import MongoConnection from '../config/mongo_setup.js';

export function getMoviesFromMongo() {
  const connection = MongoConnection.getInstance();
  return connection.db.collection('movies').find().limit(10);
}

export function getMovieFromMongo(movieId) {
  const connection = MongoConnection.getInstance();
  return connection.db.collection('movies').findOne({ _id: new ObjectId(movieId) });
}
