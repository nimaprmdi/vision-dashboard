import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./account/accountsReducer";
import entitiesReducer from "./entities/entitiesReducer";
import requestsReducer from "./requests/requestsReducer";
import ticketsReducer from "./tickets/ticketsReducer";

const rootReducer = combineReducers({
    entities: entitiesReducer,
    accounts: accountReducer,
    requests: requestsReducer,
    tickets: ticketsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
