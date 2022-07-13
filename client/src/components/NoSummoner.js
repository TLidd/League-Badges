import { useEffect, useState } from "react";
import usePostFetch from "./usePostFetch";

// check if summoner exists if not display does not exist
const NoSummoner = ({summonerName}) => {
    console.log("shouldnt be here")
    let [summonerExists, setExists] = useState(true);

    const {data} = usePostFetch("/summoner", summonerName);

    let timeEvent;

    useEffect(() => {
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
        </div>
    )
}

export default NoSummoner