
import './UsersInRoom.css';
// import { FaUser } from "react-icons/fa";

const UsersInRoom = ({ users }) => {
  console.log(users);

  return (
    <div className="users-container">
      <h3 className="user-title">Users in Room</h3>
      <div className="users-list">
        {users && users.length > 0 ? (
          users.map(({ name, id, roomOwner }) => (
            <div key={id} className="user-item namesx">
              {name}
              {roomOwner && <span> (Owner)</span>}
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default UsersInRoom;
