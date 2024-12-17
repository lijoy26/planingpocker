
// import onlineIcon from '../../icons/onlineIcon.png';

// import './UsersInRoom.css'
// const UsersInRoom = ({ users}) => {
//     console.log(users);
//     return ( 
//     <div className="dropdown heightd">
//         { <button className="btn dropdown-toggle userbutton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" onClick={onClick}>
//             Users In Room
//         </button> 
//         }

//         <div className="dropdown-menu"
//          aria-labelledby="dropdownMenuButton"
//         >

//                 {
                
//                 users
//                     ? 
//                     (
//                         <div className="HeightD">
                       
                           
//                             {users.map(({name,id}) => (
//                                 <div key={id} className="dropdown-item namesx ">
//                                     {name}
//                                </div>
//                                 ))}
                               
//                         </div>
                        
//                     )
//                     : null
//                 }
            
//         </div>        
//     </div>
//     );

// };

 
// export default UsersInRoom;


import './UsersInRoom.css';

const UsersInRoom = ({ users }) => {
  console.log(users);

  return (
    <div className="users-container">
      <h3 className="user-title">Users in Room</h3>
      <div className="users-list">
        {users && users.length > 0 ? (
          users.map(({ name, id }) => (
            <div key={id} className="user-item namesx">
              {name}
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default UsersInRoom;
