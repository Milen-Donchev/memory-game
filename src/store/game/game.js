import { createSlice } from "@reduxjs/toolkit";

import { fillBoardAndShuffle, mapLevelToGrid } from "../../utils/game";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    grid: null,
    selectedCard: null,
    shouldCloseAllCards: false,
    correctPicks: [],
    cards: [],
  },
  reducers: {
    SET_GRID(state, action) {
      state.grid = mapLevelToGrid(action.payload);
    },
    SET_SELECTED_CARD(state, action) {
      state.selectedCard = action.payload;
    },
    SET_SHOULD_CLOSE_ALL_CARDS(state, action) {
      state.shouldCloseAllCards = action.payload;
    },
    SET_CORRECT_PICKS(state, action) {
      state.correctPicks = [...state.correctPicks, action.payload];
    },
    SET_CARDS(state, action) {
      state.cards = fillBoardAndShuffle(action.payload);
    },
  },
});

export const {
  SET_SELECTED_CARD,
  SET_GRID,
  SET_CORRECT_PICKS,
  SET_SHOULD_CLOSE_ALL_CARDS,
  SET_CARDS,
} = gameSlice.actions;
export default gameSlice.reducer;
