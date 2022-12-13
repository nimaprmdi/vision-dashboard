import { IAccount } from "./account";

// Primary Model
interface IRequest {
    itemId: string;
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
    description: string;
    location: {
        longitude: number;
        latitude: number;
    };
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
