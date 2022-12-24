import moment from "moment";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { toast } from "react-toastify";
import apiService from "../../services/VisionDashboardApiServices";

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

export { fetchTickets, closeTicket, deleteTicketAct };
