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
                id
                itemId
                itemStatus
                lastName
                location
                mobile
                name
                phone
                service
                stafId
                date
                gender
                address
                description
                location
                account {
                    name
                    lastName
                    userName
                    isAdmin
                    color {
                        hex
                    }
                    profileImage {
                        url
                    }
                }
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
            const errorMsg = error.message;
            dispatch(FETCH_DATA_FAILED(errorMsg));
        });
};

const createUser = () => (dispatch: Dispatch, getState: () => RootState) => {
    var data = JSON.stringify({
        query: `
        mutation createUser($name: String!) {
            createRequest(
                data:{
                    itemId: 11,
                    name: $name,
                    lastName: "hosseini",
                    gender: false,
                    mobile: "09391391979",
                    address: "tehran azadi",
                    service: "nurse",
                    date: "2022-12-12T13:36:44.448Z",
                    stafId: "clbaft2323uap0bw567bfg99z",
                    itemStatus: "pending",
                    description: "Hello Desc",
                    phone: "02144904064"
                }
            ) 
            {
                id
            }
        }`,
        variables: { name: "ali" },
    });
};

export default fetchRequests;
