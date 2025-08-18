import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/HomePage";
import { PokemonDetailsPage } from "./pages/PokemonDetailsPage/PokemonDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
    </Routes>
  );
}

export default App;
