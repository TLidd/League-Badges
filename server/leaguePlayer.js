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
        damageDealtChamps : 0,
        damageTaken: 0,
        totalWardsDestroyed : 0,
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
        Role : "",
        badges : {}
    }

    constructor(name, matchHistory){
        this.name = name;
        this.matchHistory = matchHistory;
        this.playerData.SummonerName = name
    }

    //process the data by getting the different badges to describe the player (ranked games only)
    processData(){
        this.matchHistory.map(match => {
            if(match.hasOwnProperty('info')){
                if(match?.info?.participants){
                    let playersList = match.info.participants;

                    this.matches.gamesPlayed++;
                    this.calculateAggro(playersList);

                    let summonerRole = this.getSummonerMatchInfo(playersList).teamPosition
                    this.playedRoles[summonerRole] += 1;

                    this.matches.totalVisionPoints += this.compareScoresToLobby(playersList, 'visionScore');
                    this.matches.totalCSBadgePoints += this.compareScoresToLobby(playersList, 'totalMinionsKilled');
                    this.matches.turretDmgBadgePoints += this.compareScoresToLobby(playersList, 'damageDealtToTurrets');
                    this.matches.damageDealtChamps += this.compareScoresToLobby(playersList, "totalDamageDealtToChampions");
                    this.matches.damageTaken += this.compareScoresToLobby(playersList, "totalDamageTaken");
                    this.matches.totalWardsDestroyed += this.compareScoresToLobby(playersList, "wardsKilled");

                    this.gamesPlayed++
                }
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
        let summonerInfo = participants.find(participant => participant.summonerName == this.name);
        return summonerInfo;
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
            this.addFirstBloodBadge();
            this.addBadge("Warder", this.matches.totalVisionPoints);
            this.addBadge("CreepKiller", this.matches.totalCSBadgePoints);
            this.addBadge("TowerDestroyer", this.matches.turretDmgBadgePoints);
            this.addBadge("DamageDealt", this.matches.damageDealtChamps);
            this.addBadge("DamageTaken", this.matches.damageTaken);
            this.addBadge("WardsDestroyed", this.matches.wardsDestroyed);

            let max = 0;
            for(let key in this.playedRoles){
                if(max < this.playedRoles[key]){
                    this.playerData.Role = key;
                    max = this.playedRoles[key];
                }
            }
        }
        return this.playerData;
    }

    addBadge(badgeName, totalBadgePoints){
        let avgBadgePoints = (totalBadgePoints/this.gamesPlayed).toFixed(3);
        if(avgBadgePoints > 1.75){
            this.playerData.badges[badgeName] = "Excellent";
        }
        else if(avgBadgePoints > 1.5){
            this.playerData.badges[badgeName] = "Great";
        }
        else if(avgBadgePoints > 1.25){
            this.playerData.badges[badgeName] = "Good";
        }
        return;
    }

    addFirstBloodBadge(){
        let percentage = (this.matches.firstBloods / this.gamesPlayed)*100;
        if(percentage >= 30 && percentage < 40){
            this.playerData.badges["FirstBloods"] = "Good";
        }
        else if(percentage >= 40 && percentage < 50){
            this.playerData.badges["FirstBloods"] = "Great";
        }
        else if(percentage >= 50){
            this.playerData.badges["FirstBloods"] = "Excellent";
        }
    }

    printData(){
        console.log(`Summoner (${this.name}) ranked games: ${this.gamesPlayed}`);
    }
}

export default leaguePlayer;