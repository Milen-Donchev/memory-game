import { Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as GameActions from "../store/game/game";

import Card from "./Card";

import background from "../resources/background.jpg";

const PlayingBoard = () => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.game.cards);
  const grid = useSelector((state) => state.game.grid);
  const difficulty = useSelector((state) => state.game.difficulty);
  const gameStarted = useSelector((state) => state.game.gameStarted);
  const correctPicks = useSelector((state) => state.game.correctPicks);

  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (correctPicks.length !== 0 && correctPicks.length === cards.length / 2) {
      setGameWon(true);
    }
  }, [correctPicks]); // eslint-disable-line

  useEffect(() => {
    if (!gameStarted) {
      dispatch(GameActions.SET_CARDS(difficulty));
      dispatch(GameActions.SET_GRID(difficulty));
    }
  }, [difficulty, gameStarted]); // eslint-disable-line

  if (!cards || !grid) return null;

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
        Match the tech tool 🛠
      </Text>
      <Flex
        bg="white"
        boxShadow="0px 0px 7px black"
        p="0.5rem"
        borderRadius="10px"
      >
        {gameWon && <Text>Congratulations!</Text>}
        {!gameWon && (
          <Grid
            w="50%"
            h="80vh"
            maxH="80vh"
            gridGap="0.3rem"
            templateColumns={`repeat(${grid.cols}, 1fr)`}
          >
            {cards.map((card, index) => (
              <Flex key={String(index)}>
                <Card _key={card.key} cardId={card.id} image={card.image} />
              </Flex>
            ))}
          </Grid>
        )}
      </Flex>
    </Flex>
  );
};

export default PlayingBoard;
