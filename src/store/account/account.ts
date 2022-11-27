import { createSlice } from "@reduxjs/toolkit";
import { AccountState } from "../../models/account";
import { ADD_USER } from "./accountActions";

const initialState: AccountState = {
    accounts: [{ name: "" }],
    totalAccounts: 0,
};

const accountSlice = createSlice({
    name: "accounts",
    initialState: initialState as AccountState,
    reducers: {
        [ADD_USER.type]: (state, action) => {
            state.accounts.push({ name: "hello" });
            return;
        },
    },
});

export default accountSlice.reducer;
