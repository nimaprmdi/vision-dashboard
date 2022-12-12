import { IAccount } from "./account";

interface ITicket {
    itemId: string;
    date: string;
    description: string;
    hasReply: string;
    isClose: string;
    isPending: string;
    subject: string;
    userId: string;
    accounts: IAccount;
}

interface ITicketsInitialState {
    tickets: ITicket[];
    isLoading: boolean;
    totalClosedTickets: number;
    lastFetch: number;
    error: string;
}

interface ITicketFetchSuccessful {
    type: string;
    payload: ITicket[];
}

interface ITicketFetchFailed {
    type: string;
    payload: string;
}

export type { ITicketsInitialState, ITicket, ITicketFetchSuccessful, ITicketFetchFailed };
