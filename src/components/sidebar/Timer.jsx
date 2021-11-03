import { Flex, Text } from "@chakra-ui/react";

import { useGameTimer } from "../../hooks/useGameTimer";

const Timer = () => {
  const [timer] = useGameTimer();

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
      <Text fontSize="0.8rem" w="80%" textAlign="center" color="white">
        {timer > 30
          ? "Finish the game before the time expires"
          : timer !== 0
          ? "Hurry!!!"
          : "No worries! You will get it next time. Just click the button above."}
      </Text>
      <Text
        mt="0.2rem"
        color={timer > 60 ? "lime" : timer > 30 ? "orange" : "red"}
      >
        {timer > 60 ? `1m ${timer - 60}s` : `${timer}s`}
      </Text>
    </Flex>
  );
};

export default Timer;
