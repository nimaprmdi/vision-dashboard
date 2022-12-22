interface IAccountLocation {
    longitude: number;
    latitude: number;
}

// Single Account Model
interface IAccount {
    itemId: string;
    name: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    isAdmin: boolean;
    bio: string;
    location: IAccountLocation;
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

interface IEditAccount {
    name?: string | undefined | null;
    lastName?: string | undefined | null;
    email?: string | undefined | null;
    password?: string | undefined | null;
    confirmPassword?: string | undefined | null;
    isAdmin?: boolean;
    bio?: string | undefined | null;
    location?: IAccountLocation;
    color?: string | undefined | null;
    profileImage?: File;
}

type DispatchType = (args: IAccountFetchSuccessful) => IAccountFetchSuccessful;

export type { IAccount, IAccountInitialState, IAccountFetchSuccessful, IAccountFetchFailed, DispatchType, IEditAccount, IAccountLocation };
