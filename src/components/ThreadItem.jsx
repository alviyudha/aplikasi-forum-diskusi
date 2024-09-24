import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";

function ThreadItem({ thread, user }) {
  const { id, title, body, category, createdAt, totalComments } = thread;
  const { name, avatar } = user;

  return (
    <li className="thread-item">
      <div className="thread-item__header">
        <img className="thread-item__avatar" src={avatar} alt={name} />
        <div className="thread-item__user-info">
          <p className="thread-item__user-name">{name}</p>
          <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        </div>
      </div>
      <h3>
        <Link to={`/threads/${id}`}>{title}</Link>
      </h3>
      <div className="thread-body" dangerouslySetInnerHTML={{ __html: body }} />
      <div className="thread-item__details">
        <span className="category">{category}</span>
        <span className="comments-count">{totalComments} Comments</span>
      </div>
    </li>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThreadItem;
