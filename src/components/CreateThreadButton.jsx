import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function CreateThreadButton() {
  return (
    <Link to="/new" className="create-thread-button">
      <FiPlus size={24} />
    </Link>
  );
}

export default CreateThreadButton;
