import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/HomePage";
import { PokemonDetailsPage } from "./pages/PokemonDetailsPage/PokemonDetailsPage";
import { PokemonStats } from "./pages/PokemonDetailsPage/PokemonStats";
import { PokemonPhotos } from "./pages/PokemonDetailsPage/PokemonPhotos";
import { PokemonDetailOverView } from "./pages/PokemonDetailsPage/PokemonDetailOverview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/pokemon/:name" element={<PokemonDetailsPage />}>
        <Route index element={<PokemonDetailOverView />} />
        <Route path="stats" element={<PokemonStats />} />
        <Route path="photos" element={<PokemonPhotos />} />
        <Route path="games" element={<PokemonGamesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
