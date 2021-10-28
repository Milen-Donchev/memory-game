import { Flex, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as GameActions from "../store/game/game";

import Card from "./Card";

const PlayingBoard = (props) => {
  const { level = "medium" } = props;

  const dispatch = useDispatch();

  const cards = useSelector((state) => state.game.cards);
  const grid = useSelector((state) => state.game.grid);

  useEffect(() => {
    dispatch(GameActions.SET_CARDS(level));
    dispatch(GameActions.SET_GRID(level));
  }, [level]); // eslint-disable-line

  if (!cards || !grid) return null;

  return (
    <Flex w="100%" justify="center">
      <Grid w="50%" templateColumns={`repeat(${grid.cols}, 1fr)`}>
        {cards.map((card, index) => (
          <Card key={String(index)} cardId={card.id} image={card.image} />
        ))}
      </Grid>
    </Flex>
  );
};

export default PlayingBoard;
