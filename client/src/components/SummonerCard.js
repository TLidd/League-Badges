import { useParams, Link } from "react-router-dom";
import "../Stylesheets/SummonerCard.css"

const SummonerCard = ({sumName, sumRole, sumBadges, activeGame}) => {
  let {name} = useParams();

  let summonerName = sumName;
  if(sumName === undefined){
    summonerName = name;
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
              <img src={require(`../../public/roleIcons/${sumRole}.png`)} alt="Summoner Role" className="roleIcon"/>
              <div>
                {
                  Object.keys(sumBadges).map((badge) => {
                    return <div className={`${sumBadges[badge]}`} key={`${badge}`}>
                              {badge}
                            </div>
                  })
                }
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