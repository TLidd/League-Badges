import { useParams } from "react-router-dom";
import "../Stylesheets/SummonerCard.css"
import usePostFetch from "./usePostFetch";

const SummonerCard = ({sumName}) => {
  let {name} = useParams();

  let summonerName = sumName;
  if(sumName === undefined){
    summonerName = name;
  }

  const {data, isPending, Error} = usePostFetch("/summonerHistory", {user: summonerName});

  return (
    <div className="card" style={(name.toUpperCase() === summonerName.toUpperCase()) ? {color: "#FFD700"} : {color:"Grey"}}>
      {summonerName}
    </div>
  )
}

export default SummonerCard