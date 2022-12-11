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
        FETCH_DATA: (state, action) => {
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
            state.totalClosedTickets = state.tickets.filter((ticket) => ticket.ticketIsClose).length;
        },
    },
});

export const { FETCH_DATA, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED, GET_ALL_CLOSED_TICKETS } = ticketsSlice.actions;
export default ticketsSlice.reducer;
