let dataReader = require('convert-csv-to-json');

matchPath = "/home/silvr/Anchal_IPL_Project/src/data/matches.csv";
matchData = dataReader.fieldDelimiter(",").getJsonFromCsv(matchPath);

delivPath = "/home/silvr/Anchal_IPL_Project/src/data/deliveries.csv";
delivData = dataReader.fieldDelimiter(",").getJsonFromCsv(delivPath);

var fs = require('fs');



// Function for total number of matches played per year//
function matchPerYear() {

    var year = {};

    for (let matchItem of matchData) {
        let seasonName = matchItem["season"];

        if (!year.hasOwnProperty(seasonName)) {
            year[seasonName] = 0;
        }
        else {
            year[seasonName]++;
        };
    }

    let yearData = JSON.stringify(year);
    fs.writeFile('/home/silvr/Anchal_IPL_Project/src/public/output/matchPerYear.json', yearData, (err) => {
        if (err) {
            console.log(err);
        }
    })

}
matchPerYear();



//Function for extra runs conceded by team in 2016//
function extraRuns() {

    var matchID = {};

    for (let matchItem of matchData) {

        let season = matchItem['season'];
        let ID = matchItem['id'];

        if (season === '2016') {
            if (!matchID.hasOwnProperty(ID)) {
                matchID[ID] = '';
            }
        }
    }

    var team = {};

    for (let eachDeliv of delivData) {

        let teamName = eachDeliv['bowling_team']
        let matchesID = eachDeliv['match_id']
        let extRuns = parseInt(eachDeliv['extra_runs'])

        if (matchID.hasOwnProperty(matchesID)) {
            {
                if (!team.hasOwnProperty(teamName)) {
                    team[teamName] = 0;
                }
                else {
                    team[teamName] = team[teamName] + extRuns;
                }
            }
        }
    }

    let extData = JSON.stringify(team);

    fs.writeFile('/home/silvr/Anchal_IPL_Project/src/public/output/extraRuns.json', extData, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

extraRuns()



// Function for economical bowler of 2015//
function ecoBowl() {

    var matchID = {};

    for (let matchItem of matchData) {

        let season = matchItem['season'];
        let ID = matchItem['id'];

        if (season === '2015') {
            if (!matchID.hasOwnProperty(ID)) {
                matchID[ID] = '';
            }
        }
    }

    var bowler = {};
    var econBowler = {}

    for (let delivItem of delivData) {

        let bowlerName = delivItem['bowler'];
        let matchesID = delivItem['match_id'];
        let totRuns = parseInt(delivItem['total_runs']);

        if (matchID.hasOwnProperty(matchesID)) {
            if (!bowler.hasOwnProperty(bowlerName)) {
                bowler[bowlerName] = [0, 0, 0];
            }
            else {
                bowler[bowlerName][0] = bowler[bowlerName][0] + totRuns;
                bowler[bowlerName][1] = bowler[bowlerName][1] + 1;
                bowler[bowlerName][2] = bowler[bowlerName][0] * 6 / bowler[bowlerName][1]
                econBowler[bowlerName] = bowler[bowlerName][2]
            }

        }
    }
    var bowlerEcon = Object.entries(econBowler);

    bowlerEcon.sort(function (a, b) {
        return a[1] - b[1];
    })

    let topTenBowler = bowlerEcon.slice(0, 10);


    let topTen = JSON.stringify(topTenBowler);

    fs.writeFile('/home/silvr/Anchal_IPL_Project/src/public/output/economicBowler.json', topTen, (err) => {
        if (err) {
            console.log(err)
        }
    })

}

ecoBowl()



//Function to create Number of matches won per team per year//
function matchWins() {
    var wins = {}
    for (let matchItems of matchData) {
        let season = matchItems['season']


        if (!wins.hasOwnProperty('season')) {
            wins[season] = {};
        }
    }
    for (let matchItems of matchData) {
        let season = matchItems['season']
        let winner = matchItems['winner']
        if (!wins[season].hasOwnProperty(winner)) {
            wins[season][winner] = 1;
        }
        else {
            wins[season][winner]++;
        }
    }

    let winners = JSON.stringify(wins);

    fs.writeFile('/home/silvr/Anchal_IPL_Project/src/public/output/matchesWonPerYear.json', winners, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

matchWins()
