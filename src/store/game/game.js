import { createSlice } from "@reduxjs/toolkit";

import { fillBoardAndShuffle, mapDifficultyToGrid } from "../../utils/game";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    difficulty: "medium", // easy | medium | hard
    grid: null, // {cols: number; rows: number} | null
    selectedCard: null, // number | null;
    shouldCloseAllCards: false, // true | false
    correctPicks: [], // number[]
    cards: [], // cards[]
    gameStarted: false, // true | false
    gameWon: false, // true | false
    gameOver: false, // true | false
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
      state.gameWon = false;
      state.gameOver = false;
    },
    START_GAME(state) {
      state.gameStarted = true;
    },
    SET_DIFFICULTY(state, action) {
      state.difficulty = action.payload;
    },
    SET_GAME_WON(state) {
      state.gameWon = true;
    },
    SET_GAME_OVER(state) {
      state.gameOver = true;
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
  SET_GAME_WON,
  SET_GAME_OVER,
} = gameSlice.actions;
export default gameSlice.reducer;
