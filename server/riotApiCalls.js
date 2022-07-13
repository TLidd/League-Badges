import fetch from 'node-fetch';
import {apiCallKey} from "./riotApiKey.js"
import leaguePlayer from "./leaguePlayer.js"
import { json } from 'express';

export async function getSummoner(summonerName){
    let summonerInfo = await getData(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`);
    return summonerInfo;
}

export async function getCurrentGame(summonerName){
    let summonerInfo = await getSummoner(summonerName);
    let data = await getData(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerInfo.id}?api_key=${apiCallKey}`);
    return data;
}

export async function getPlayerHistory(summonerName){
    //get summoner puuid from name
    let summonerInfo = await getData(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiCallKey}`);

    const puuid = summonerInfo["puuid"];

    //get match id list from puuid
    let matchIds = await getData(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&count=7&api_key=${apiCallKey}`);

    //get match data from each match id 
    //note when '{}' is used here the return needs to be explicit
    //the return is implicit if it is written like
    // const matches = await Promise.all(Object.values(matchIds).map(matchId => 
    //     fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`)
    // ));
    let matches = await Promise.all(Object.values(matchIds).map(matchId => {
        return getData(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`);
    }))
    .catch(err => console.log(err));

    let player = new leaguePlayer(summonerName, matches);

    try{
        player.processData();
    }
    catch(error){
        console.error("Error Received getPlayerHistory: " + error);
    }
    
    return player.getPlayerData();
}

export async function getLobby(summonerName){
    let gameData = await getCurrentGame(summonerName);
    if(gameData?.participants){
        let lobbyData = await Promise.all(Object.values(gameData.participants).map(player => {
            return getPlayerHistory(player.summonerName);
        }))
        .catch(err => console.log(err));
        return {team1: lobbyData.slice(0,5), team2: lobbyData.slice(5,10)}
    }
}

async function getData(url, retries = 5){
    let data;
    let jsonObj = await fetchData(url);
    if(jsonObj){
        data = await getJson(jsonObj);
    }

    if(data?.status?.status_code === 429 && retries != 0){
        await delay(1);
        return getData(url, retries - 1);
    }else{
        return data;
    }
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

function delay(seconds){
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}