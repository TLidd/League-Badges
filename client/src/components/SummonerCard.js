import { useParams, Link } from "react-router-dom";
import "../Stylesheets/SummonerCard.css"
import usePostFetch from "./usePostFetch";
import { useState, useEffect } from "react";

const SummonerCard = ({sumName, createLink}) => {
  let {name} = useParams();

  let summonerName = sumName;
  if(sumName === undefined){
    summonerName = name;
  }

  let [summonerInfoName, setSummonerInfo] = useState(null);
  let [playerBadges, setBadges] = useState(null);
  let [playerRole, setRole] = useState(null);

  const {data, isPending, Error} = usePostFetch("/summonerHistory", {user: summonerName});

  const sumInfo = usePostFetch("/summonerPost", {user: summonerName});

  let nameMatch = name.toUpperCase() === summonerName.toUpperCase();

  useEffect(() => {
    if(sumInfo.data != null){
        if('status' in sumInfo.data){
            console.log(sumInfo.data.status.message);
            return;
        }
        setSummonerInfo(sumInfo.data.name);
    }
  }, [sumInfo]);

  useEffect(() => {
    if(data != null){
        if('status' in data){
            console.log(data.status.message);
            return;
        }
        setRole(data.player.Role);

        let summonerBadges = data.player.badges;
        setBadges(Object.keys(summonerBadges).map((badge, index) => (
          <div key={index} style={{color: "rgb(0,250,0"}}>
              {`${badge}`}
          </div>
        )));
    }
  }, [data]);

  return (
    <div className="card">
      {createLink ? 
        <Link to={`/${summonerName}`} className={nameMatch ? "highlightSummoner" : "lobbyParticipant"}>
          {summonerName} 
        </Link>
        :
        summonerInfoName
      }
      {!summonerInfoName && !sumInfo.isPending && `${summonerName} does not exist`}
      <div>
        {data && playerRole && 
          <div>
              <div> {data.player.Role} </div>
              <div> {playerBadges} </div>
          </div>
        }
      </div>
    </div>
  )
}

SummonerCard.defaultProps = {
  createLink: false,
  sumName: undefined,
}

export default SummonerCard