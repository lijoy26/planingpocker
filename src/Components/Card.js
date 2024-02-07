import './poker.css'


const Card = ({ value, onClick, index, enablePolling, isJira}) => {
  const unknown = "question mark"
  // console.log(isDescription, isJira);
  return (
      
      <button id={value} disabled={(enablePolling== 'false')} className="cardBox" onClick={onClick}>
        
       <label className="visuallyhidden" >Pointing Poker Point {value==="?" ? unknown : value }</label>
      <span  className="values">{value}</span>
    </button>
     
    
  );
  
};

export default Card;