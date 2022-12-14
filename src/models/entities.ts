interface IServerErrors {
    status: number;
    message: string;
}

interface Entities {
    isOpen: boolean;
    httpErrors: IServerErrors;
}

export type { Entities, IServerErrors };
