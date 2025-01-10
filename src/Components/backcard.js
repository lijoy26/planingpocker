const Backcard = ({user}) => {
  if (!user) {
    return null;
  }

return (
  <div className="d-flex card-total">
    <button aria-disabled="true" className="backcard">
      <span className="value">{/* Placeholder or empty value */}</span>
    </button>
    <div className="user-name">{user.name}</div>
  </div>
);
};

export default Backcard;
