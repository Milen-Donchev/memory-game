import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip";

import { useFlipCard } from "../../hooks/useFlipCard";

import cardBack from "../../resources/card-back.svg";

const Card = (props) => {
  const { cardId, image, _key } = props;

  const [isFlipped, flipBackOngoing, disableCard, cardAlreadyPaired, flipCard] =
    useFlipCard(cardId);

  const grid = useSelector((state) => state.game.grid);

  const cardWidth = `calc((50vw - (${grid.cols - 1}*0.3rem))/${grid.cols})`;
  const cardHeight = `calc((80vh - (${grid.rows - 1}*0.3rem) )/ ${grid.rows})`;

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
        flipSpeedFrontToBack={0.4}
        flipSpeedBackToFront={0.4}
        isFlipped={disableCard ? true : isFlipped}
      >
        <Flex
          backgroundImage={cardBack}
          backgroundSize="100% 100%"
          draggable="false"
          userSelect="none"
          h={cardHeight}
          objectFit="fill"
          w={cardWidth}
        />
        <Flex justify="center" align="center" w={cardWidth} h={cardHeight}>
          <Flex
            w="90%"
            h="90%"
            backgroundImage={image}
            backgroundPosition="center"
            backgroundSize="100% 100%"
            borderRadius="10px"
            draggable="false"
            userSelect="none"
          />
        </Flex>
      </ReactCardFlip>
    </Flex>
  );
};

export default Card;
