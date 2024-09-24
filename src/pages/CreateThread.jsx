import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { asyncCreateThread } from "../states/thread/action";

function CreateThread() {
  const dispatch = useDispatch();
  const { loading, error, thread } = useSelector((state) => state.thread);
  const [title, onTitleChange, setTitle] = useInput("");
  const [body, onBodyChange, setBody] = useInput("");
  const [category, onCategoryChange, setCategory] = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(asyncCreateThread({ title, body, category }));

    if (thread) {
      setTitle("");
      setBody("");
      setCategory("");
    }
  };

  return (
    <section className="create-thread">
      <h2>Create a New Thread</h2>
      <form onSubmit={handleSubmit} className="create-thread-form">
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={onBodyChange}
          placeholder="Body"
          required
        />
        <input
          type="text"
          value={category}
          onChange={onCategoryChange}
          placeholder="Category (optional)"
        />
        <button type="submit" disabled={loading}>
          Create Thread
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {thread && (
        <p className="success-message">
          Thread created successfully: {thread.title}
        </p>
      )}
    </section>
  );
}

export default CreateThread;
