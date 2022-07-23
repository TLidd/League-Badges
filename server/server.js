import express from 'express'
import bodyParser from 'body-parser'
import { getCurrentGame, getLobby, getPlayerHistory, getSummoner } from './riotApiCalls.js';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) =>{
    res.json({message: "This is a message from the server"});
});

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
  getLobby(sumName).then(data => {
    res.json(data);
  });
})

app.get('/lobby/:name', (req, res) => {
  let sumName = req.params.name;
  getLobby(sumName).then(data => {
    res.json(data);
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});