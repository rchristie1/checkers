import { createSlice } from "@reduxjs/toolkit";

type TimeCounterState = {
    time: number,
};

const initialState: TimeCounterState = {
    time: 0,
};

const timeCounterSlice = createSlice({
    name: "timeCounter",
    initialState,
    reducers: {
        incrementTime: (state) => {
            state.time += 1;
        },
        resetTime: (state) => {
            state.time = 0;
        },
    }
});

export const { incrementTime, resetTime } = timeCounterSlice.actions;

export default timeCounterSlice.reducer;