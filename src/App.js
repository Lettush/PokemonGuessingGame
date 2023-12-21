import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomPokemon from "./components/RandomPokemon";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/PokemonGuessingGame" element={<RandomPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
