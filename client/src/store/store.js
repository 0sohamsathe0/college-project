import { configureStore } from "@reduxjs/toolkit";
import playerAccountReducer from "./slice/playerAccount"
export const store = configureStore({
    reducer: {
        playerStatus: playerAccountReducer,
    }
})