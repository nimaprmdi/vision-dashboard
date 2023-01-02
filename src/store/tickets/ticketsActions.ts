import moment from "moment";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { toast } from "react-toastify";
import apiService from "../../services/VisionDashboardApiServices";
import * as actions from "./ticketsReducer";
import { ADD_ACCOUNT_TICKET } from "../account/accountsReducer";
import { ITicket } from "../../models/tickets";
import { NavigateFunction } from "react-router-dom";

const fetchTickets = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().tickets;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

    if (diffInMinutes < 10) return;

    apiService.fetchTickets();
};

const closeTicket = (itemId: string, itemStatus: boolean) => (dispatch: Dispatch, getState: () => RootState) => {
    const ticket = getState().tickets.tickets.find((ticket) => ticket.itemId === itemId);

    if (ticket!.isClose === itemStatus) {
        toast.info(`Ticket Already Is ${itemStatus ? "Closed" : "Open"}`);
    } else {
        apiService.updateIsClose(itemId, itemStatus);
    }
};

const deleteTicketAct = (itemId: string) => () => {
    apiService.deleteTicket(itemId);
};

const removeTicketsHistory = () => (dispatch: Dispatch) => {
    dispatch(actions.REMOVE_TICKETS_HISTORY());
};

const addTicket = (accountId: string, ticket: ITicket, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    await apiService.addTicket(accountId, ticket).then((response) => {
        console.log(response);
        dispatch(actions.ADD_TICKET(ticket));
        dispatch(ADD_ACCOUNT_TICKET(response.data.data.createTicket) as any); // Update current account ticket locally
    });

    navigate(`archives/tickets`);
};

export { fetchTickets, closeTicket, deleteTicketAct, removeTicketsHistory, addTicket };
