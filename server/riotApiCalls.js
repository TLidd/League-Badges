import fetch from 'node-fetch';
import {apiCallKey} from "./riotApiKey.js"
import leaguePlayer from "./leaguePlayer.js"

export async function getSummoner(summonerName){
    let summonerInfo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`);
    let jsonData = await getJson(summonerInfo);
    return jsonData;
}

export async function getCurrentGame(summonerName){
    let summonerInfo = await getSummoner(summonerName);
    let fetch = await fetchData(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerInfo.id}?api_key=${apiCallKey}`);
    let jsonData = await getJson(fetch);
    return jsonData;
}

export async function getPlayerHistory(summonerName){
    //get summoner puuid from name
    let summonerInfo = await fetchData(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`);
    summonerInfo = await getJson(summonerInfo);

    const puuid = summonerInfo["puuid"];

    //get match id list from puuid
    let matchIds = await fetchData(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&count=30&api_key=${apiCallKey}`);
    matchIds = await getJson(matchIds);

    //get match data from each match id 
    //note when '{}' is used here the return needs to be explicit
    //the return is implicit if it is written like
    // const matches = await Promise.all(Object.values(matchIds).map(matchId => 
    //     fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`)
    // ));
    let matches = await Promise.all(Object.values(matchIds).map(matchId => {
        return fetchData(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`);
    }))
    .catch(err => console.log(err));

    let matchjsons = await Promise.all(matches.map(match => {
        return getJson(match);
    }))
    .catch(err => console.log(err));

    let player = new leaguePlayer(summonerName, matchjsons);

    try{
        player.processData();
    }
    catch(error){
        console.error("Error Received getPlayerHistory: " + error);
    }
    
    return player.getPlayerData();
}

async function fetchData(url){
    let res;
    try{
        res = await fetch(url);
    }catch(err){
        console.error(err);
    }
    return res;
}

async function getJson(res){
    let jsonObj;
    try{
        jsonObj = await res.json();
    }catch(err){
        console.error(err);
    }
    return jsonObj; 
}