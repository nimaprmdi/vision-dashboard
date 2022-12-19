import { ITicketResponse } from "../../models/tickets";

class TicketsQuery {
    updateResponse = (itemId: string, data: ITicketResponse[]) => {
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

    updateIsClose = (itemId: string) => {
        return JSON.stringify({
            query: `mutation {
                        updateTicket(data: { isClose : true } , where: {itemId: "${itemId}"}) {
                            id
                        }
                    }
            `,
        });
    };

    updateTicketIsClose = (itemId: string) => {
        return JSON.stringify({
            query: `mutation MyMutation {
                        updateTicket(data: {isClose: false}, where: {itemId: "${itemId}"})
                    }
            `,
        });
    };
}
export default new TicketsQuery();
