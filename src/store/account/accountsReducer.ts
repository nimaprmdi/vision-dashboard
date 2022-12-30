import { createSlice } from "@reduxjs/toolkit";
import * as models from "../../models/account";

const initialState: models.IAccountInitialState = {
    accounts: [],
    isLoading: true,
    lastFetch: null,
    totalAccounts: 0,
    error: "",
    currentAccount: {},
};

const accountSlice = createSlice({
    name: "accounts",
    initialState: initialState as models.IAccountInitialState,
    reducers: {
        // FETCHS
        FETCH_DATA: (state) => {
            state.isLoading = true;
        },

        FETCH_DATA_SUCCESSFUL: (state, action: models.IAccountReducerIAccount) => {
            state.isLoading = false;
            state.accounts = action.payload;
            state.lastFetch = Date.now();
        },

        FETCH_DATA_FAILED: (state, action: models.IAccountReducerString) => {
            state.isLoading = false;
            state.accounts = [];
            state.error = action.payload;
        },

        // Functionalities
        GET_TOTAL_ACCOUNTS: (state) => {
            state.totalAccounts = state.accounts.length;
        },

        DELETE_ACCOUNT: (state, action: models.IAccountReducerString) => {
            const accountItems = state.accounts.filter((account) => account.itemId !== action.payload);
            state.accounts = accountItems;
        },

        CREATE_ACCOUNT: (state, action: { type: string; payload: models.IAccount }) => {
            state.accounts.push(action.payload);
        },

        SELECT_CURRENT_USER: (state, action: { type: string; payload: number }) => {
            state.currentAccount = state.accounts[action.payload];
        },

        REMOVE_CURRENT_USER: (state) => {
            state.currentAccount = {};
        },

        REMOVE_ACCOUNT_HISTORY: (state) => {
            state.accounts = [];
            state.isLoading = true;
            state.lastFetch = null;
            state.totalAccounts = 0;
            state.error = "";
            state.currentAccount = {};
        },

        SET_LOADING_STATUS: (state, action: { type: string; payload: boolean }) => {
            state.isLoading = action.payload;
        },
    },
});

export const {
    FETCH_DATA,
    FETCH_DATA_SUCCESSFUL,
    FETCH_DATA_FAILED,
    GET_TOTAL_ACCOUNTS,
    DELETE_ACCOUNT,
    CREATE_ACCOUNT,
    SELECT_CURRENT_USER,
    REMOVE_CURRENT_USER,
    REMOVE_ACCOUNT_HISTORY,
    SET_LOADING_STATUS,
} = accountSlice.actions;
export default accountSlice.reducer;
