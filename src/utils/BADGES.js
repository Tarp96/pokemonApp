import coalBadge from "../assets/gymBadges/coalBadge.webp";
import boulderBadge from "../assets/gymBadges/boulderBadge.webp";
import fenBadge from "../assets/gymBadges/fenBadge.webp";
import earthBadge from "../assets/gymBadges/earthBadge.webp";
import forestBadge from "../assets/gymBadges/forestBadge.webp";
import rainbowBadge from "../assets/gymBadges/rainbowBadge.webp";
import rainBadge from "../assets/gymBadges/rainBadge.webp";
import icebergBadge from "../assets/gymBadges/icebergbadge.webp";

import largeBoulderBadge from "../assets/largeGymBadges/largeBoulderBadge.webp";
import largeFenBadge from "../assets/largeGymBadges/largeFenBadge.webp";
import largeEarthBadge from "../assets/largeGymBadges/largeEarthBadge.webp";
import largeForestBadge from "../assets/largeGymBadges/largeForestBadge.webp";
import largeRainbowBadge from "../assets/largeGymBadges/largeRainbowBadge.webp";
import largeRainBadge from "../assets/largeGymBadges/largeRainBadge.webp";
import largeIcebergBadge from "../assets/largeGymBadges/largeIcebergBadge.webp";

export const BADGES = [
  { threshold: 0, name: "Coal Badge", image: coalBadge },
  { threshold: 25, name: "Boulder Badge", image: boulderBadge },
  { threshold: 75, name: "Fen Badge", image: fenBadge },
  { threshold: 150, name: "Earth Badge", image: earthBadge },
  { threshold: 250, name: "Forest Badge", image: forestBadge },
  { threshold: 400, name: "Rainbow Badge", image: rainbowBadge },
  { threshold: 600, name: "Rain Badge", image: rainBadge },
  { threshold: 1000, name: "Iceberg Badge", image: icebergBadge },
];

export const getUnlockedBadges = (pokemonCaught) => {
  return BADGES.map((badge) => ({
    ...badge,
    unlocked: pokemonCaught >= badge.threshold,
  }));
};
