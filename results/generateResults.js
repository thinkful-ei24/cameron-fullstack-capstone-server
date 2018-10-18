const {Contestant} = require('../contestants');

const checkResults = function(guess, actualResult){
  let arr=[];
  for (let i=0; i<guess.length; i++){
    if(actualResult.includes(guess[i])){
      arr.push({
        name: guess[i],
        guess: 'correct'
      });
    }else {
      arr.push({
        name: guess[i],
        guess: 'incorrect'
      });
    }
  }
  return arr;
};

const partialResults = function(guess, actualResult){
  let arr=[];
  for(let i=0; i<guess.length; i++){
    if(actualResult.includes(guess[i])){
      arr.push({
        name: guess[i],
        guess: ''
      });
    } else {
      arr.push({
        name: guess[i],
        guess: 'incorrect'
      });
    }
  }
  return arr;
};
const generateResults = function(week, guesses, actualResults){

  let feedbackObj = {};
  for (let i=1; i<=week; i++){
    const weekNum = `week${i}`;
    // need to get contestants array for each week, then map to array with just their names
    const actualWeekResults = actualResults.find(weekInfo => weekInfo.weekName===weekNum).contestants;
    const actualContestants = actualWeekResults.map(person => person.name);
    feedbackObj[weekNum] = checkResults(guesses[weekNum], actualContestants);
  }
  for (let i=week+1; i<=10; i++){
    const weekNum = `week${i}`;
    const actualWeekResults = actualResults.find(weekInfo => weekInfo.weekName===`week${week}`).contestants;
    const actualContestants = actualWeekResults.map(person => person.name);
    feedbackObj[weekNum] = partialResults(guesses[weekNum], actualContestants);
  }
  return feedbackObj; 
};

module.exports = {generateResults};