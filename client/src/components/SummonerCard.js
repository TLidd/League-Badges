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

  const {data, isPending, Error} = usePostFetch("/summonerHistory", {user: summonerName});
  const sumInfo = usePostFetch("/summonerPost", {user: summonerName});

  let nameMatch = name.toUpperCase() === summonerName.toUpperCase();

  useEffect(() => {
    if(sumInfo.data != null){
        if('status' in sumInfo.data){
            console.log(sumInfo.data.status.message);
            return
        }
        setSummonerInfo(sumInfo.data.name);
    }
  }, [sumInfo]);

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
    </div>
  )
}

SummonerCard.defaultProps = {
  createLink: false,
  sumName: undefined,
}

export default SummonerCard