import * as models from "../../models/requests";
import { createSlice } from "@reduxjs/toolkit";

const initialState: models.IRequestsInitialState = {
    requests: [],
    isLoading: false,
    lastFetch: null,
    totalRequests: 0,
    answeredRequests: 0,
    pendingRequests: 0,
    error: "",
};

const requestsSlice = createSlice({
    name: "requests",
    initialState: initialState as models.IRequestsInitialState,
    reducers: {
        // FETCHS
        FETCH_DATA: (state, action) => {
            state.isLoading = true;
        },

        FETCH_DATA_SUCCESSFUL: (state, action: models.IRequestsFetchSuccessfull) => {
            state.isLoading = false;
            state.requests = action.payload;
            state.lastFetch = Date.now();
        },

        FETCH_DATA_FAILED: (state, action: models.IRequestsFetchFailed) => {
            state.isLoading = false;
            state.requests = [];
            state.error = action.payload;
        },
    },
});

export const { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED } = requestsSlice.actions;
export default requestsSlice.reducer;
