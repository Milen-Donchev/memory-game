import { Flex, Text } from "@chakra-ui/react";

import { useResetGame } from "../../hooks/useResetGame";

import Timer from "./Timer";
import ConfirmResetModal from "./ConfirmResetModal";
import RestartGameButton from "./RestartGameButton";
import DifficultySelector from "./DifficultySelector";

const Sidebar = () => {
  const [
    isConfirmModalOpen,
    onResetModalClose,
    openResetModal,
    confirmResetGame,
  ] = useResetGame();

  return (
    <>
      <Flex w="30%" pt="2rem" bg="#171717" h="100vh" direction="column">
        <Flex direction="column" w="100%" align="center">
          <Text mb="1rem" w="80%" textAlign="center" color="white">
            Flip a card from the board to <strong>START</strong>
          </Text>
          <DifficultySelector />
          <RestartGameButton
            confirmResetGame={confirmResetGame}
            openResetModal={openResetModal}
          />
          <Timer />
        </Flex>
      </Flex>

      <ConfirmResetModal
        isOpen={isConfirmModalOpen}
        onClose={onResetModalClose}
        onConfirm={confirmResetGame}
      />
    </>
  );
};

export default Sidebar;
