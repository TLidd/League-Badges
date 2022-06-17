import { useEffect} from "react";

const SummonerCard = ({summoner}) => {

  useEffect(() => {
    fetch("/summonerHistory", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: summoner.summonerName}),
    })
    .then(res => res.json())
    .then(data => console.log(data));
  });

  return (
    <div>
        <div>
            {summoner.summonerName}
        </div>
        <div>
            <img width="100" height="100" padding="10"
            src={`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${summoner.profileIconId}.png`} alt=''/>
        </div>
            {/* <img width="100" height="100" padding="10"
            src={`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/Aatrox.png${summoner.championId}_0.jpg`} alt=''/> */}
    </div>
  )
}

export default SummonerCard