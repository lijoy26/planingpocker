import './Table.css'
import lockIcon from "../assets/Icons/lock.png"

const Placedcard = ({ value, user,displayVotes}) => {

  if (!user) {
    return null;
  }
  
    return (
        <div className="d-flex card-total">
        <button aria-disabled="true" className="placedcard">
              <div className="value">{displayVotes ?  value : <img
                    src={lockIcon}
                    alt="Voted"
                    className="lock-icon"
                  />}</div>
      </button>
        <div className="user-name" >
        {user.name}
        </div>
      </div>
      
    );
  };
  
  export default Placedcard;
  