import ReactCardFlip from "react-card-flip";
import { Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import * as GameActions from "../store/game/game";

import cardBack from "../resources/card-back.svg";

let flipTimeout;

const Card = (props) => {
  const { cardId, image, _key } = props;

  const dispatch = useDispatch();

  const selectedCard = useSelector((state) => state.game.selectedCard);
  const grid = useSelector((state) => state.game.grid);
  const correctPicks = useSelector((state) => state.game.correctPicks);
  const shouldCloseAllCards = useSelector(
    (state) => state.game.shouldCloseAllCards
  );

  const [isFlipped, setIsFlipped] = useState(false);
  const [disableCard, setDisableCard] = useState(false);
  const [flipBackOngoing, setFlipBackOngoing] = useState(false);

  const cardAlreadyPaired = _.includes(correctPicks, cardId);
  const cardWidth = `calc((50vw - (${grid.cols - 1}*0.3rem))/${grid.cols})`;
  const cardHeight = `calc((80vh - (${grid.rows - 1}*0.3rem) )/ ${grid.rows})`;

  const flipCard = () => {
    dispatch(GameActions.START_GAME());
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
      }, 300);
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
      boxShadow={cardAlreadyPaired && "0px 0px 5px lime"}
      cursor={flipBackOngoing || cardAlreadyPaired ? "no-drop" : "pointer"}
      onClick={flipCard}
      w={cardWidth}
      h={cardHeight}
      key={_key}
      borderRadius="10px"
    >
      <ReactCardFlip
        containerStyle={cardStyles}
        isFlipped={disableCard ? true : isFlipped}
        infinite
      >
        <Image
          src={cardBack}
          userSelect="none"
          h={cardHeight}
          objectFit="fill"
          w={cardWidth}
        />
        <Flex justify="center" align="center" w={cardWidth} h={cardHeight}>
          <Image
            w="90%"
            h="90%"
            objectFit="fill"
            borderRadius="10px"
            draggable="false"
            userSelect="none"
            src={image}
          />
        </Flex>
      </ReactCardFlip>
    </Flex>
  );
};

const cardStyles = {
  borderRadius: "10px",
  overflow: "hidden",
};

export default Card;
