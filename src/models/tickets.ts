import { IAccount } from "./account";

interface ITicketResponse {
    title: string | undefined;
    description: string | undefined;
    isAdmin: boolean;
}

interface IPostTicketCommentData {
    title: string | undefined;
    description: string | undefined;
    isAdmin: boolean;
}

interface ITicket {
    itemId: string;
    date: string;
    description: string;
    hasReply: string;
    isClose: boolean;
    isPending: string;
    subject: string;
    userId: string;
    responses: ITicketResponse[];
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

export type {
    ITicketsInitialState,
    ITicket,
    ITicketFetchSuccessful,
    ITicketFetchFailed,
    ITicketResponse,
    IPostTicketCommentData,
};
