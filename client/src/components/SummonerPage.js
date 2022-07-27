import { useNavigate, useParams } from "react-router-dom"
import {useQuery} from "@tanstack/react-query"

const fetchPlayerData = async (name) => {
    const res = await fetch(`/summonerData/${name}`);
    return res.json();
}

const SummonerPage = () => {
    const navigate = useNavigate();

    let {name} = useParams();

    const {data, isLoading} = useQuery(
        ['summonerBadgeData', name.toLowerCase()],
        () => fetchPlayerData(name),
    )

  return (
    <div>
        <button onClick={() => navigate(`./ActiveGame`)}>Back to active game</button>
    </div>
  )
}

export default SummonerPage
