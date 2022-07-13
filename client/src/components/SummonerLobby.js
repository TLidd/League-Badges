import { useParams, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react";
import SummonerCard from "./SummonerCard"
import SummonerData from "./SummonerData";
import "../Stylesheets/SummonerLobby.css"
import usePostFetch from "./usePostFetch";
import ActiveGame from "./ActiveGame";

const SummonerLobby = () => {

    let {name} = useParams();

    let [sumUser] = useState({user: name});

    let [team1Layout, setTeam1] = useState(null);
    let [team2Layout, setTeam2] = useState(null);

    const {data} = usePostFetch("/summonerLobby", sumUser);
    
    console.log(data);

    // useEffect(() => {
    //     if(data?.gameId !== undefined){
    //         const team1 = data.participants.slice(0,5);
    //         const team2 = data.participants.slice(5,11);
    //         setTeam1(team1.map((summoner) => (
    //             //SummonerData({summonerName: summoner.summonerName})
    //             <div className="flexbox-item" key={summoner.summonerName}>
    //                 <SummonerCard sumName= {summoner.summonerName} activeGame= {true}/>
    //             </div>
    //         )));
    //         setTeam2(team2.map((summoner) => (
    //             //SummonerData({summonerName: summoner.summonerName})
    //             <div className="flexbox-item" key={summoner.summonerName}>
    //                 <SummonerCard sumName= {summoner.summonerName} activeGame= {true}/>
    //             </div>
    //         )));
    //     }
    // }, [data]);

  return (
    <div style={{width:"100%"}}>
        {
            data?.team1 &&
            <div>
                Team1
                <div className="flexbox-container">
                    {
                    Object.values(data?.team1).map(player => {
                        return  <div className="flexbox-item" key={player.summonerName}>
                                    <SummonerCard sumName= {player.summonerName} activeGame= {true}/>
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
    </div>
    
  )
}

export default SummonerLobby