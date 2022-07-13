import { useEffect } from "react";
import usePostFetch from "./usePostFetch";

const SummonerData = ({summonerName}) => {
    // const {data} = usePostFetch("/summonerHistory", summonerName);

    // useEffect(() => {
    //     if(data?.name){
    //         console.log(`Summoner name: ${data.name}`)
    //     }
    // }, [data])
    console.log(summonerName)
}

export default SummonerData