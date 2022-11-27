import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { AccountState, AccountAction, DispatchType } from "../models/account";
import { Store } from "redux";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export default store;
