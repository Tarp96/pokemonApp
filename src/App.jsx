import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/HomePage";
import { PokemonDetailsPage } from "./pages/PokemonDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details" element={<PokemonDetailsPage />} />
    </Routes>
  );
}

export default App;
