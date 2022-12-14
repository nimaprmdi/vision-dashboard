import { createSlice } from "@reduxjs/toolkit";
import { Entities, IServerErrors } from "../../models/entities";

const initialState: Entities = {
    isOpen: false,
    httpErrors: {} as IServerErrors,
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
    },
});

export const { TOGGLE_MENU, ADD_SERVER_ERROR } = entitiesSlice.actions;
export default entitiesSlice.reducer;
