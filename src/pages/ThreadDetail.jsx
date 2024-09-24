import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommentInput from "../components/CommentInput";
import { postedAt } from "../utils";
import { asyncFetchThreadDetail } from "../states/threadDetail/action";
import { asyncAddComment } from "../states/comment/action";

function ThreadDetail() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { thread, loading, error } = useSelector((state) => state.threadDetail);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(asyncFetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  const handleAddComment = (content) => {
    dispatch(asyncAddComment(threadId, content));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!thread) {
    return <p>No thread data available.</p>;
  }

  return (
    <section className="thread-detail">
      <header className="thread-detail__header">
        <h1>{thread.title}</h1>
        <p className="thread-detail__category">Category: {thread.category}</p>
        <p className="thread-detail__date">
          Created at: {postedAt(thread.createdAt)}
        </p>
      </header>
      <article className="thread-detail__body">
        <div dangerouslySetInnerHTML={{ __html: thread.body }} />
      </article>
      <footer className="thread-detail__footer">
        <div className="thread-detail__owner">
          <img src={thread.owner.avatar} alt={thread.owner.name} />
          <p>{thread.owner.name}</p>
        </div>
        <div className="thread-detail__comments">
          <h2>Comments ({comments.length})</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="thread-detail__comment">
              <div className="comment__owner">
                <img src={comment.owner.avatar} alt={comment.owner.name} />
                <p>{comment.owner.name}</p>
              </div>
              <div
                className="comment__content"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
              <p className="comment__date">
                Posted at: {postedAt(comment.createdAt)}
              </p>
            </div>
          ))}
        </div>
        <CommentInput threadId={threadId} onAddComment={handleAddComment} />
      </footer>
    </section>
  );
}

export default ThreadDetail;
