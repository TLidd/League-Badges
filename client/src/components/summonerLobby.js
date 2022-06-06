import SummonerCard from "./SummonerCard"
const SummonerLobby = ({lobbyList}) => {
    const team1 = lobbyList.participants.slice(0,5);
    const team2 = lobbyList.participants.slice(5,11);
    const team1Layout = team1.map((summoner) => (
        <div key={summoner.summonerName}>
            <SummonerCard summoner = {summoner} />
        </div>
    ));

    const team2Layout = team2.map((summoner) => (
        <div key={summoner.summonerName}>
            <SummonerCard summoner = {summoner} />
        </div>
    ));

  return (
    <div>
        <div>
            -----------Team1-----------
            {team1Layout}
            ---------------------------
        </div>
        <div>
            -----------Team2-----------
            {team2Layout}
            ---------------------------
        </div>
    </div>
    
  )
}

export default SummonerLobby