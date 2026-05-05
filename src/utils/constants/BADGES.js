import coalBadge from "../../assets/gymBadges/coalBadge.webp";
import boulderBadge from "../../assets/gymBadges/boulderBadge.webp";
import fenBadge from "../../assets/gymBadges/fenBadge.webp";
import earthBadge from "../../assets/gymBadges/earthBadge.webp";
import forestBadge from "../../assets/gymBadges/forestBadge.webp";
import rainbowBadge from "../../assets/gymBadges/rainbowBadge.webp";
import rainBadge from "../../assets/gymBadges/rainBadge.webp";
import icebergBadge from "../../assets/gymBadges/icebergBadge.webp";

import largeCoalBadge from "../../assets/largeGymBadges/largeCoalBadge.webp";
import largeBoulderBadge from "../../assets/largeGymBadges/largeBoulderBadge.webp";
import largeFenBadge from "../../assets/largeGymBadges/largeFenBadge.webp";
import largeEarthBadge from "../../assets/largeGymBadges/largeEarthBadge.webp";
import largeForestBadge from "../../assets/largeGymBadges/largeForestBadge.webp";
import largeRainbowBadge from "../../assets/largeGymBadges/largeRainbowBadge.webp";
import largeRainBadge from "../../assets/largeGymBadges/largeRainbadge.webp";
import largeIcebergBadge from "../../assets/largeGymBadges/largeIcebergBadge.webp";

export const BADGES = [
  {
    threshold: 10,
    name: "Coal Badge",
    image: coalBadge,
    largeImage: largeCoalBadge,
  },
  {
    threshold: 25,
    name: "Boulder Badge",
    image: boulderBadge,
    largeImage: largeBoulderBadge,
  },
  {
    threshold: 75,
    name: "Fen Badge",
    image: fenBadge,
    largeImage: largeFenBadge,
  },
  {
    threshold: 150,
    name: "Earth Badge",
    image: earthBadge,
    largeImage: largeEarthBadge,
  },
  {
    threshold: 250,
    name: "Forest Badge",
    image: forestBadge,
    largeImage: largeForestBadge,
  },
  {
    threshold: 400,
    name: "Rainbow Badge",
    image: rainbowBadge,
    largeImage: largeRainbowBadge,
  },
  {
    threshold: 600,
    name: "Rain Badge",
    image: rainBadge,
    largeImage: largeRainBadge,
  },
  {
    threshold: 1000,
    name: "Iceberg Badge",
    image: icebergBadge,
    largeImage: largeIcebergBadge,
  },
];

export const getUnlockedBadges = (pokemonCaught) => {
  return BADGES.map((badge) => ({
    ...badge,
    unlocked: pokemonCaught >= badge.threshold,
  }));
};
