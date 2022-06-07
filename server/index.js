import express from 'express'
import bodyParser from 'body-parser'
import { getCurrentGame, getPlayerHistory, getSummoner } from './riotApiCalls.js';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) =>{
    res.json({message: "This is a message from the server"});
});

app.post('/summonerPost', (req, res) =>{
  let sumName = req.body['user'];
  getSummoner(sumName).then(data => res.json(data));
});

app.post('/summonerGame', (req, res) => {
  let sumName = req.body['user'];
  getCurrentGame(sumName).then(data => {res.json(data)});
});

app.post('/summonerHistory', (req, res) => {
  let sumName = req.body['user'];
  let json = getPlayerHistory(sumName);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});