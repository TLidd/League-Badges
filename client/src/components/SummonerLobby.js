import { useParams } from "react-router-dom"
import {useState} from "react";
import {useQuery} from "@tanstack/react-query"
import SummonerCard from "./SummonerCard"
import "../Stylesheets/SummonerLobby.css"
import useGetFetch from "./useGetFetch";
import ActiveGame from "./ActiveGame";

const fetchLobby = async (name) => {
    const res = await fetch(`/lobbyData/${name}`);
    return res.json();
}

const SummonerLobby = () => {

    let {name} = useParams();

    let [sumUser] = useState({user: name});

    let lobby = useGetFetch(`/getLobbyList/${name}`);

    /*get the first user in the lobby to represent the game lead for the cache.
      this will allow the user to select someone in the same game to lookup active game
      and the data will still be cached for them */
    let gameLead = null;
    if(lobby?.data){
        gameLead = Object.values(lobby.data)[0]
    }

    const {data, isLoading} = useQuery(
        ["Lobby", gameLead],
        () => fetchLobby(sumUser.user),
        {
            staleTime: 150000,
            enabled: !!gameLead,
        }
    );

  return (
    <div style={{width:"100%"}}>
        {
            data?.team1 &&
            <div>
                Team1
                <div className="flexbox-container">
                    {
                    Object.values(data?.team1).map(player => {
                        return  <div className="flexbox-item" key={player.SummonerName}>
                                    <SummonerCard sumName= {player.SummonerName} sumRole= {player.Role} sumBadges= {player.badges} activeGame= {true}/>
                                </div>
                    })
                    }
                </div>
                Team2
                <div className="flexbox-container">
                    {
                    Object.values(data?.team2).map(player => {
                        return  <div className="flexbox-item" key={player.SummonerName}>
                                    <SummonerCard sumName= {player.SummonerName} sumRole= {player.Role} sumBadges= {player.badges} activeGame= {true}/>
                                </div>
                    })
                    }
                </div>
            </div>
        
        }
        {isLoading && <img className="loading-gif" src={require("../assets/loading2.gif")} alt="loading..." />}
        {!isLoading && !data && <ActiveGame sumName={sumUser}/>}

    </div>
    
  )
}

export default SummonerLobby