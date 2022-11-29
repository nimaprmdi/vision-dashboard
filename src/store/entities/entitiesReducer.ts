import { createSlice } from "@reduxjs/toolkit";
import { Entities } from "../../models/entities";

const initialState: Entities = {
    isOpen: false,
};

const entitiesSlice = createSlice({
    name: "entities",
    initialState: initialState as Entities,
    reducers: {
        TOGGLE_MENU: (state, action) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { TOGGLE_MENU } = entitiesSlice.actions;
export default entitiesSlice.reducer;
