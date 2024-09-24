import { useState } from "react";
import { IoEarthOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import api from "../utils/api";

function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onRegister = async ({ name, email, password }) => {
    try {
      await api.register({ name, email, password });

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>
          <IoEarthOutline />
        </h1>
      </header>
      <article className="register-page__main">
        <h2>Create your account</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <RegisterInput register={onRegister} />

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
