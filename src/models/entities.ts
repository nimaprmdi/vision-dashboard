import { IAccountCurrentUserState } from "../models/account";

interface IServerErrors {
    status: number;
    message: string;
}

interface Entities {
    isOpen: boolean;
    httpErrors: IServerErrors;
    isHttpCalling: boolean;
    currentAccount: IAccountCurrentUserState;
}

export type { Entities, IServerErrors };
