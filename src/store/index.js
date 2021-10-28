import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./game/game";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
