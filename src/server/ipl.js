let dataReader = require('convert-csv-to-json')
matchPath = "/home/silvr/Anchal_IPL_Project/src/data/matches.csv"
matchData = dataReader.fieldDelimiter(",").getJsonFromCsv(matchPath)
delivPath = "/home/silvr/Anchal_IPL_Project/src/data/deliveries.csv"
delivData = dataReader.fieldDelimiter(",").getJsonFromCsv(delivPath)


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

    console.log(year);
}
// matchPerYear();


//Function for extra runs conceded by team in 2016//
function extraRuns(){

    var matchID = {};

    for(let matchItem of matchData){

        let season = matchItem['season'];
        let ID = matchItem['id'];

        if(season === '2016'){
            if(!matchID.hasOwnProperty(ID)){
                matchID[ID] = '';
            }
        }
    }
    // console.log(matchID)

    var team = {};

    for(let eachDeliv of delivData){

        let teamName = eachDeliv['bowling_team']
        let matchesID = eachDeliv['match_id']
        let extRuns = parseInt(eachDeliv['extra_runs'])

        if(matchID.hasOwnProperty(matchesID)){
            { 
                if(!team.hasOwnProperty(teamName)){
                    team[teamName] = 0;
                }
                else{
                    team[teamName] = team[teamName] + extRuns;
                }
            }
        }
    }
    console.log(team);  
}
// extraRuns()

// Function for economical bowler of 2015//
function ecoBowl(){

    var matchID = {};

    for(let matchItem of matchData){

        let season = matchItem['season'];
        let ID = matchItem['id'];
        
        if(season === '2015'){
            if(!matchID.hasOwnProperty(ID)){
                matchID[ID] = '';
            }
        }
    }

    var bowler = {};
    var econBowler = {}
 
    for(let delivItem of delivData){
 
        let bowlerName = delivItem['bowler'];
        let matchesID = delivItem['match_id'];
        let totRuns = parseInt(delivItem['total_runs']);
 
        if(matchID.hasOwnProperty(matchesID)){
            if(!bowler.hasOwnProperty(bowlerName)){
                bowler[bowlerName] = [0,0,0];
            }
            else{
                bowler[bowlerName][0] = bowler[bowlerName][0]+totRuns;
                bowler[bowlerName][1] = bowler[bowlerName][1]+1;
                bowler[bowlerName][2] = bowler[bowlerName][0]*6/bowler[bowlerName][1]
                econBowler[bowlerName] = bowler[bowlerName][2]
            }

        }
 
    }
    console.log(econBowler)

}

ecoBowl()


