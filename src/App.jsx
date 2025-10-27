import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { PokemonDetailsPage } from "./pages/PokemonDetailsPage/PokemonDetailsPage";
import { PokemonStats } from "./pages/PokemonDetailsPage/PokemonStats";
import { PokemonPhotos } from "./pages/PokemonDetailsPage/PokemonPhotos";
import { PokemonDetailOverView } from "./pages/PokemonDetailsPage/PokemonDetailOverview";
import { PokemonGames } from "./pages/PokemonDetailsPage/PokemonGames";
import { PokemonMoves } from "./pages/PokemonDetailsPage/PokemonMoves";
import { HomePageLayout } from "./pages/HomePage/HomePageLayout";
import { ProfilePageOverview } from "./pages/ProfilePage/ProfilePageOverview";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { FavoritePokemonsPage } from "./pages/ProfilePage/FavoritePokemonsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/Auth/LoginPage";
import { AuthLayout } from "./pages/Auth/AuthLayout";
import RegisterUserPage from "./pages/Auth/RegisterUserPage";
import { GamePageLayout } from "./pages/CatchGame/GamePageLayout";
import { GamePage } from "./pages/CatchGame/GamePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profilepage" element={<ProfilePageOverview />}>
            <Route index element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritePokemonsPage />} />
          </Route>
          <Route path="login" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterUserPage />} />
          </Route>
          <Route path="game" element={<GamePageLayout />}>
            <Route index element={<GamePage />} />
          </Route>
        </Route>

        <Route path="/pokemon/:name" element={<PokemonDetailsPage />}>
          <Route index element={<PokemonDetailOverView />} />
          <Route path="stats" element={<PokemonStats />} />
          <Route path="photos" element={<PokemonPhotos />} />
          <Route path="games" element={<PokemonGames />} />
          <Route path="moves" element={<PokemonMoves />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover
        hideProgressBar={false}
        closeOnClick
        draggable
      />
    </>
  );
}

export default App;
