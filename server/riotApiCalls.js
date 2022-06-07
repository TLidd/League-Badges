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
    //from summoner name get their puuid
    const res = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`);
    const json = res.json();
    const puuid = json["puuid"];

    // from puuid get match id list
    const matchFetch = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${apiCallKey}`);
    const matchIds = await matchFetch.json();

    // use match id list to get game data for each match
    // const matchData = await matchIds.map(matchId => {
    //     fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`)
    // }) 
    // const matches = await Promise.all(matchData).then(match => {
    //     match.json();
    // })
    return matches;
}