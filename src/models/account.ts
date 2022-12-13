// Single Account Model
interface IAccount {
    itemid: string;
    name: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    isAdmin: boolean;
    bio: string;
    location: string;
    itemRequests: JSON;
    answeredTickets: JSON;
    answeredRequests: JSON;
    itemTickets: JSON;
    createdAt: string;
    color: {
        hex: string;
    };
    profileImage: {
        url: string;
    };
}

// Initial State Model
interface IAccountInitialState {
    accounts: IAccount[];
    totalAccounts: number;
    isLoading: boolean;
    lastFetch: null | number;
    error: string;
}

// Fetch Successful - Action Model
interface IAccountFetchSuccessful {
    type: string;
    payload: IAccount[];
}

interface IAccountFetchFailed {
    type: string;
    payload: string;
}

type DispatchType = (args: IAccountFetchSuccessful) => IAccountFetchSuccessful;

export type { IAccount, IAccountInitialState, IAccountFetchSuccessful, IAccountFetchFailed, DispatchType };
