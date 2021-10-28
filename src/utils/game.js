import _ from "lodash";

import { CARDS } from "./cards";

export const GRID = {
  easy: "3x4",
  medium: "5x6",
  hard: "7x8",
};

export const mapLevelToGrid = (level) => {
  const grid = GRID[level].split("x");
  return {
    rows: parseInt(grid[0]),
    cols: parseInt(grid[1]),
  };
};

export const getNumOfCards = (level) => {
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
