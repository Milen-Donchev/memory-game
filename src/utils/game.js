import _ from "lodash";

import { CARDS } from "./cards";

const GRID = {
  eazy: "3x4",
  medium: "4x5",
  hard: "5x6",
};

export const mapDifficultyToGrid = (level) => {
  const grid = GRID[level].split("x");
  return {
    rows: parseInt(grid[0]),
    cols: parseInt(grid[1]),
  };
};

const getNumOfCards = (level) => {
  const grid = GRID[level].split("x");
  return parseInt(grid[0]) * parseInt(grid[1]);
};

export const fillBoardAndShuffle = (level) => {
  const allCards = getNumOfCards(level);

  const cardsArray = [];
  const shuffledAllCards = _.shuffle([...CARDS]);

  for (let i = 0; i < allCards / 2; i++) {
    cardsArray.push(shuffledAllCards[i]);
    cardsArray.push(shuffledAllCards[i]);
  }

  return _.shuffle(cardsArray);
};
