var fs=require('fs')
const matchData = fs.readFileSync('/home/silvr/Anchal_IPL_Project/data/matches.csv',
            {encoding:'utf8', flag:'r'});
// console.log(matchData)
matchArr = matchData.toString().split('\r\n');
console.log(matchArr)