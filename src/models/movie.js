import { ObjectId } from 'mongodb';
import MongoConnection from '../config/mongo_setup.js';

export async function getMoviesFromMongo() {
  const connection = MongoConnection.getInstance();
  return connection.db.collection('movies').find().limit(10);
}

export async function getMovieFromMongo(movieId) {
  const connection = MongoConnection.getInstance();
  return connection.db.collection('movies').findOne({ _id: new ObjectId(movieId) });
}

export async function postMovieToMongo(movie) {
  // handle image upload
  return MongoConnection.getInstance().db.collection('movies').insertOne(movie);
}

export async function updateMovieOnMongo(movieId, params) {
  // handle image update?
  return MongoConnection.getInstance().db.collection('movies').updateOne({
    _id: new ObjectId(movieId)
  }, {
    $set: params
  })
}

export async function deleteMovieOnMongo(movieId) {
  return MongoConnection.getInstance().db.collection('movies').deleteOne({ _id: new ObjectId(movieId) });
}