import express from 'express';
import MongoConnection from './src/config/mongo_setup.js';
import setRoutes from './src/config/routes.js';


const app = express();
const connection = MongoConnection.getInstance();

app.use(express.json());

setRoutes(app);

app.use('/uploads', express.static('uploads'));

app.addListener('close', async () => {
  console.log('closing mongo connection');
  await connection.closeConnection();
  console.log('closed mongo connection');
  console.log('closing express connection');
})

app.listen(3000, () => {
  console.log('server is on');
});