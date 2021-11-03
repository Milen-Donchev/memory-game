import { Flex, Text } from "@chakra-ui/react";

import { useGameSetup } from "../../hooks/useGameSetup";

import GameBoard from "./GameBoard";
import GameFinished from "./GameFinished";

import background from "../../resources/background.jpg";

const PlayingBoard = () => {
  const [cards, grid, gameWon, gameOver] = useGameSetup();

  return (
    <Flex
      backgroundImage={background}
      backgroundSize="cover"
      direction="column"
      w="100%"
      h="100vh"
      align="center"
    >
      <Text
        m="0.5rem 0 1rem 0"
        fontSize="1.5rem"
        fontWeight="bold"
        fontFamily="cursive"
        textShadow="1px 1px 1px yellow"
      >
        Match the tech tool
      </Text>
      <Flex
        bg="white"
        boxShadow="0px 0px 7px black"
        p="0.5rem"
        borderRadius="10px"
      >
        {!gameWon && !gameOver ? (
          <GameBoard cards={cards} grid={grid} />
        ) : (
          <GameFinished gameWon={gameWon} />
        )}
      </Flex>
    </Flex>
  );
};

export default PlayingBoard;
