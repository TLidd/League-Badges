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

    /*badges are to describe the players playstyle
          (0-2) represents the level the player is at. example of aggro
          2 being a very aggressive player, 0 being a very passive player.*/
    badges = {
        "Aggro" : 0,
        "Vision Score" : 0,
        "Creep Score" : 0,
        "Role" : "",

    }
    constructor(name, matchHistory){
        this.name = name;
        this.matchHistory = matchHistory;
    }

    processData(){
        this.matchHistory.map(match => {
            if(match.hasOwnProperty('info')){
                if(match.info.queueId == 420){
                    if(match.info.gameMode == 'CLASSIC'){
                        this.rankedGames++;
                        //this.calculateAggro(match.info.participants);
                        //this.calculateVision(match.info.participants);
                        //this.calculateCreepScore(match.info.participants);
                    }
                }
            }
        })
    }

    /*calculate how aggressive a player is in the early game by examining the first blood
      ratio to the other participants in the game over the course of all their matches in the list*/    
    calculateAggro(participants){
        console.log("AGGRO");
    }

    /* calculate how well the player wards (vision score, pink wards bought, wards killed) compared to the rest of the players in the lobby */
    calculateVision(participants){
        console.log("VISION");
    }

    printData(){
        console.log(`Summoner (${this.name}) ranked games: ${this.rankedGames}`);
    }
}

export default leaguePlayer;