import fetch from 'node-fetch';
import {apiCallKey} from "./riotApiKey.js"

export function getSummoner(summonerName){
    return fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`)
    .then(res => res.json());
}


