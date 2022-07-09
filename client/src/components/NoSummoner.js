import { useEffect, useState } from "react";
import usePostFetch from "./usePostFetch";

// check if summoner exists if not display does not exist
const NoSummoner = ({summonerName}) => {

    let [summonerExists, setExists] = useState(true);

    const {data} = usePostFetch("summonerPost", summonerName);

    useEffect(() => {
        if(data !== null){
            if(data?.name === undefined){
                setExists(false);
                setTimeout(() => {
                    setExists(true);
                }, 10000);
            }
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