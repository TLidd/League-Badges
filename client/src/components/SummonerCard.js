import { useParams, Link } from "react-router-dom";
import "../Stylesheets/SummonerCard.css"

const SummonerCard = ({sumName, sumRole, sumBadges, activeGame}) => {
  let {name} = useParams();

  let summonerName = sumName;
  if(sumName === undefined){
    summonerName = name;
  }

  let badgeDescriptions = {
    Warder: "The Summoner's Vision Score",
    TowerDestroyer: "The Damage done to structures",
    CreepKiller: "The Summoner's creep score",
  }

  let nameMatch = name.toUpperCase() === summonerName.toUpperCase();
  let highlight = nameMatch ? "highlightSummoner" : "lobbyParticipant";

  return (
    <div className="card">
      <div className="namePlate">
        {activeGame ? 
          <Link to={`/${summonerName}`} className={`name ${highlight}`}>
            {summonerName} 
          </Link>
          :
          sumName
        }
      </div>
      <div>
        {sumRole && sumBadges && 
          <div>
              <img title="Most Played Role" src={require(`../../public/roleIcons/${sumRole}.png`)} alt="Summoner Role" className="roleIcon"/>
              <div className="grid-container">
                <div className="badges">
                  {
                      Object.keys(sumBadges).map((badge) => {
                        return <div title={badgeDescriptions[badge]} className={`${sumBadges[badge]} badge`} key={`${badge}`}>
                                    {badge}
                                </div>
                      })
                  }
                </div>
              </div>
          </div>
        }
      </div>
    </div>
  )
}

SummonerCard.defaultProps = {
  activeGame: false,
  sumName: undefined,
}

export default SummonerCard