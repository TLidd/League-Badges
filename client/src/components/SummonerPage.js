import { useNavigate } from "react-router-dom"

const SummonerPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button onClick={() => navigate(`./ActiveGame`)}>Back to active game</button>
    </div>
  )
}

export default SummonerPage
