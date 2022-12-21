class AccountsQuery {
    readonly fetchAccountsQuery = () => {
        return JSON.stringify({
            query: `{
              accounts {
                id
                name
                lastName
                userName
                email
                location
                itemId
                itemTickets
                itemRequests
                isAdmin
                createdAt
                bio
                answeredTickets
                answeredRequests
                color {
                  hex
                }
                profileImage {
                  url
                }
              }
            }`,
        });
    };

    readonly publishAccountQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
              mutation MyMutation {
                  publishAccount(where: {itemId: "${itemId}"}) {
                      id
                  }
              }
            `,
        });
    };
}
export default new AccountsQuery();
