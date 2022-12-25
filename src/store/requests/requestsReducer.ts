import * as models from "../../models/request";
import { createSlice } from "@reduxjs/toolkit";

const initialState: models.IRequestsInitialState = {
    requests: [],
    isLoading: true,
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
        FETCH_DATA: (state) => {
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

        // Handlers
        GET_ANSWERED_REQUESTS: (state) => {
            state.answeredRequests = state.requests.filter((request) => request.itemStatus === "solved").length;
        },

        PEND_REQUEST: (state, action: { type: string; payload: string }) => {
            const requestIndex = state.requests.findIndex((request) => request.itemId === action.payload);
            state.requests[requestIndex] = { ...state.requests[requestIndex], itemStatus: "pending" };
        },

        SOLVE_REQUEST: (state, action: { type: string; payload: string }) => {
            const requestIndex = state.requests.findIndex((request) => request.itemId === action.payload);
            state.requests[requestIndex] = { ...state.requests[requestIndex], itemStatus: "solved" };
        },

        REVIEW_REQUEST: (state, action: { type: string; payload: string }) => {
            const requestIndex = state.requests.findIndex((request) => request.itemId === action.payload);
            state.requests[requestIndex] = { ...state.requests[requestIndex], itemStatus: "reviewing" };
        },

        CREATE_REQUEST: (state, action: { type: string; payload: models.IRequest }) => {
            state.requests.push(action.payload);
            // state.requests.push
        },
    },
});

export const { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, GET_ANSWERED_REQUESTS, PEND_REQUEST, SOLVE_REQUEST, REVIEW_REQUEST, CREATE_REQUEST } =
    requestsSlice.actions;

export default requestsSlice.reducer;
