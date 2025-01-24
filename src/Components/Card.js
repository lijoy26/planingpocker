import './poker.css'


const Card = ({ value, onClick, index, enablePolling, isJira}) => {
  const unknown = "question mark"
  return (
      
      <button id={value} disabled={(!enablePolling)} className="cardBox" onClick={onClick}>
      <span  className="values">{value}</span>
    </button>
     
    
  );
  
};

export default Card;