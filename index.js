import express from 'express';
import MongoConnection from './mongo_setup.js';
import { ObjectId } from 'mongodb';


const app = express();
const connection = new MongoConnection();

app.listen(3000, () => {
  console.log('server is on');
});
app.use(express.json());

app.get('/movies', async (req, res) => {
  const movies = connection.db.collection('movies').find().limit(10);
  res.status(200);
  const responseArray = await movies.toArray();
  console.log(responseArray.length);
  res.json(responseArray);
})

app.get('/movies/:id', async (req, res) => {
  res.status(200);
  const movieId = req.params.id;
  const movie = await connection.db.collection('movies').findOne({ _id: new ObjectId(movieId) });
  console.log(movie);
  res.json(movie);
});

app.addListener('close', async () => {
  console.log('closing mongo connection');
  await connection.closeConnection();
  console.log('closed mongo connection');
  console.log('closing express connection');
})
