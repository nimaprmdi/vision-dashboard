import * as http from "../../services/httpServices";
import moment from "moment";
import { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, GET_ANSWERED_REQUESTS } from "./requestsReducer";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";

const fetchRequests = () => (dispatch: Dispatch, getState: () => RootState) => {
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

    dispatch(FETCH_DATA());

    http.default
        .post("", data)
        .then((response) => {
            const requests = response.data;

            dispatch(FETCH_DATA_SUCCESSFUL(requests.data.requests));
            dispatch(GET_ANSWERED_REQUESTS());
        })
        .catch((error) => {
            console.log(error);

            const errorMsg = error.message;

            dispatch(FETCH_DATA_FAILED(errorMsg));
        });
};

export default fetchRequests;
