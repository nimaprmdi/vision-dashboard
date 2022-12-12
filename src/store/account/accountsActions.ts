import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";
import moment from "moment";
import { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, GET_TOTAL_ACCOUNTS } from "./accountsReducer";
import * as http from "../../services/httpServices";

const fetchAccounts = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().accounts;
    const diffIMinutes = moment().diff(moment(lastFetch), "minutes");

    if (diffIMinutes < 10) return;

    const data = JSON.stringify({
        query: `{
          accounts {
            id
            name
            lastName
            userName
            email
            location
            itemid
            itemTickets
            itemRequests
            isAdmin
            createdAt
            bio
            answeredTickets
            answeredRequests
            color {
              hex
            }
            profileImage {
              url
              updatedAt
            }
          }
        }`,
        variables: {},
    });

    dispatch(FETCH_DATA());

    http.default
        .post("", data)
        .then((response) => {
            const accounts = response.data;

            dispatch(FETCH_DATA_SUCCESSFUL(accounts.data.accounts));
            dispatch(GET_TOTAL_ACCOUNTS());
        })
        .catch((error) => {
            const errorMsg = error.message;
            dispatch(FETCH_DATA_FAILED(errorMsg));
        });
};

export default fetchAccounts;
