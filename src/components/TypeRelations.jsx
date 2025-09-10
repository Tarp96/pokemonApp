import { useEffect, useMemo, useState } from "react";

const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const DISPLAY_BUCKETS = [4, 2, 1, 0.5, 0.25, 0];

function applyDefensiveRelation(acc, damageRelations) {
  const {
    double_damage_from = [],
    half_damage_from = [],
    no_damage_from = [],
  } = damageRelations;

  double_damage_from.forEach(({ name }) => {
    acc[name] *= 2;
  });
  half_damage_from.forEach(({ name }) => {
    acc[name] *= 0.5;
  });
  no_damage_from.forEach(({ name }) => {
    acc[name] = 0;
  });
}

function applyOffensiveRelations(best, damageRelations) {
  const {
    double_damage_to = [],
    half_damage_to = [],
    no_damage_to = [],
  } = damageRelations;

  double_damage_to.forEach(({ name }) => {
    best[name] = Math.max(best[name], 2);
  });
  half_damage_to.forEach(({ name }) => {
    best[name] = Math.max(best[name], 0.5);
  });
  no_damage_to.forEach(({ name }) => {
    best[name] = Math.max(best[name], 0);
  });
}
