import { configureStore } from "@reduxjs/toolkit";
import winCounterReducer from "./gameStats/winCounter"
import timeCounterReducer from "./gameStats/timeCounter"

export const store = configureStore({
    reducer: {
        winCounterReducer,
        timeCounterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;