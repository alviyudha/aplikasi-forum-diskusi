import ThreadList from "../components/ThreadList";
import CreateThreadButton from "../components/CreateThreadButton";

function HomePage() {
  return (
    <div>
      <ThreadList />
      <CreateThreadButton />
    </div>
  );
}

export default HomePage;
