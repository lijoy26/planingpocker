import "./result.css"

const Result = (props) => {
  const valuelist = props.valuelist;
  const finalinputs = props.valuelist.filter((e) => e !== '?')
  var total = 0;
  var count = 0;

  var hand = props.hand.filter((e) => e !== '?').reverse().sort(function (a, b) { return a - b });

  var result = 0;
  var index = 0;
  var flag = 0;
  let roomOwner = props.roomOwner;

  finalinputs.forEach(element => {
    total += parseInt(element);
    count++;
  });

  for (index = 0; index < hand.length; index++) {
    if ((parseInt(hand[index]) >= Math.ceil(total / count))) {
      flag = parseInt(hand[index]);
      console.log(flag);
      break;
    }
  }
  result = flag;

  const scoreSummary = valuelist.reduce((acc, score) => {
    acc[score] = (acc[score] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="result">
      <div className="summary">
      <h2 className="outcome">Summary</h2>
      </div>
      <div className="score-summary">
        <div className="score-heading">
          <span>Points</span>
          <span>Votes</span>
        </div>
        {Object.entries(scoreSummary).map(([score, count]) => (
          <div key={score} className="score-item">
            <span className="score-value">{score}</span>
            <span className="score-count">{count }</span>
          </div>
        ))}
      </div>
      <h3 className="outcome"> Result : {result}</h3>
      {roomOwner && (
        <button className="send" onClick={props.goback}>
          Reset
        </button>
      )}
    </div>
  );
};
export default Result;