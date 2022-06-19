import { useEffect} from "react";
import { useParams } from "react-router-dom";
import "../Stylesheets/SummonerCard.css"

const SummonerCard = ({sumName}) => {
  let {name} = useParams();

  let summonerName = sumName;
  if(sumName === undefined){
    summonerName = name;
  }

  useEffect(() => {
    fetch("/summonerHistory", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: summonerName}),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
  });

  return (
    <div className="card" style={(name.toUpperCase() === summonerName.toUpperCase()) ? {color: "#FFD700"} : {color:"Grey"}}>
      {summonerName}
    </div>
  )
}

export default SummonerCard