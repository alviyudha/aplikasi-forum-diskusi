import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function CommentInput({ onAddComment }) {
  const [content, onContentChange, setContent] = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddComment(content);
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={onContentChange}
        placeholder="Add a comment..."
        rows="4"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
