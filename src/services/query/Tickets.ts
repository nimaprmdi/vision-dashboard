import { ITicketResponse } from "../../models/tickets";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

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
}
export default new TicketsQuery();
