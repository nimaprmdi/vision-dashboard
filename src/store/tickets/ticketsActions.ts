import * as http from "../../services/httpServices";
import moment from "moment";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, GET_ALL_CLOSED_TICKETS } from "./ticketsReducer";

const fetchTickets = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().tickets;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

    if (diffInMinutes < 10) return;

    const data = JSON.stringify({
        query: `{
          tickets {
            userId
            itemId
            isPending
            isClose
            id
            hasReply
            description
            date
            subject
            responses
            accounts {
              ... on Account {
                id
                email
                name
                lastName
                isAdmin
                color {
                  hex
                }
                profileImage {
                  url
                }
              }
            }
          }
        }`,
        variables: {},
    });

    dispatch(FETCH_DATA);

    http.default
        .post("", data)
        .then((response) => {
            const tickets = response.data;

            dispatch(FETCH_DATA_SUCCESSFUL(tickets.data.tickets));
            dispatch(GET_ALL_CLOSED_TICKETS());
        })
        .catch((error) => {
            const errorMsg = error.message;
            dispatch(FETCH_DATA_FAILED(errorMsg));
        });
};

export default fetchTickets;
