export const getTrainerBadge = (pokemonCaught) => {
  if (pokemonCaught >= 1000)
    return { title: "Master Trainer", emoji: "👑", color: "#FFD700" };

  if (pokemonCaught >= 500)
    return { title: "Elite Trainer", emoji: "🔥", color: "#FF6B35" };

  if (pokemonCaught >= 250)
    return { title: "Veteran Trainer", emoji: "⚡", color: "#3B82F6" };

  if (pokemonCaught >= 100)
    return { title: "Skilled Trainer", emoji: "💪", color: "#10B981" };

  if (pokemonCaught >= 50)
    return { title: "Rookie Trainer", emoji: "🌱", color: "#84CC16" };

  return { title: "Beginner", emoji: "🎯", color: "#9CA3AF" };
};
