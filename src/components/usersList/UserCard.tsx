// UserCard.jsx
import "./usersList.css";
function UserCard({ user }: any) {
  const createdAt = new Date(user.createdAt).toLocaleDateString();
  const postCountClass = user.posts.length > 0 ? "green" : "red";

  return (
    <div className="user-card">
      <div className="user-card__avatar">{user.name[0]}</div>
      <h3 className="user-card__name">{user.name}</h3>
      <p className="user-card__role">{user.role}</p>
      <p className="user-card__created-at">{createdAt}</p>
      <div className={`user-card__post-count ${postCountClass}`}>
        {user.posts.length}
      </div>
    </div>
  );
}

export default UserCard;
