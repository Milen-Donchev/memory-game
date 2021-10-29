import { createSlice } from "@reduxjs/toolkit";

import { fillBoardAndShuffle, mapDifficultyToGrid } from "../../utils/game";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    difficulty: "medium",
    grid: null,
    selectedCard: null,
    shouldCloseAllCards: false,
    correctPicks: [],
    cards: [],
    gameStarted: false,
  },
  reducers: {
    SET_GRID(state, action) {
      state.grid = mapDifficultyToGrid(action.payload);
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
    RESET_GAME(state) {
      state.cards = [];
      state.correctPicks = [];
      state.shouldCloseAllCards = false;
      state.grid = null;
      state.selectedCard = null;
      state.gameStarted = false;
    },
    START_GAME(state) {
      state.gameStarted = true;
    },
    SET_DIFFICULTY(state, action) {
      state.difficulty = action.payload;
    },
  },
});

export const {
  SET_SELECTED_CARD,
  SET_GRID,
  SET_CORRECT_PICKS,
  SET_SHOULD_CLOSE_ALL_CARDS,
  SET_CARDS,
  RESET_GAME,
  START_GAME,
  SET_DIFFICULTY,
} = gameSlice.actions;
export default gameSlice.reducer;
