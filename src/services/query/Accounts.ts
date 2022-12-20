class AccountsQuery {
    fetchAccountsQuery = () => {
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
}
export default new AccountsQuery();
