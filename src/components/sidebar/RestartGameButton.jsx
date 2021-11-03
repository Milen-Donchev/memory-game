import { Flex, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const RestartGameButton = (props) => {
  const { confirmResetGame, openResetModal } = props;

  const gameStarted = useSelector((state) => state.game.gameStarted);
  const gameWon = useSelector((state) => state.game.gameWon);
  const gameOver = useSelector((state) => state.game.gameOver);

  return (
    <Flex w="100%" direction="column" m="1rem 0" align="center">
      <Button
        onClick={gameWon || gameOver ? confirmResetGame : openResetModal}
        disabled={!gameStarted}
        w="80%"
        size="xs"
      >
        {!gameWon && !gameOver
          ? "Reset game"
          : gameWon
          ? "New game"
          : "Try again"}
      </Button>
    </Flex>
  );
};

export default RestartGameButton;
