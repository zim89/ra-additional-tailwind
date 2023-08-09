import NoteList from "./components/NoteList/NoteList";
import StatsList from "./components/StatsList/StatsList";

const App = () => {
  return (
    <div className="container  w-8/12 mx-auto">
      <NoteList />
      <StatsList />
    </div>
  );
};

export default App;
