
import { useState } from 'react';
import './UsersInRoom.css';

const UsersInRoom = ({ users }) => {
  console.log(users);
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
            users.map(({ name, id, roomOwner }) => (
              <div key={id} className="user-item">
                {name}
                {roomOwner && <span className="room-owner"> (Owner)</span>}
              </div>
            ))
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UsersInRoom;
