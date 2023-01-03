import { IAccount } from "./account";
import { IRequest } from "./request";

interface ICreateTicketResponseError {
    title?: string | undefined | null;
    description?: string | undefined | null;
}

interface ICreateTicketError {
    subject?: string | undefined | null;
    description?: string | undefined | null;
}

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
    hasReply: boolean;
    isClose: boolean;
    isPending: boolean;
    subject: string;
    responses: ITicketResponse[];
    accounts?: IAccount;
    request?: string;
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
    ICreateTicketResponseError,
    ICreateTicketError,
};
