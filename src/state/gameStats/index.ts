import { createSlice } from "@reduxjs/toolkit";

type WinCounterState = {
    ai: number,
    user: number
};

const initialState: WinCounterState = {
    ai: 0,
    user: 0,
};

const winCounterSlice = createSlice({
    name: "winCounter",
    initialState,
    reducers: {
        incrementAIScore: (state) => {
            state.ai += 1;
        },
        incrementUserScore: (state) => {
            state.user += 1;
        },
    }
});

export const { incrementAIScore, incrementUserScore } = winCounterSlice.actions;

export default winCounterSlice.reducer;