const generateScore = (guess, actual, week)=>{
  let score=0;
  for (let i=0; i<guess.length; i++){
    if(actual.includes(guess[i])){
      score ++;
    }
  }return score * week;
};

const generateScoreArray = (guesses, actualResults) => {
  let scores = [];
  for(let i=1; i<=10; i++){
    const weekNum=`week${i}`;
    const results = actualResults.find(week => week.weekName === weekNum).contestants.map(person => person.name);
    scores.push(generateScore(guesses[weekNum], results, i));
  }
  return scores;
};

module.exports = {generateScoreArray};