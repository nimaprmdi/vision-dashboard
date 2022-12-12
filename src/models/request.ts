import { IAccount } from "./account";

// Primary Model
interface IRequest {
    itemId: number;
    date: string;
    name: string;
    lastName: string;
    service: string;
    itemStatus: "pending" | "solved";
    mobile: string;
    phone: string;
    stafId: string;
    gender: boolean;
    address: string;
    account: IAccount;
}

// Initial State - Reducer Model
interface IRequestsInitialState {
    requests: IRequest[];
    isLoading: boolean;
    lastFetch: null | number;
    error: string;
    totalRequests: number;
    answeredRequests: number;
    pendingRequests: number;
}

// FETCH SUCCESSFUL Model
interface IRequestsFetchSuccessfull {
    type: string;
    payload: IRequest[];
}

interface IRequestsFetchFailed {
    type: string;
    payload: string;
}

export type { IRequest, IRequestsInitialState, IRequestsFetchSuccessfull, IRequestsFetchFailed };
