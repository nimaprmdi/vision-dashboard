import * as actions from "../api";
import * as models from "../../models/requests";
import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";

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

/* Action Creators */
export const loadRequests = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().requests;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < 10) return;

    const data = JSON.stringify({
        query: `{
        requests {
            requestService
            requestDate
            requestStafId
            requestStatus
            requestPhone
            requestName
            requestMobile
            requestLocation
            requestLastName
            requestId
            requestGender
            requestAddress
        }
        }`,
        variables: {},
    });

    dispatch(
        actions.apiCallBegan({
            url: "",
            method: "post",
            data: data,
            onStart: FETCH_DATA.type,
            OnSuccess: FETCH_DATA_SUCCESSFUL.type,
            onError: FETCH_DATA_FAILED.type,
        })
    );
};
