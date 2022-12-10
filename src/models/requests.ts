interface IRequestAccount {
    accountProfileImage?: {
        url: string;
    };
    accountColor: {
        hex: string;
    };
}

// Primary Model
interface IRequests {
    requestId: number;
    account: IRequestAccount;
    requestDate: string;
    requestName: string;
    requestLastName: string;
    requestService: string;
    requestStatus: "pending" | "solved";
    requestMobile: string;
    requestPhone: string;
    requestStafId: string;
    requestGender: boolean;
    requestAddress: string;
}

// Initial State - Reducer Model
interface IRequestsInitialState {
    requests: IRequests[];
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
    payload: IRequests[];
}

interface IRequestsFetchFailed {
    type: string;
    payload: string;
}

export type { IRequests, IRequestsInitialState, IRequestsFetchSuccessfull, IRequestsFetchFailed };
