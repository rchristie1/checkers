import { configureStore } from "@reduxjs/toolkit";
import winCounterReducer from "./gameStats/index"

export const store = configureStore({
    reducer: {
        winCounterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;