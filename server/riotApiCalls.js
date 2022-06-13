import fetch from 'node-fetch';
import {apiCallKey} from "./riotApiKey.js"
import leaguePlayer from "./leaguePlayer.js"

export function getSummoner(summonerName){
    return fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getCurrentGame(summonerName){
    return getSummoner(summonerName).then(data => {
        return fetch(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data.id}?api_key=${apiCallKey}`)
        .then(res => res.json())
        .catch(err => console.log(err));
    });
}

export async function getPlayerHistory(summonerName){
    //get summoner puuid from name
    const res = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`)
                .catch(err => console.log(err));;
    const json = await res.json().catch(err => console.log(err));;
    const puuid = json["puuid"];

    //get match id list from puuid
    const matchFetch = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${apiCallKey}`)
                       .catch(err => console.log(err));
    const matchIds = await matchFetch.json().catch(err => console.log(err));

    //get match data from each match id 
    //note when '{}' is used here the return needs to be explicit
    //the return is implicit if it is written like
    // const matches = await Promise.all(Object.values(matchIds).map(matchId => 
    //     fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`)
    // ));
    let matches = await Promise.all(Object.values(matchIds).map(matchId => {
        return fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`);
    }))
    .catch(err => console.log(err));

    let matchjsons = await Promise.all(matches.map(r => {
        return r.json();
    }))
    .catch(err => console.log(err));

    let player = new leaguePlayer(summonerName, matchjsons);
    player.processData();
    player.printData();
    
    return matchjsons;
}