import fetch from 'node-fetch';
import leaguePlayer from "./leagueClasses/leaguePlayer.js"

export async function getSummoner(summonerName){
    let summonerInfo = await getData(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_KEY}`);
    return summonerInfo;
}

export async function getCurrentGame(summonerName){
    let summonerInfo = await getSummoner(summonerName);
    if(summonerInfo?.status){
        return summonerInfo;
    }
    let data = await getData(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerInfo.id}?api_key=${process.env.RIOT_KEY}`);
    data.summonerName = summonerInfo.name;
    return data;
}

export async function getPlayerHistory(summonerName){
    //get summoner puuid from name
    let summonerInfo = await getData(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_KEY}`);

    const puuid = summonerInfo?.puuid;

    //get match id list from puuid
    if(puuid){
        let matchIds = await getData(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&count=7&api_key=${process.env.RIOT_KEY}`);

        //get match data from each match id 
        //note when '{}' is used here the return needs to be explicit
        //the return is implicit if it is written like
        // const matches = await Promise.all(Object.values(matchIds).map(matchId => 
        //     fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiCallKey}`)
        // ));
        let matches = await Promise.all(Object.values(matchIds).map(matchId => {
            return getData(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_KEY}`);
        }))
        .catch(err => console.log(err));

        let player = new leaguePlayer(summonerInfo.name, puuid, matches);
        return player.getPlayerData();
    }
}

export async function getLobbyData(summonerName){
    let gameData = await getCurrentGame(summonerName);
    if(gameData?.participants){
        let lobbyData = await Promise.all(Object.values(gameData.participants).map(player => {
            return getPlayerHistory(player.summonerName);
        }))
        .catch(err => console.log(err));
        return {team1: lobbyData.slice(0,5), team2: lobbyData.slice(5,10)}
    }
}

export async function getLobbyNames(summonerName){
    let currentGame = await getCurrentGame(summonerName);
    if(currentGame?.status){
        return currentGame;
    }
    if(currentGame?.participants){
        let lobby = currentGame.participants.map(player => {
            return player.summonerName;
        });
        return lobby;
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