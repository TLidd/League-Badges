class leaguePlayer{
    name = null;
    matchHistory = null;
    gamesPlayed = 0;

    matches = {
        kills : 0,
        deaths : 0,
        assists : 0,
        firstBloods : 0,
        wins : 0,
        losses : 0,
        totalVisionPoints : 0,
        totalCSBadgePoints : 0,
        turretDmgBadgePoints : 0,
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
        Role : "",
        badges : {
            "fbAggressionPoints" : 0,
            "visionPoints" : 0,
            "CSBadgePoints" : 0,
            "turretDmgPoints" : 0,
        }
    }

    constructor(name, matchHistory){
        this.name = name;
        this.matchHistory = matchHistory;
    }

    //process the data by getting the different badges to describe the player (ranked games only)
    processData(){
        this.matchHistory.map(match => {
            if(match.hasOwnProperty('info')){
                let playersList = match.info.participants;

                this.matches.gamesPlayed++;
                this.calculateAggro(playersList);

                let summonerRole = this.getSummonerMatchInfo(playersList).teamPosition
                this.playedRoles[summonerRole] += 1;

                this.matches.totalVisionPoints += this.compareScoresToLobby(playersList, 'visionScore');
                this.matches.totalCSBadgePoints += this.compareScoresToLobby(playersList, 'totalMinionsKilled');
                this.matches.turretDmgBadgePoints += this.compareScoresToLobby(playersList, 'damageDealtToTurrets');

                this.gamesPlayed++
            }
        })
    }

    /*calculate how aggressive a player is in the early game by examining the first blood
      ratio to the other participants in the game over the course of all their matches in the list*/    
    calculateAggro(participants){
        let summoner = this.getSummonerMatchInfo(participants);
        if(summoner.firstBloodKill || summoner.firstBloodAssist){
            this.matches.firstBloods++;
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
            participantScores.push(participant[key]);
            if(participant.summonerName == this.name){
                summonerScore = participant[key];
            }
        });

        participantScores.sort( (a, b) => {
            return a - b;
        });

        let index = participantScores.findIndex(element => summonerScore < element);
        if(index == -1) return 2;

        let pointPercentage = (index - 1) / participantScores.length;

        if(pointPercentage > .7){
            return 2;
        }
        else if(pointPercentage >= .5 && pointPercentage <= .7){
            return 1;
        }
        else{
            return 0;
        }
    }

    getPlayerData(){
        if(this.gamesPlayed != 0){
            this.playerData.badges.visionPoints = this.averageData(this.matches.totalVisionPoints);
            this.playerData.badges.CSBadgePoints = this.averageData(this.matches.totalCSBadgePoints);
            this.playerData.badges.turretDmgPoints = this.averageData(this.matches.turretDmgBadgePoints);

            let max = 0;
            for(var key in this.playedRoles){
                if(max < this.playedRoles[key]){
                    this.playerData.Role = key;
                    max = this.playedRoles[key];
                }
            }
        }
        return this.playerData;
    }

    averageData(totalBadgePoints){
        let avgBadgePoints = (totalBadgePoints/this.gamesPlayed).toFixed(3);
        return avgBadgePoints;
    }

    printData(){
        console.log(`Summoner (${this.name}) ranked games: ${this.gamesPlayed}`);
    }
}

export default leaguePlayer;