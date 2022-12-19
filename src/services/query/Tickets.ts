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

    updateIsClose = (itemId: string, isClose: boolean) => {
        return JSON.stringify({
            query: `mutation {
                        updateTicket(data: { isClose : ${isClose} } , where: {itemId: "${itemId}"}) {
                            id
                        }
                    }
            `,
        });
    };
}
export default new TicketsQuery();
