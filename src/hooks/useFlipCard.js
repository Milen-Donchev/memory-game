import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { includes } from "lodash";

import * as GameActions from "../store/game/game";

let flipTimeout;

export const useFlipCard = (cardId) => {
  const dispatch = useDispatch();

  const gameStarted = useSelector((state) => state.game.gameStarted);
  const selectedCard = useSelector((state) => state.game.selectedCard);
  const correctPicks = useSelector((state) => state.game.correctPicks);
  const shouldCloseAll = useSelector((state) => state.game.shouldCloseAllCards);

  const [isFlipped, setIsFlipped] = useState(false);
  const [flipBackOngoing, setFlipBackOngoing] = useState(false);
  const [disableCard, setDisableCard] = useState(false);

  const cardAlreadyPaired = includes(correctPicks, cardId);

  const flipCard = () => {
    if (!gameStarted) {
      dispatch(GameActions.START_GAME());
    }
    if (cardAlreadyPaired || isFlipped || flipBackOngoing) {
      return;
    }
    if (!isFlipped && !selectedCard) {
      dispatch(GameActions.SET_SELECTED_CARD(cardId));
      setIsFlipped(true);
      return;
    }
    if (selectedCard && selectedCard === cardId) {
      setIsFlipped(true);
      dispatch(GameActions.SET_CORRECT_PICKS(cardId));
      dispatch(GameActions.SET_SELECTED_CARD(null));
      setDisableCard(true);
      return;
    }
    if (selectedCard && selectedCard !== cardId) {
      setIsFlipped(true);
      dispatch(GameActions.SET_SELECTED_CARD(null));
      dispatch(GameActions.SET_SHOULD_CLOSE_ALL_CARDS(true));
    }
  };

  useEffect(() => {
    if (shouldCloseAll && !cardAlreadyPaired) {
      setFlipBackOngoing(true);
      flipTimeout = setTimeout(() => {
        setIsFlipped(false);
        dispatch(GameActions.SET_SELECTED_CARD(null));
        dispatch(GameActions.SET_SHOULD_CLOSE_ALL_CARDS(false));
        setFlipBackOngoing(false);
      }, 300);
    }
  }, [shouldCloseAll]); // eslint-disable-line

  useEffect(() => {
    if (cardAlreadyPaired) {
      setDisableCard(true);
    }
    return () => clearTimeout(flipTimeout);
  }, [cardAlreadyPaired]);

  return [isFlipped, flipBackOngoing, disableCard, cardAlreadyPaired, flipCard];
};
