import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./account/accountsReducer";
import entitiesReducer from "./entities/entitiesReducer";
import requestsReducer from "./requests/requestsReducer";

const rootReducer = combineReducers({
    account: accountReducer,
    entities: entitiesReducer,
    requests: requestsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
