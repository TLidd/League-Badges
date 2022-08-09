import express from 'express'
import bodyParser from 'body-parser'
import { getCurrentGame, getLobbyData, getPlayerHistory, getSummoner, getLobbyNames } from './riotApiCalls.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from 'path';
import cors from 'cors';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsVal = cors();
app.use(corsVal);

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/getSummoner', (req, res) =>{
  let sumName = req.body['user'];
  getSummoner(sumName).then(data => res.json(data));
});

app.post('/summonerGame', (req, res) => {
  let sumName = req.body['user'];
  getCurrentGame(sumName).then(data => {
    res.json(data);
  });
});

app.post('/summonerHistory', (req, res) => {
  let sumName = req.body['user'];
  getPlayerHistory(sumName).then(data => {
    res.json({player: data});
  })
});

app.post('/summonerLobby', (req, res) => {
  let sumName = req.body['user'];
  getLobbyData(sumName).then(data => {
    res.json(data);
  });
})

app.get('/summonerData/:name', (req, res) => {
  let sumName = req.params.name;
  getPlayerHistory(sumName).then(data => {
    res.json(data);
  });
})

app.get('/lobbyData/:name', (req, res) => {
  let sumName = req.params.name;
  getLobbyData(sumName).then(data => {
    res.json(data);
  });
})

app.get('/getLobbyList/:name', (req, res) => {
  let sumName = req.params.name;
  getLobbyNames(sumName).then(data => {
    res.json(data);
  });
})

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});