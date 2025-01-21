
import { useState } from 'react';
import './UsersInRoom.css';
import tickIcon from '../assets/Icons/tick-icon.png'

const UsersInRoom = ({ users }) => {
  console.log("userlist users",users);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <button className='toggle-button' onClick={toggleSidebar}>
        {isSidebarVisible ? "X" : "U"}
      </button>

      <div className={`users-container ${isSidebarVisible ? "visible" : "hidden"}`}>
        <h3 className="user-title">Users in Room</h3>
        <div className="users-list">
          {users && users.length > 0 ? (
            users.map(({ name, id, roomOwner,worth }) => (
              <div key={id} className="user-item">
                {name}
                {roomOwner && <span className="room-owner"> (Owner)</span>}
                {worth !== "waiting" && (
                  <img
                    src={tickIcon}
                    alt="Voted"
                    className="tick-icon"
                  />
                )
                }
              </div>
            ))
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UsersInRoom;
