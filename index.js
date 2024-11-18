import express from 'express';

const app = express();

app.listen(3000, () => {
  console.log('server is on');
});

app.get('/', (req, res) => {
  console.log(req, res);
  res.status(200);
  res.send('potato');
})