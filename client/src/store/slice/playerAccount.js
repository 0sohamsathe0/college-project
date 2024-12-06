import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

const playerAccount = createSlice(
    {
        name: "playerStatus",
        initialState,
        reducers: {
            changePlayerAccountStatus: (state) => {
                state.value = !state.value;
            },

        }

    }
)

export const { changePlayerAccountStatus } = playerAccount.actions;
export const checkPlayerAccountStatus = (state) => state.playerStatus.value;

export default playerAccount.reducer;