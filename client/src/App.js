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
    .then(res => {
      if(!res.ok){
        throw Error("Error posting to server");
      }
      return res.json();
    })
    .then(data => {
      if('status' in data){
        if(data.status.status_code === 404){
          throw Error("No data found");
        }
      }
      else{
        setLobby(data);
      }
    })
    .catch(err => {
      console.log(err.message);
    })
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
