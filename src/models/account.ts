import { IRequest } from "./request";
import { ITicket } from "./tickets";

interface IAddAccountGithub {
    itemId: string;
    name: string;
    lastName: string;
    userName: string;
    email?: string;
    password?: string;
    confirmPassword?: string | null;
    hasRemember: boolean;
    isAdmin: boolean;
    login: string;
}

interface IAddAccount {
    itemId: string;
    name: string;
    lastName: string;
    userName: string;
    email?: string;
    password?: string;
    confirmPassword?: string | null;
    hasRemember: boolean;
    isAdmin: boolean;
}

interface IAccountLogin {
    email: string;
    userName: string;
    password: string;
    hasRemember: boolean;
    login?: string;
}

interface IAccountLoginError {
    email?: string | undefined | null;
    password?: string | undefined | null;
    hasRemember?: boolean;
}

interface IAddAccountError {
    name?: string | undefined | null;
    lastName?: string | undefined | null;
    email?: string | undefined | null;
    password?: string | undefined | null;
    confirmPassword?: string | undefined | null;
    hasRemember?: string | undefined | null;
}

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
    answeredTickets: JSON;
    answeredRequests: JSON;
    tickets: ITicket[];
    itemTickets: JSON;
    requests: IRequest[];
    itemRequests: JSON;
    createdAt: string;
    login?: string;
    color: {
        hex: string;
    };
    profileImage: {
        url: string;
    };
}

interface IAccountCurrentUserState {
    itemId?: string;
    name?: string;
    lastName?: string;
    email?: string;
    userName?: string;
    password?: string;
    isAdmin?: boolean;
    bio?: string;
    location?: IAccountLocation;
    answeredTickets?: JSON;
    answeredRequests?: JSON;
    tickets?: ITicket[];
    itemTickets?: JSON;
    requests?: IRequest[];
    itemRequests?: JSON;
    createdAt?: string;
    color?: {
        hex: string;
    };
    profileImage?: {
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
    currentAccount: IAccountCurrentUserState;
}

// Fetch Successful - Action Model
interface IAccountReducerIAccount {
    type: string;
    payload: IAccount[];
}

interface IAccountReducerString {
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
    profileImage?: React.ChangeEvent<HTMLInputElement>;
}

type DispatchType = (args: IAccountReducerIAccount) => IAccountReducerIAccount;

export type {
    IAccount,
    IAccountInitialState,
    IAccountReducerIAccount,
    IAccountReducerString,
    DispatchType,
    IEditAccount,
    IAccountLocation,
    IAddAccount,
    IAddAccountError,
    IAccountLogin,
    IAccountLoginError,
    IAddAccountGithub,
    IAccountCurrentUserState,
};
