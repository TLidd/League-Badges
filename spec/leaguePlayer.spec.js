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
        expect(testSummoner1.gamesPlayed).toBe(30);
    });
});

//testing the vision points function from match data
describe("Summoner (wunkadiller) total vision badge points", () => {
    it("should be a number", () => {
        expect(testSummoner1.matches.totalVisionPoints).toBe(30);
    });
});

describe("Summoner (Bavaqepe) total vision badge points", () => {
    it("should be a number", () => {
        expect(testSummoner2.matches.totalVisionPoints).toBe(0);
    });
});

describe("Summoner (Beast Brawler) total vision badge points", () => {
    it("should be a number", () => {
        expect(testSummoner3.matches.totalVisionPoints).toBe(0);
    });
});

//testing the first blood participation of the player who gets the first blood
describe("Get summoner's FB participation", () => {
    it("should be a number", () => {
        expect(testSummoner3.matches.firstBloods).toBe(30);
    });
})
//testing the first blood participation of the player who assists the first blood
let fbAssistSummoner = new leaguePlayer("Poilroux", matchList);
fbAssistSummoner.processData();
describe("Get summoner's FB participation", () => {
    it("should be a number", () => {
        expect(fbAssistSummoner.matches.firstBloods).toBe(30);
    });
});

//testing the total cs badge points 
describe("Summoner's (wunkadiller) creep point badge score", () => {
    it("should be a number", () => {
        expect(testSummoner1.matches.totalCSBadgePoints).toBe(30);
    });
});

describe("Summoner's (Bavaqepe) creep point badge score", () => {
    it("should be a number", () => {
        expect(testSummoner2.matches.totalCSBadgePoints).toBe(60);
    });
});

describe("Summoner's (Beast Brawler) creep point badge score", () => {
    it("should be a number", () => {
        expect(testSummoner3.matches.totalCSBadgePoints).toBe(0);
    });
});

//testing the total dmg to turrets badge points
describe("Summoner's (wunkadiller) turret damage point badge score", () => {
    it("should be a number", () => {
        expect(testSummoner1.matches.turretDmgBadgePoints).toBe(0);
    });
});

let testSummoner1Badges = testSummoner1.createBadges();
describe("Summoner's (wunkadiller) badges", () => {
    it("should be an object", () => {
        let badgeExample = {
            fbAggressionPoints: 0,
            visionPoints: '1.000',
            CSBadgePoints: '1.000',
            turretDmgPoints: '0.000',
            Role: 'TOP'
          }
        expect(testSummoner1Badges).toEqual(badgeExample);
    });
});