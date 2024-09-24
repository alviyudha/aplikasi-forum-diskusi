import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CreateThread from "./pages/CreateThread";
import ThreadDetail from "./pages/ThreadDetail";
import LoginPage from "./pages/LoginPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          {authUser && <Navigation authUser={authUser} signOut={onSignOut} />}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<CreateThread />} />
            <Route path="/threads/:threadId" element={<ThreadDetail />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
