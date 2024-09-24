import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThreadItem from "./ThreadItem";
import { asyncFetchThreadsAndUsers } from "../states/threadList/action";

function ThreadList() {
  const dispatch = useDispatch();
  const { threads, users, loading, error } = useSelector(
    (state) => state.threadList
  );

  useEffect(() => {
    dispatch(asyncFetchThreadsAndUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="thread-list">
      <h2>Threads</h2>
      {threads.length > 0 ? (
        <ul>
          {threads.map((thread) => {
            const user = users.find((u) => u.id === thread.ownerId);
            return user ? (
              <ThreadItem key={thread.id} thread={thread} user={user} />
            ) : null;
          })}
        </ul>
      ) : (
        <p>No threads available.</p>
      )}
    </section>
  );
}

export default ThreadList;
