//checks if summoner is in an active game
import { useNavigate } from "react-router-dom"
import usePostFetch from "./usePostFetch";
import "../Stylesheets/ActiveGame.css"

const ActiveGame = ({sumName}) => {

    const {data} = usePostFetch("/getSummoner", sumName);
    const navigate = useNavigate();

    const SummonerPage = (e) => {
        navigate(`/${data.name}`);
    }

    const SumForm = (e) => {
        navigate("/");
    }

    return (
        <>
        {
            data && data?.name &&
            <div className="center">
                <p className="text">
                    {data.name} is not in an active game
                </p>
                <button className="button" onClick={SummonerPage}>View Summoner's Page</button>
            </div> 
        }
        {
            data && !data?.name &&
            <div className="center">
                <p className="text">
                    {sumName.user} does not exist
                </p>
                <button className="button" onClick={SumForm}>Search New Summoner</button>
            </div>
        
        }
        </>
    )
}

export default ActiveGame