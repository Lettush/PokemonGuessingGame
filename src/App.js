import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomPokemon from "./components/RandomPokemon";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RandomPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
