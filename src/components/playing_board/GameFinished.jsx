import { Flex, Image, Text } from "@chakra-ui/react";

import sadFace from "../../resources/game-over.svg";
import happyFace from "../../resources/game-win.svg";

const GameFinished = ({ gameWon }) => {
  return (
    <Flex
      direction="column"
      backgroundColor="white"
      borderRadius="10px"
      align="center"
      p="3rem"
    >
      <Text>{gameWon ? "Congratulations Champ!" : "Game Over"}</Text>
      <Image mt="1rem" src={gameWon ? happyFace : sadFace} w="6rem" h="6rem" />
    </Flex>
  );
};

export default GameFinished;
