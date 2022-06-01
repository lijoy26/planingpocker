/* import Logos from "../assets/Logo/HB-Logo.png"; */
import './header.css';
/* import planningTitle from '../assets/Title/Group 58173.svg' */
import planningLogo from "../assets/Logo/planningLogo.svg";
const Logo = (props) => {
    
    const room = props.room;
    room.toUpperCase();
    return ( <div className="head2">
           
        
            <div className="postionings">
                     <img className="Random-img" src={planningLogo} alt="Title Text Pointing Poker" />
                    
                  </div>
                  
    </div> 
     );
}
 
export default Logo;