import * as models from "../../models/requests";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import * as actions from "../api";
import moment from "moment";

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
        FETCH_DATA_REQUESTED: (state, action) => {
            console.log("hello");
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

        FETCH_DATA: (state, action) => {
            state.isLoading = true;
        },
    },
});

export const { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, FETCH_DATA_REQUESTED } = requestsSlice.actions;
export default requestsSlice.reducer;

/* Action Creators */
interface IDispatch {
    type: string;
    payload: {};
}

export const fetchRequests = (dispatch: IDispatch, getState: () => RootState) => {
    const { lastFetch } = getState().requests;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < 10) return;
};
