import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/HomePage";
import { PokemonDetailsPage } from "./pages/PokemonDetailsPage/PokemonDetailsPage";
import { PokemonStats } from "./pages/PokemonDetailsPage/PokemonStats";
import { PokemonPhotos } from "./pages/PokemonDetailsPage/PokemonPhotos";
import { PokemonDetailOverView } from "./pages/PokemonDetailsPage/PokemonDetailOverview";
import { PokemonGames } from "./pages/PokemonDetailsPage/PokemonGames";
import { PokemonMoves } from "./pages/PokemonDetailsPage/PokemonMoves";
import { HomePageLayout } from "./pages/HomePageLayout";
import { ProfilePageOverview } from "./pages/ProfilePage/ProfilePageOverview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="profilepage" element={<ProfilePageOverview />} />
      </Route>

      <Route path="/pokemon/:name" element={<PokemonDetailsPage />}>
        <Route index element={<PokemonDetailOverView />} />
        <Route path="stats" element={<PokemonStats />} />
        <Route path="photos" element={<PokemonPhotos />} />
        <Route path="games" element={<PokemonGames />} />
        <Route path="moves" element={<PokemonMoves />} />
      </Route>
    </Routes>
  );
}

export default App;
