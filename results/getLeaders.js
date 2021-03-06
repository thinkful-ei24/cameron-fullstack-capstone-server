const getTotalScore = (week, array) => {
  const score = array
    .filter((score, index) => index + 1 <= week)
    .reduce((accum, currentValue) => accum + currentValue);
  return score;  
};

const getScoreObj = (week, result) => {
  let user = {
    username: result.username,
    score: getTotalScore(week, result.scores)
  };
  return user;
};

const compare = (a, b) => {
  if(a.score < b.score){
    return 1;
  } else if (a.score > b.score){
    return -1;
  } else {
    return 0;
  }
};

const getScores = (week, results) => {
  let leaders = [];
  for (let i=0; i< results.length; i++){
    leaders.push(getScoreObj(week,results[i]));
  }
  return leaders.sort(compare);
};

module.exports = {getScores};
