// Single Account Model
interface Iaccount {
    name: string;
}

// Initial State Model
interface IAccountInitialState {
    accounts: Iaccount[];
    totalAccounts: number;
    isLoading: boolean;
    lastFetch: null | number;
    error: string;
}

// Fetch Successful - Action Model
interface IAccountFetchSuccessful {
    type: string;
    payload: Iaccount[];
}

interface IAccountFetchFailed {
    type: string;
    payload: string;
}

type DispatchType = (args: IAccountFetchSuccessful) => IAccountFetchSuccessful;

export type { Iaccount, IAccountInitialState, IAccountFetchSuccessful, IAccountFetchFailed, DispatchType };
