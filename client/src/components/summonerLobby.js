import summonerCard from "./summonerCard"
const summonerLobby = (lobbyList) => {
    const team1 = lobbyList.participants.slice(0,6);
    const team2 = lobbyList.participants.slice(6,11);

    const team1Layout = team1.map((summoner) => {
        <div>
            <summonerCard summoner = {summoner} />
        </div>
    });

    const team2Layout = team2.map((summoner) => {
        <div>
            <summonerCard summoner = {summoner} />
        </div>
    })

  return (
    <div>
        {team1Layout}
    </div>
  )
}

export default summonerLobby