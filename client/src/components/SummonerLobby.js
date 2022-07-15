import { useParams } from "react-router-dom"
import {useState} from "react";
import SummonerCard from "./SummonerCard"
import SummonerData from "./SummonerData";
import "../Stylesheets/SummonerLobby.css"
import usePostFetch from "./usePostFetch";
import ActiveGame from "./ActiveGame";

const SummonerLobby = () => {

    let {name} = useParams();

    let [sumUser] = useState({user: name});

    const {data, isPending, error} = usePostFetch("/summonerLobby", sumUser);

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
        {/* {console.log(team1Layout)}
        {
            data && data?.gameId && 
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

        {data && !team1Layout && !team2Layout &&
            <ActiveGame sumName={sumUser} />
        } */}
        {isPending && <img className="loading-gif" src={require("../assets/loading2.gif")} alt="loading..." />}

    </div>
    
  )
}

export default SummonerLobby