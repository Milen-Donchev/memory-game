import { useState } from "react";
import { Button, Flex, Select, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import * as GameActions from "../store/game/game";

import ConfirmResetModal from "./ConfirmResetModal";

const Sidebar = () => {
  const dispatch = useDispatch();

  const difficulty = useSelector((state) => state.game.difficulty);
  const gameStarted = useSelector((state) => state.game.gameStarted);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleSelect = (e) => {
    dispatch(GameActions.RESET_GAME());
    dispatch(GameActions.SET_DIFFICULTY(e.target.value));
  };

  const onResetModalClose = () => setIsConfirmModalOpen(false);
  const openResetModal = () => setIsConfirmModalOpen(true);

  const resetGame = () => {
    dispatch(GameActions.RESET_GAME());
    onResetModalClose();
  };

  return (
    <Flex bg="#171717" h="100vh" w="30%" direction="column">
      <Flex direction="column" w="100%" align="center">
        <Text color="white">Difficulty</Text>
        <Select
          color="white"
          value={difficulty}
          onChange={handleSelect}
          w="80%"
          size="xs"
        >
          <option value="eazy">eazy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </Select>
      </Flex>
      <Flex w="100%" direction="column" m="1rem 0" align="center">
        <Button
          onClick={openResetModal}
          disabled={!gameStarted}
          w="90%"
          size="xs"
        >
          Reset game
        </Button>
      </Flex>
      <ConfirmResetModal
        isOpen={isConfirmModalOpen}
        onClose={onResetModalClose}
        onConfirm={resetGame}
      />
    </Flex>
  );
};

export default Sidebar;
