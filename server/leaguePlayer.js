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
    totalCSBadgePoints = 0;

    /*badges are to describe the players playstyle
          (0-2) represents the level the player is at. example of aggro
          2 being a very aggressive player, 0 being a very passive player.*/
    badges = {
        "Aggro" : 0,
        "VisionPoints" : 0,
        "CSBadgePoints" : 0,
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
                        this.totalVisionPoints += this.compareScoresToLobby(match.info.participants, 'visionScore');
                        this.totalCSBadgePoints += this.compareScoresToLobby(match.info.participants, 'totalMinionsKilled');
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

    /*takes a key of the summoner and compares it to the rest of the participants
      for example visionScore can be passed into key (participant.visionScore)
      and it will return 0 for being at the bottom of the lobby, 1 for in the middle, and
      2 for being at the top or an above average warder. These will get averaged out for the
      amount of games to get the official score.*/
    compareScoresToLobby(participants, key){
        let participantScores = [];
        let summonerScore;
        participants.forEach(participant => {
            if(participant.summonerName != this.name){
                participantScores.push(participant[key]);
            }
            else{
                summonerScore = participant[key];
            }
        });

        participantScores.sort( (a, b) => {
            return a - b;
        });

        let index = participantScores.findIndex(element => summonerScore < element);

        if(index == -1){
            return 2;
        }
        else if(index >= 3 && index < 6){
            return 1;
        }
        else if(index >= 6){
            return 2;
        }
        else{
            return 0;
        }
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