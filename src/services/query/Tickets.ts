import { ITicket, ITicketResponse } from "../../models/tickets";

class TicketsQuery {
    readonly fetchTicketsQuery = () => {
        return JSON.stringify({
            query: `{
              tickets {
                itemId
                isPending
                isClose
                id
                hasReply
                description
                date
                subject
                responses
                accounts {
                  ... on Account {
                    id
                    email
                    name
                    lastName
                    isAdmin
                    color {
                      hex
                    }
                    profileImage {
                      url
                    }
                  }
                }
              }
            }`,
        });
    };

    readonly updateResponseQuery = (itemId: string, data: ITicketResponse[]) => {
        return JSON.stringify({
            query: `mutation updateTicket($data: Json) {
                        updateTicket(data: { responses : $data } , where: {itemId: "${itemId}"}) {
                            id
                        }
                    }`,
            variables: {
                data: data,
            },
        });
    };

    readonly updateIsCloseQuery = (itemId: string, isClose: boolean) => {
        return JSON.stringify({
            query: `mutation {
                        updateTicket(data: { isClose : ${isClose} } , where: {itemId: "${itemId}"}) {
                            id
                        }
                    }
            `,
        });
    };

    readonly deleteTicketQuery = (itemdId: string) => {
        return JSON.stringify({
            query: `mutation {
                deleteTicket(where: {itemId: "${itemdId}"}) {
                    id
                }
            }`,
        });
    };

    readonly publsishTicketQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation MyMutation {
                    publishTicket(where: {itemId: "${itemId}"}) { id }
                } 
            `,
        });
    };

    readonly addTicketQuery = (accountId: string, data: ITicket) => {
        console.log("addTicketQuery :", data);
        console.log("accountId :", accountId);

        data.accounts && delete data.accounts;

        return JSON.stringify({
            query: `
                mutation createTicket(
                    $itemId: String!,
                    $description: String!,
                    $date: DateTime!,
                    $hasReply: Boolean!,
                    $isClose: Boolean!,
                    $isPending: Boolean!,
                    $accountId: String,
                    $responses: Json,
                    $subject: String,
                ) {
                    createTicket(
                        data: {
                            itemId: $itemId,
                            description: $description,
                            date: $date,
                            hasReply: $hasReply,
                            isClose: $isClose,
                            isPending: $isPending,
                            accounts: { connect: { Account: { itemId: $accountId } } },
                            responses: $responses,
                            subject: $subject,
                        }   
                    ) {
                        itemId
                        isPending
                        isClose
                        id
                        hasReply
                        description
                        date
                        subject
                        responses
                        accounts {
                          ... on Account {
                            id
                            email
                            name
                            lastName
                            isAdmin
                            color {
                              hex
                            }
                            profileImage {
                              url
                            }
                          }
                        }
                    }
                }`,
            variables: {
                itemId: data.itemId,
                description: data.description,
                date: data.date,
                hasReply: data.hasReply,
                isClose: data.isClose,
                isPending: data.isPending,
                accountId: accountId,
                responses: data.responses,
            },
        });
    };
}
export default new TicketsQuery();
