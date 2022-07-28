import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import {useQueries} from "@tanstack/react-query"
import SummonerCard from "./SummonerCard"
import "../Stylesheets/SummonerLobby.css"
import useGetFetch from "./useGetFetch";
import ActiveGame from "./ActiveGame";

const fetchPlayerData = async (name) => {
    const res = await fetch(`/summonerData/${name}`);
    return res.json();
}

const SummonerLobby = () => {
    let {name} = useParams();

    let [loading, setLoading] = useState(true);

    let lobby = useGetFetch(`/getLobbyList/${name}`);

    let gameParticipants = null;
    if(lobby?.data){
        gameParticipants = Object.values(lobby.data);
    }

    const lobbyQuery = useQueries({
        queries: lobby?.data ? gameParticipants.map(participant => {
            return {
                queryKey: ['summonerBadgeData', participant.toLowerCase()],
                queryFn: () => fetchPlayerData(participant),
                enabled: !!lobby,
            }
        }) : []
    })

    useEffect(() => {
        if(lobbyQuery){
            if(lobbyQuery.every(result => result.data)){
                if(lobbyQuery.length == 10){
                    if(!lobbyQuery.some(result => result.isLoading)){
                        setLoading(false);
                    }
                }
            }
        }
    }, [lobbyQuery])

    let team1 = [];
    let team2 = [];
    console.log(lobby);
    if(loading && !lobby.error){
        return <img className="loading-gif" src={require("../assets/loading2.gif")} alt="loading..." />
    }
    else if(!loading){
        if(lobbyQuery.length == 10){
            team1 = lobbyQuery.slice(0, 5);
            team2 = lobbyQuery.slice(5, 10);
        }
    }

  return (
    <div style={{width:"100%"}}>
        {
            team1.length != 0 && team2.length != 0 &&
            <div>
                Team1
                <div className="flexbox-container">
                    {
                    team1.map(player => {
                        return  <div className="flexbox-item" key={player.data.SummonerName}>
                                    <SummonerCard sumName= {player.data.SummonerName} sumRole= {player.data.Role} sumBadges= {player.data.badges} activeGame= {true}/>
                                </div>
                    })
                    }
                </div>
                Team2
                <div className="flexbox-container">
                    {
                    team2.map(player => {
                        return  <div className="flexbox-item" key={player.data.SummonerName}>
                                    <SummonerCard sumName= {player.data.SummonerName} sumRole= {player.data.Role} sumBadges= {player.data.badges} activeGame= {true}/>
                                </div>
                    })
                    }
                </div>
            </div>
        
        }
        {lobby.error && team1 != [] && team2 != [] && <ActiveGame searchedName={name} actualName={lobby.error?.summonerName}/>}

    </div>
    
  )
}

export default SummonerLobby