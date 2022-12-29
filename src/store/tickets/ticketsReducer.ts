import { createSlice } from "@reduxjs/toolkit";
import { ITicketsInitialState } from "../../models/tickets";

const initialState: ITicketsInitialState = {
    tickets: [],
    isLoading: true,
    totalClosedTickets: 0,
    lastFetch: 0,
    error: "",
};

const ticketsSlice = createSlice({
    name: "tickets",
    initialState: initialState as ITicketsInitialState,
    reducers: {
        // Fetch
        FETCH_DATA: (state) => {
            state.isLoading = true;
        },

        FETCH_DATA_SUCCESSFUL: (state, action) => {
            state.tickets = action.payload;
            state.isLoading = false;
        },

        FETCH_DATA_FAILED: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        // Handlers
        GET_ALL_CLOSED_TICKETS: (state) => {
            state.totalClosedTickets = state.tickets.filter((ticket) => ticket.isClose).length;
        },

        PEND_TICKET: (state, action: { type: string; payload: string }) => {
            const ticketIndex = state.tickets.findIndex((ticket) => ticket.itemId === action.payload);
            state.tickets[ticketIndex] = { ...state.tickets[ticketIndex], isClose: true };
        },

        DELETE_TICKET: (state, action: { type: string; payload: string }) => {
            state.tickets = state.tickets.filter((ticket) => ticket.itemId !== action.payload);
        },

        REMOVE_TICKETS_HISTORY: (state) => {
            state.tickets = [];
            state.isLoading = true;
            state.totalClosedTickets = 0;
            state.lastFetch = 0;
            state.error = "";
        },
    },
});

export const { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, GET_ALL_CLOSED_TICKETS, PEND_TICKET, DELETE_TICKET, REMOVE_TICKETS_HISTORY } =
    ticketsSlice.actions;
export default ticketsSlice.reducer;
