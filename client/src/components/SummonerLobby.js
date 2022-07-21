import { useParams } from "react-router-dom"
import {useState} from "react";
import SummonerCard from "./SummonerCard"
import "../Stylesheets/SummonerLobby.css"
import usePostFetch from "./usePostFetch";
import ActiveGame from "./ActiveGame";

const SummonerLobby = () => {

    let {name} = useParams();

    let [sumUser] = useState({user: name});

    const {data, isPending} = usePostFetch("/summonerLobby", sumUser);

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
        {isPending && <img className="loading-gif" src={require("../assets/loading2.gif")} alt="loading..." />}
        {!isPending && !data && <ActiveGame sumName={sumUser}/>}

    </div>
    
  )
}

export default SummonerLobby