import { createSlice } from "@reduxjs/toolkit";
import * as models from "../../models/account";

const initialState: models.IAccountInitialState = {
    accounts: [],
    isLoading: true,
    lastFetch: null,
    totalAccounts: 0,
    error: "",
};

const accountSlice = createSlice({
    name: "accounts",
    initialState: initialState as models.IAccountInitialState,
    reducers: {
        // FETCHS
        FETCH_DATA: (state) => {
            state.isLoading = true;
        },

        FETCH_DATA_SUCCESSFUL: (state, action: models.IAccountFetchSuccessful) => {
            state.isLoading = false;
            state.accounts = action.payload;
            state.lastFetch = Date.now();
        },

        FETCH_DATA_FAILED: (state, action: models.IAccountFetchFailed) => {
            state.isLoading = false;
            state.accounts = [];
            state.error = action.payload;
        },

        // Functionalities
        GET_TOTAL_ACCOUNTS: (state) => {
            state.totalAccounts = state.accounts.length;
        },
    },
});

export const { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, GET_TOTAL_ACCOUNTS } = accountSlice.actions;
export default accountSlice.reducer;
