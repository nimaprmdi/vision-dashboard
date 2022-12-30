import { createSlice } from "@reduxjs/toolkit";
import { Entities, IServerErrors } from "../../models/entities";

const initialState: Entities = {
    isOpen: false,
    httpErrors: {} as IServerErrors,
    isHttpCalling: false,
    currentAccount: {},
};

const entitiesSlice = createSlice({
    name: "entities",
    initialState: initialState as Entities,
    reducers: {
        TOGGLE_MENU: (state) => {
            state.isOpen = !state.isOpen;
        },

        ADD_SERVER_ERROR: (state, action: { type: string; payload: IServerErrors }) => {
            state.httpErrors = action.payload;
        },

        CHANGE_HTTP_CALL_STATUS: (state, action: { type: string; payload: boolean }) => {
            state.isHttpCalling = action.payload;
        },
    },
});

export const { TOGGLE_MENU, ADD_SERVER_ERROR, CHANGE_HTTP_CALL_STATUS } = entitiesSlice.actions;
export default entitiesSlice.reducer;
