const Backcard = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <div className="backcard">
        <span className="value"></span>
      </div>
      <div className="user-name" >
        {user.name}
      </div>
    </div>
  );
};

export default Backcard;
