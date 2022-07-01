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
  let highlight = nameMatch ? "highlightSummoner" : "lobbyParticipant";

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
        console.log(data);

        let summonerBadges = data.player.badges;
        setBadges(Object.keys(summonerBadges).map((badge, index) => (
          <div key={index} className={`${summonerBadges[badge]}`}>
              {`${badge}`}
          </div>
        )));
    }
  }, [data]);

  return (
    <div className="card">
      <div className="namePlate">
        {createLink ? 
          <Link to={`/${summonerName}`} className={`name ${highlight}`}>
            {summonerName} 
          </Link>
          :
          summonerInfoName
        }
      </div>
      {!summonerInfoName && !sumInfo.isPending && !sumName && `${summonerName} does not exist`}
      <div>
        {data && playerRole && 
          <div>
              <img src={require(`../../public/roleIcons/${playerRole}.png`)} alt="Summoner Role" className="roleIcon"/>
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