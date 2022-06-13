class leaguePlayer{
    name = null;
    matchHistory = null;
    rankedGames = 0;
    kills = 0;
    deaths = 0;
    assists = 0;
    firstBloods = 0;
    wards = 0;
    wins = 0;
    losses = 0;
    totalVisionPoints = 0;

    /*badges are to describe the players playstyle
          (0-2) represents the level the player is at. example of aggro
          2 being a very aggressive player, 0 being a very passive player.*/
    badges = {
        "Aggro" : 0,
        "VisionPoints" : 0,
        "CreepScore" : 0,
        "Role" : "",

    }
    constructor(name, matchHistory){
        this.name = name;
        this.matchHistory = matchHistory;
    }

    //process the data by getting the different badges to describe the player (ranked games only)
    processData(){
        this.matchHistory.map(match => {
            if(match.hasOwnProperty('info')){
                if(match.info.queueId == 420){
                    if(match.info.gameMode == 'CLASSIC'){
                        this.rankedGames++;
                        this.calculateAggro(match.info.participants);
                        this.calculateVision(match.info.participants);
                        //this.calculateCreepScore(match.info.participants);
                    }
                }
            }
        })
    }

    /*calculate how aggressive a player is in the early game by examining the first blood
      ratio to the other participants in the game over the course of all their matches in the list*/    
    calculateAggro(participants){
        let summoner = this.getSummonerMatchInfo(participants);
        if(summoner.firstBloodKill || summoner.firstBloodAssist){
            this.firstBloods++;
        }
    }

    /* calculate how well the player wards (vision score, pink wards bought, wards killed) compared to the rest of the players in the lobby */
    calculateVision(participants){
        let visionLevel = [];
        let summonerVisionScore;
        participants.forEach(participant => {
            if(participant.summonerName != this.name){
                visionLevel.push(participant.visionScore);
            }
            else{
                summonerVisionScore = participant.visionScore;
            }
        });

        visionLevel.sort();

        let index = visionLevel.findIndex(element => summonerVisionScore < element);

        if(index == -1){
            this.totalVisionPoints += 2;
        }
        else if(index >= 3 && index < 6){
            this.totalVisionPoints += 1;
        }
        else if(index >= 6){
            this.totalVisionPoints += 2;
        }

        //console.log(`Total Vision Points: ${this.totalVisionPoints}`);
    }

    getTeam(participants){
        let index = participants.findIndex(participant => participant.summonerName == this.name);
        let teamNum = participants[index].teamId;
        return teamNum;
    }

    //return only the summoner's match info (just the one participant)
    getSummonerMatchInfo(participants){
        let summoner = participants.find(participant => participant.summonerName == this.name);
        return summoner;
    }

    getBadges(){
        this.badges["VisionPoints"] = Math.round(this.totalVisionPoints/this.rankedGames);

        return this.badges;
    }

    printData(){
        console.log(`Summoner (${this.name}) ranked games: ${this.rankedGames}`);
    }
}

export default leaguePlayer;