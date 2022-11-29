import { createSlice } from "@reduxjs/toolkit";
import { AccountState } from "../../models/account";

const initialState: AccountState = {
    accounts: [{ name: "" }],
    totalAccounts: 0,
};

const accountSlice = createSlice({
    name: "accounts",
    initialState: initialState as AccountState,
    reducers: {
        ADD_USER: (state, action) => {
            state.accounts.push({ name: "hello" });
            return;
        },
    },
});

export const { ADD_USER } = accountSlice.actions;
export default accountSlice.reducer;
