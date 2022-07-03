import { useParams, useNavigate, useLocation } from "react-router-dom"
import {useEffect, useState} from "react";
import SummonerCard from "./SummonerCard"
import "../Stylesheets/SummonerLobby.css"
import usePostFetch from "./usePostFetch";

const SummonerLobby = () => {

    let {name} = useParams();

    let [team1Layout, setTeam1] = useState(null);
    let [team2Layout, setTeam2] = useState(null);

    let [inMatch, setInMatch] = useState(true);
    let [summonerExists, setSummonerExists] = useState(false);
    
    const navigate = useNavigate();

    const SummonerPage = (e) => {
        navigate(`/${name}`);
    }

    const {data, isPending, error} = usePostFetch("/summonerGame", {user: name});

    const sumInfo = usePostFetch("/summonerPost", {user: name});

    useEffect(() => {
        if(data !== null){

            if("status" in data){
                setInMatch(false);
                console.log(data.status.message);
                return;
            }

            const team1 = data.participants.slice(0,5);
            const team2 = data.participants.slice(5,11);
            setTeam1(team1.map((summoner) => (
                <div className="flexbox-item" key={summoner.summonerName}>
                    <SummonerCard sumName = {summoner.summonerName} createLink = {true}/>
                </div>
            )));
            setTeam2(team2.map((summoner) => (
                <div className="flexbox-item" key={summoner.summonerName}>
                    <SummonerCard sumName = {summoner.summonerName} createLink = {true}/>
                </div>
            )));
        }
    }, [data]);

    useEffect(() => {
        if(sumInfo.data != null){
            if('status' in sumInfo.data){
                console.log(sumInfo.data.status.message);
                return
            }
            setSummonerExists(true);
        }
    }, [sumInfo]);

  return (
    <div style={{width:"100%"}}>
        {data && inMatch &&
            <div>
                Team 1
                <div className="flexbox-container">
                    {team1Layout}
                </div>
                Team 2
                <div className="flexbox-container">
                    {team2Layout}
                </div>
            </div>    
        }
        
        <div>
            {!inMatch && summonerExists &&
                <div>
                    <p>
                        {sumInfo.data.name} is not in an active game
                    </p>
                    <button onClick={SummonerPage}>View Summoner's Page</button>
                </div>
            }
        </div>

        <div>
            {!summonerExists && !inMatch &&
                <p>Summoner does not exist</p>
            }
        </div>
    </div>
    
  )
}

export default SummonerLobby