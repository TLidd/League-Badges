const SummonerCard = ({summoner}) => {
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