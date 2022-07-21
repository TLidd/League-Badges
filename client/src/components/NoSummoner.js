import { useEffect, useState } from "react";
import usePostFetch from "./usePostFetch";
import {Navigate} from "react-router-dom"

// check if summoner exists if not display does not exist
const NoSummoner = ({summonerName}) => {
    let [summonerExists, setExists] = useState(true);

    const {data} = usePostFetch("/getSummoner", summonerName);

    useEffect(() => {
        let timeEvent;
        if(data !== null){
            if(data?.name === undefined){
                setExists(false);
                timeEvent = setTimeout(() => {
                    setExists(true);
                }, 10000);
            }
        }
        return () => {
            clearTimeout(timeEvent);
        }
    }, [data]);

    return (
        <div>
            {!summonerExists && 
            <div className="noSummoner">
                {`${summonerName.user} does not exist`}
            </div>
            }
            {console.log(summonerExists)}
            {summonerExists && data?.name && <Navigate to={`/${data?.name}`} />}   
        </div>
    )
}

export default NoSummoner