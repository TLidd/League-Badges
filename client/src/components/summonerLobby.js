import { useLocation, useParams, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react";
import SummonerCard from "./SummonerCard"
import "../Stylesheets/SummonerLobby.css"

const SummonerLobby = () => {

    let {name} = useParams();
    let [lobby, setLobby] = useState(null);
    let [gameActive, setActive] = useState(false);
    let [gameChecked, setGameChecked] = useState(false);

    let[team1Layout, setTeam1] = useState(null);
    let[team2Layout, setTeam2] = useState(null);
    
    const navigate = useNavigate();

    const SummonerPage = (e) => {
        navigate(`/${name}`);
    }

    useEffect(() => {
        fetch("/summonerGame", {
            method: "POST" ,
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: name}),
        })
        .then(res => {
            if(!res.ok){
            throw Error("Error posting to server");
            }
            return res.json();
        })
        .then(data => {
            if('status' in data){
                setGameChecked(true);
                console.log(data);
                if(data.status.status_code === 404){
                    throw Error("No data found");
                }
                if(data.status.status_code === 429){
                    throw Error("Api limit reached");
                }
            }
            else{
                setLobby(data);
                setActive(true);
            }
        })
        .catch(err => {
            console.log(err.message);
        })
    }, [name])

    useEffect(() => {
        if(lobby !== null){
            const team1 = lobby.participants.slice(0,5);
            const team2 = lobby.participants.slice(5,11);
            setTeam1(team1.map((summoner) => (
                <div className="column" key={summoner.summonerName}>
                    <SummonerCard sumName = {summoner.summonerName} />
                </div>
            )));
            setTeam2(team2.map((summoner) => (
                <div className="column" key={summoner.summonerName}>
                    <SummonerCard sumName = {summoner.summonerName} />
                </div>
            )));
            setLobby(null);
        }
    }, [lobby]);

  return (
    <div>
        {gameActive === true &&
            <div>
                Team 1
                <div className="row" style={{paddingBottom: "10%"}}>
                    <div className="column-container">
                        {team1Layout}
                    </div>
                </div>
                Team 2
                <div className="row">
                    <div className="column-container">
                        {team2Layout}
                    </div>
                </div>
            </div>    
        }
        
        <div>
            {gameChecked === true &&
                <div>
                    <p>
                        {name} is not in an active game
                    </p>
                    <button onClick={SummonerPage}>View Summoner's Page</button>
                </div>
            }
        </div>
    </div>
    
  )
}

export default SummonerLobby