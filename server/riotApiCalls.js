import fetch from 'node-fetch';
import {apiCallKey} from "./riotApiKey.js"

export function getSummoner(summonerName){
    return fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`)
    .then(res => res.json());
}

export function getCurrentGame(summonerName){
    return getSummoner(summonerName).then(data => {
        return fetch(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data.id}?api_key=${apiCallKey}`)
        .then(res => res.json())
    });
}

export async function getPlayerHistory(summonerName){
    //get summoner puuid from name
    const res = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`);
    const json = await res.json();
    const puuid = json["puuid"];

    //get match id list from puuid
    const matchFetch = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${apiCallKey}`);
    const matchIds = await matchFetch.json();

    //get match data from each match id 
    //note when '{}' is used here the return needs to be explicit
    //the return is implicit if it is written like
    // const responses = await Promise.all(Object.values(matchIds).map(matchId => 
    //     fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`)
    // ));
    const responses = await Promise.all(Object.values(matchIds).map(matchId => {
        return fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`)
    }));
    const jsons = await Promise.all(responses.map(r => {
        return r.json()
    }));
    return jsons
}