import { Text, Select } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import * as GameActions from "../../store/game/game";

const DifficultySelector = () => {
  const dispatch = useDispatch();

  const difficulty = useSelector((state) => state.game.difficulty);

  const handleDifficultySelect = (e) => {
    dispatch(GameActions.RESET_GAME());
    dispatch(GameActions.SET_DIFFICULTY(e.target.value));
  };

  return (
    <>
      <Text mb="0.3rem" color="white">
        Choose difficulty
      </Text>
      <Select
        color="white"
        value={difficulty}
        onChange={handleDifficultySelect}
        w="80%"
        size="xs"
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </Select>
    </>
  );
};

export default DifficultySelector;
