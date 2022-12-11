interface ITicket {
    ticketId: string;
    ticketDate: string;
    ticketDescription: string;
    ticketHasReply: string;
    ticketIsClose: string;
    ticketIsPending: string;
    ticketSubject: string;
    ticketUserId: string;
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
