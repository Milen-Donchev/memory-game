import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import * as GameActions from "../store/game/game";

let gameWonTimeout;

export const useGameSetup = () => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.game.cards);
  const grid = useSelector((state) => state.game.grid);
  const gameStarted = useSelector((state) => state.game.gameStarted);
  const difficulty = useSelector((state) => state.game.difficulty);
  const correctPicks = useSelector((state) => state.game.correctPicks);
  const gameWon = useSelector((state) => state.game.gameWon);
  const gameOver = useSelector((state) => state.game.gameOver);

  useEffect(() => {
    if (!gameStarted) {
      dispatch(GameActions.SET_CARDS(difficulty));
      dispatch(GameActions.SET_GRID(difficulty));
    }
  }, [difficulty, gameStarted]); // eslint-disable-line

  useEffect(() => {
    if (!isEmpty(correctPicks) && correctPicks.length === cards.length / 2) {
      gameWonTimeout = setTimeout(
        () => dispatch(GameActions.SET_GAME_WON()),
        500
      );
    }
    return () => clearTimeout(gameWonTimeout);
  }, [correctPicks]); // eslint-disable-line

  return [cards, grid, gameWon, gameOver];
};
