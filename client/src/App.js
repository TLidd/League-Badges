import {useState} from "react"
import './App.css';
import SummonerLobby from "./components/SummonerLobby";

function App() {
  const [lobby, setLobby] = useState(null);
  const [sumName, setSummoner] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();

    fetch("/summonerGame", {
      method: "POST" ,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: sumName}),
    })
    .then(res => res.json())
    .then(data => {
      if(!data.hasOwnProperty('status')){
        setLobby(data)
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={formSubmit}>
            <div>
                <label htmlFor="summonerName">Summoner Name:</label>
            </div>
            <div>
                <input onChange={(e) => setSummoner(e.target.value)} type="text" id="summonerName"></input>
            </div>
            <div>
                <input type="submit" value="Find Summoner"></input>
            </div>
        </form>
        <div>
          {lobby ? <SummonerLobby lobbyList= {lobby} /> : ''}
        </div>
      </header>
    </div>
  );
}

export default App;
