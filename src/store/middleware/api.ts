import axios from "axios";
import * as actions from "../api";
import { RootState } from "../rootReducer";
import { Middleware } from "redux";

const api: Middleware<{}, RootState> = (storeApi) => (next) => async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, OnSuccess, onError } = action.payload;

    if (onStart) {
        storeApi.dispatch({ type: onStart });
    }

    next(action);

    try {
        const response = await axios.request({
            baseURL: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clayawfwp14ev01ukh88s2hit/master",
            url,
            method,
            data,
        });

        storeApi.dispatch(response.data);

        if (OnSuccess) {
            storeApi.dispatch({
                type: OnSuccess,
                payload: response.data,
            });
        }
    } catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;

        storeApi.dispatch({ type: actions.apiCallFailed });

        if (onError) {
            storeApi.dispatch(actions.apiCallFailed(message));
        }
    }
};

export default api;
