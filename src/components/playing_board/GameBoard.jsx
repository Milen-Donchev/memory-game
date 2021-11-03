import { Grid, Flex } from "@chakra-ui/react";

import Card from "./Card";

const GameBoard = (props) => {
  const { cards, grid } = props;

  if (!cards || !grid) return null;

  return (
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
  );
};

export default GameBoard;
