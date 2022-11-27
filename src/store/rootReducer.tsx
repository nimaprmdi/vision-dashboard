import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./account/account";

const rootReducer = combineReducers({
    account: accountReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
