import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./account/account";
import entitiesReducer from "./entities/entitiesReducer";
import requestsReducer from "./requests/requests";

const rootReducer = combineReducers({
    account: accountReducer,
    entities: entitiesReducer,
    requests: requestsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
