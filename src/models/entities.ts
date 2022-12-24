interface IServerErrors {
    status: number;
    message: string;
}

interface Entities {
    isOpen: boolean;
    httpErrors: IServerErrors;
    isHttpCalling: boolean;
}

export type { Entities, IServerErrors };
