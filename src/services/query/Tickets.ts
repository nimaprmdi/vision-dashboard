import { ITicketResponse } from "../../models/tickets";

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
}
export default new TicketsQuery();
