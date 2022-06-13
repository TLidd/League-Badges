import leaguePlayer from "../leaguePlayer.js";
import {match1} from "./matchData/match1.js";
import {match2} from "./matchData/match2.js";
import {match3} from "./matchData/match3.js";
import {match4} from "./matchData/match4.js";
import {match5} from "./matchData/match5.js";
import {match6} from "./matchData/match6.js";
import {match7} from "./matchData/match7.js";
import {match8} from "./matchData/match8.js";

let matchList = [match1, match2, match3, match4, match5, match6, match7, match8];

// these 3 summoners allow to test different vision points at the 3 different levels
let testSummoner1= new leaguePlayer("wunkadiller", matchList);
testSummoner1.processData();

let testSummoner2 = new leaguePlayer("Bavaqepe", matchList);
testSummoner2.processData();

let testSummoner3 = new leaguePlayer("Beast Brawler", matchList);
testSummoner3.processData();


describe("Total Ranked Games", () => {
    it("should be a number", () => {
        expect(testSummoner1.rankedGames).toBe(8);
    })
});

//testing the vision points function from match data
describe("Summoner (wunkadiller) total vision points", () => {
    it("should be a number", () => {
        expect(testSummoner1.totalVisionPoints).toBe(16);
    })
});

describe("Summoner (Bavaqepe) total vision points", () => {
    it("should be a number", () => {
        expect(testSummoner2.totalVisionPoints).toBe(0);
    })
});

describe("Summoner (Beast Brawler) total vision points", () => {
    it("should be a number", () => {
        expect(testSummoner3.totalVisionPoints).toBe(8);
    })
});

//testing the badge function to get all the correct badges
describe("Get summoner's badges", () => {
    it("should be an object", () => {
        let badges = {
            "Aggro" : 0,
            "VisionPoints" : 2,
            "CreepScore" : 0,
            "Role" : "",
        }
        expect(testSummoner1.getBadges()).toEqual(badges);
    })
})

//testing the first blood participation of the player who gets the first blood
describe("Get summoner's FB participation", () => {
    it("should be a number", () => {
        expect(testSummoner3.firstBloods).toBe(8);
    })
})
//testing the first blood participation of the player who assists the first blood
let fbAssistSummoner = new leaguePlayer("Poilroux", matchList);
fbAssistSummoner.processData();
describe("Get summoner's FB participation", () => {
    it("should be a number", () => {
        expect(fbAssistSummoner.firstBloods).toBe(8);
    })
})