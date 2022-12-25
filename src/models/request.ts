import { IAccount } from "./account";

interface IAddRequest {
    itemId?: string | undefined | null;
    name?: string | undefined | null;
    lastName?: string | undefined | null;
    gender?: string | undefined | null;
    mobile?: string | undefined | null;
    phone?: string | undefined | null;
    address?: string | undefined | null;
    service?: string | undefined | null;
    description?: string | undefined | null;
    date?: string | undefined | null;
    itemStatus?: string | undefined | null;
}

// Primary Model
interface IRequest {
    itemId: string;
    name: string;
    lastName: string;
    gender: boolean;
    mobile: string;
    phone?: string;
    address: string;
    service: "nurse" | "doctor";
    description: string;
    date: string;
    itemStatus: "pending" | "solved" | "reviewing";
    location: {
        longitude: number;
        latitude: number;
    };
    account?: IAccount;
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

export type { IRequest, IRequestsInitialState, IRequestsFetchSuccessfull, IRequestsFetchFailed, IAddRequest };
