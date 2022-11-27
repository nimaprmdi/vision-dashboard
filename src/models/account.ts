interface Iaccount {
    name: string;
}

type AccountState = {
    accounts: Iaccount[];
    totalAccounts: number;
};

type AccountAction = {
    type: string;
    article: Iaccount;
};

type DispatchType = (args: AccountAction) => AccountAction;

export type { Iaccount, AccountState, AccountAction, DispatchType };
