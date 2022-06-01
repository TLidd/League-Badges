const summonerCard = (props) => {

  return (
    <div>
        <div>
            {props.summoner.summonerName}
        </div>
        <div>
            <img width= {props.summoner.profileIconId ? "100" : "0"} height= {props.summoner.profileIconId ? "100" : "0"} padding= {props.summoner.profileIconId ? "10" : "0"}
            src={sumInfo.sumIcon ? `http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${props.summoner.profileIconId}.png` : ''} alt=''/>
        </div>
            <img width= {props.summoner.profileIconId ? "100" : "0"} height= {props.summoner.profileIconId ? "100" : "0"} padding= {props.summoner.profileIconId ? "10" : "0"}
            src={sumInfo.sumIcon ? `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.summoner.championId}0.jpg` : ''} alt=''/>
    </div>
  )
}

export default summonerCard