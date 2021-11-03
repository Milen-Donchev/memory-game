import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as GameActions from "../store/game/game";

let countdown;

export const useGameTimer = () => {
  const dispatch = useDispatch();

  const gameWon = useSelector((state) => state.game.gameWon);
  const gameStarted = useSelector((state) => state.game.gameStarted);

  const [timer, setTimer] = useState(90);

  const startCountdown = () => {
    countdown = setInterval(() => setTimer((pastTime) => pastTime - 1), 1000);
  };

  useEffect(() => {
    if (!gameStarted) {
      setTimer(90);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      startCountdown();
    }
    return () => clearInterval(countdown);
  }, [gameStarted]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(countdown);
      dispatch(GameActions.SET_GAME_OVER());
    }
  }, [timer]); // eslint-disable-line

  useEffect(() => {
    if (gameWon) {
      clearInterval(countdown);
    }
  }, [gameWon]); // eslint-disable-line

  return [timer];
};
