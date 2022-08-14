import championHistory from './leagueChampion.js';
import { createFBBadge, createBadgeList, getMainRole, orderObj } from './leagueDataFunctions.js';

class leaguePlayer{
    name = null;
    matchHistory = null;
    gamesPlayed = null;

    constructor(name, matchHistory){
        this.name = name;
        this.matchHistory = matchHistory;
        this.playerData.SummonerName = name;
        this.gamesPlayed = matchHistory.length;
        this.processMatches();
    }

    playedRoles = {
        "TOP" : 0,
        "JUNGLE" : 0,
        "MIDDLE" : 0,
        "BOTTOM" : 0,
        "UTILITY" : 0,
    }

    /*badges are to describe the players playstyle
          (0-2) represents the level the player is at. example of aggro
          2 being a very aggressive player, 0 being a very passive player.*/
    
    playerData = {
        SummonerName: "",
        Role: "",
        badges: {},
        champions: {},
    }

    //process the data by getting the different badges to describe the player (ranked games only)
    processMatches(){
        this.matchHistory.map(match => {
            if(match.hasOwnProperty('info')){
                if(match?.info?.participants){
                    let player = this.getPlayerMatchStats(match.info.participants);
                    this.playedRoles[player.teamPosition] += 1;

                    let champion = player.championName;

                    if(this.playerData.champions[champion] === undefined){
                        this.playerData.champions[champion] = new championHistory(champion);
                    }

                    this.playerData.champions[champion].processChampData(match);
                }
            }
        })
        this.createChampionData();
        this.createPlayerData();
    }

    getPlayerMatchStats(players){
        let playerStats = players.find(player => {
            if(player.summonerName == this.name) return player;
        })
        return playerStats;
    }

    createPlayerData(){
        let data = null;
        Object.values(this.playerData.champions).map(champion => {
            let championBadgeData = champion.getChampionBadgeData();
            if(data === null){
                data = championBadgeData;
            }
            else{
                Object.keys(data).map(key => {
                    data[key] += championBadgeData[key];
                })
            }
        })
        if(data){
            this.playerData.badges = createBadgeList(data, this.gamesPlayed);

            let fbBadgeLevel = createFBBadge(data.firstBloods, this.gamesPlayed);
            if(fbBadgeLevel >= 0){
                this.playerData.badges.firstBloods = fbBadgeLevel;
            }
        }

        this.playerData.Role = getMainRole(this.playedRoles);
        this.playerData.badges = orderObj(this.playerData.badges);
        this.playerData.champions = this.orderChamps();
    }

    createChampionData(){
        Object.values(this.playerData.champions).map(champion => {
            champion.createChampionBadges();
            champion.createChampStats();
        })
    }

    getPlayerData(){
        return this.playerData;
    }

    orderChamps(){
        return Object.entries(this.playerData.champions).sort(([,a], [,b]) => b.champData.gamesPlayed - a.champData.gamesPlayed).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    }

    printData(){
        console.log(JSON.stringify(this.playerData, null, 4));
    }
}

export default leaguePlayer;