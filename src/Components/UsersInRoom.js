
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
