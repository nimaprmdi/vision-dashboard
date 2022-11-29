import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./account/account";
import entitiesReducer from "./entities/entitiesReducer";

const rootReducer = combineReducers({
    account: accountReducer,
    entities: entitiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
