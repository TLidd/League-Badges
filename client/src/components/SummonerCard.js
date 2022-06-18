import { useEffect} from "react";
import { useParams } from "react-router-dom";

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
    <div>
        <div style={(name.toUpperCase() === summonerName.toUpperCase()) ? {color:"white"} : {color:"Grey"}}>
            {summonerName}
        </div>
    </div>
  )
}

export default SummonerCard