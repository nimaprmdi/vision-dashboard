import { ITicketResponse } from "../../models/tickets";

class TicketsQuery {
    readonly updateResponse = (itemId: string, data: ITicketResponse[]) => {
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

    readonly updateIsClose = (itemId: string, isClose: boolean) => {
        return JSON.stringify({
            query: `mutation {
                        updateTicket(data: { isClose : ${isClose} } , where: {itemId: "${itemId}"}) {
                            id
                        }
                    }
            `,
        });
    };

    readonly deleteTicket = (itemdId: string) => {
        return JSON.stringify({
            query: `mutation {
                deleteTicket(where: {itemId: "${itemdId}"}) {
                    id
                }
            }`,
        });
    };
}
export default new TicketsQuery();
