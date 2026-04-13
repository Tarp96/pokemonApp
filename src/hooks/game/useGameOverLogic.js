import { useState, useEffect, useRef } from "react";
import { addCoins, listenToCoins } from "../../services/user/coinService";
import {
  listenToHighScore,
  updateHighScore,
} from "../../services/game/highScoreService";
import confetti from "canvas-confetti";
import { useProfileData } from "../useProfileData";
import { auth } from "../../firebaseConfig";
import { updateLeaderboard } from "../../services/game/leaderboardService";
import { updatePokemonCaught } from "../../services/game/pokemonCaughtService";

export const useGameOverLogic = (coinsEarned, score) => {
  const [userCoins, setUserCoins] = useState(0);
  const [animateStats, setAnimateStats] = useState(false);
  const [userHighScore, setUserHighScore] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const rewardedRef = useRef(false);
  const leaderboardUpdatedRef = useRef(false);

  const { username } = useProfileData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userHighScore === null) return;
    if (isNewHighScore) return;

    if (coinsEarned > userHighScore) {
      setIsNewHighScore(true);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [userHighScore, coinsEarned, isNewHighScore]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = listenToCoins(user.uid, (coins) => {
      console.log("Coins received:", coins);
      setUserCoins(coins ?? 0);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    console.log("Subscribing to high score for:", user.uid);

    const unsubscribe = listenToHighScore(user.uid, (score) => {
      console.log("High score received:", score);
      setUserHighScore(score);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const rewardCoins = async () => {
      if (rewardedRef.current || coinsEarned <= 0) return;
      rewardedRef.current = true;

      try {
        const user = auth.currentUser;
        if (!user) return;

        await addCoins(user.uid, coinsEarned);

        await updateHighScore(user.uid, coinsEarned);

        await updatePokemonCaught(user.uid, score);

        console.log("Pokemon caught increased by:", score);
      } catch (err) {
        console.error("Game reward error:", err);
      }
    };

    rewardCoins();
  }, [coinsEarned]);

  useEffect(() => {
    if (!isNewHighScore) return;

    const user = auth.currentUser;
    if (!user || !username || coinsEarned <= 0) return;

    if (leaderboardUpdatedRef.current) return;
    leaderboardUpdatedRef.current = true;

    const addScore = async () => {
      try {
        await updateLeaderboard(user.uid, username, coinsEarned);
        console.log("Updating leaderboard with:", {
          uid: user.uid,
          username,
          coinsEarned,
        });
      } catch (err) {
        console.error("Failed to update leaderboard:", err);
      }
    };

    addScore();
  }, [isNewHighScore, username, coinsEarned]);

  return {
    userCoins,
    userHighScore,
    isNewHighScore,
    animateStats,
  };
};
