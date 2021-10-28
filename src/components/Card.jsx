import ReactCardFlip from "react-card-flip";
import { Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import * as GameActions from "../store/game/game";

let flipTimeout;

const Card = (props) => {
  const { cardId, image, key } = props;

  const dispatch = useDispatch();

  const correctPicks = useSelector((state) => state.game.correctPicks);
  const shouldCloseAllCards = useSelector(
    (state) => state.game.shouldCloseAllCards
  );
  const selectedCard = useSelector((state) => state.game.selectedCard);

  const [isFlipped, setIsFlipped] = useState(false);
  const [disableCard, setDisableCard] = useState(false);
  const [flipBackOngoing, setFlipBackOngoing] = useState(false);

  const flipCard = () => {
    if (_.includes(correctPicks, cardId) || isFlipped || flipBackOngoing)
      return;
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
    if (shouldCloseAllCards && !_.includes(correctPicks, cardId)) {
      setFlipBackOngoing(true);
      flipTimeout = setTimeout(() => {
        setIsFlipped(false);
        dispatch(GameActions.SET_SELECTED_CARD(null));
        dispatch(GameActions.SET_SHOULD_CLOSE_ALL_CARDS(false));
        setFlipBackOngoing(false);
      }, 400);
    }
  }, [shouldCloseAllCards]); // eslint-disable-line

  useEffect(() => {
    if (_.includes(correctPicks, cardId)) {
      setDisableCard(true);
    }
    return () => clearTimeout(flipTimeout);
  }, [correctPicks, cardId]);

  return (
    <Flex
      m="0.2rem"
      h="5rem"
      key={key}
      borderRadius="10px"
      overflow="hidden"
      boxShadow={disableCard && `0px 3px 3px lime`}
    >
      <ReactCardFlip isFlipped={disableCard ? true : isFlipped} infinite>
        <Image
          boxShadow="0px 2px 3px rgba(0, 0, 0, 0.75)"
          onClick={flipCard}
          src="https://picsum.photos/200"
          w="100%"
          userSelect="none"
          draggable="false"
        />
        <Flex
          onClick={flipCard}
          bg="rgba(0,0,0,0.2)"
          w="100%"
          justify="center"
          align="center"
        >
          <Image w="100%" draggable="false" userSelect="none" src={image} />
        </Flex>
      </ReactCardFlip>
    </Flex>
  );
};

export default Card;
