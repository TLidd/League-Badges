import leaguePlayer from "../leaguePlayer.js";
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let matchList = []
let matches = fs.readdirSync(__dirname + "/matchData", 'utf-8');

matches.forEach(match => {
    let matchFile = fs.readFileSync(__dirname + `/matchData/${match}`, 'utf-8');
    matchFile = JSON.parse(matchFile);
    matchList.push(matchFile);
});

// these 3 summoners allow to test different vision points at the 3 different levels
let testSummoner1= new leaguePlayer("wunkadiller", matchList);
testSummoner1.processData();

let testSummoner2 = new leaguePlayer("Bavaqepe", matchList);
testSummoner2.processData();

let testSummoner3 = new leaguePlayer("Beast Brawler", matchList);
testSummoner3.processData();


describe("Total Ranked Games", () => {
    it("should be a number", () => {
        expect(testSummoner1.rankedGames).toBe(30);
    });
});

//testing the vision points function from match data
describe("Summoner (wunkadiller) total vision badge points", () => {
    it("should be a number", () => {
        expect(testSummoner1.totalVisionPoints).toBe(60);
    });
});

describe("Summoner (Bavaqepe) total vision badge points", () => {
    it("should be a number", () => {
        expect(testSummoner2.totalVisionPoints).toBe(0);
    });
});

describe("Summoner (Beast Brawler) total vision badge points", () => {
    it("should be a number", () => {
        expect(testSummoner3.totalVisionPoints).toBe(30);
    });
});

//testing the badge function to get all the correct badges
describe("Get summoner's badges", () => {
    it("should be an object", () => {
        let badges = {
            "Aggro" : 0,
            "VisionPoints" : 2,
            "CSBadgePoints" : 0,
            "Role" : "",
        }
        expect(testSummoner1.getBadges()).toEqual(badges);
    });
});

//testing the first blood participation of the player who gets the first blood
describe("Get summoner's FB participation", () => {
    it("should be a number", () => {
        expect(testSummoner3.firstBloods).toBe(30);
    });
})
//testing the first blood participation of the player who assists the first blood
let fbAssistSummoner = new leaguePlayer("Poilroux", matchList);
fbAssistSummoner.processData();
describe("Get summoner's FB participation", () => {
    it("should be a number", () => {
        expect(fbAssistSummoner.firstBloods).toBe(30);
    });
});

//testing the total cs badge points before getting the badge number (0-2) based on amount of games
describe("Summoner's creep point badge score", () => {
    it("should be a number", () => {
        expect(testSummoner1.totalCSBadgePoints).toBe(30);
    });
});

describe("Summoner's creep point badge score", () => {
    it("should be a number", () => {
        expect(testSummoner2.totalCSBadgePoints).toBe(60);
    });
});

describe("Summoner's creep point badge score", () => {
    it("should be a number", () => {
        expect(testSummoner3.totalCSBadgePoints).toBe(0);
    });
});