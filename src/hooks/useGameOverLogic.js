export const useGameOveLogic = (coinsEarned) => {
  const [userCoins, setUserCoins] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [userHighScore, setUserHighScore] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const rewardedRef = useRef(false);
  const leaderboardUpdatedRef = useRef(false);
};
