import http from "./httpServices";
import requestsQuery from "./query/Requests";
import ticketsQuery from "./query/Tickets";
import * as requestsActions from "../store/requests/requestsReducer";
import fetchTickets from "../store/tickets/ticketsActions";
import configureStore from "../store/configureStore";
import { toast } from "react-toastify";
import { IAccount } from "../models/account";
import { ITicketResponse } from "../models/tickets";

const store = configureStore;

class VisionDashboardApiServices {
    private publishRequest = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation MyMutation {
                    publishRequest(where: {itemId: "${itemId}"}) { id }
                }          
            `,
        });
    };

    private publsishTicket = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation MyMutation {
                    publishTicket(where: {itemId: "${itemId}"}) { id }
                } 
            `,
        });
    };

    // Fetch All Users
    fetchUsers = () => {
        store.dispatch(requestsActions.FETCH_DATA());

        http.post("", requestsQuery.fetchUsers())
            .then((response) => {
                const requests = response.data;
                store.dispatch(requestsActions.FETCH_DATA_SUCCESSFUL(requests.data.requests));
                store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());
            })
            .catch((error) => {
                const errorMsg = error.message;
                store.dispatch(requestsActions.FETCH_DATA_FAILED(errorMsg));
            });
    };

    // Create User
    createUser = (inputData: IAccount) => {
        http.post("/upload", inputData.profileImage)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    // Pend A Request
    pendRequest = (itemId: string) => {
        http.post("", requestsQuery.pendRequestQuery(itemId))
            .then(() => {
                store.dispatch(requestsActions.PEND_REQUEST(itemId));
                store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());

                toast.success("Request Updated");

                http.post("", this.publishRequest(itemId)).catch((error) => {
                    toast.error("Failed Publishing request");
                    console.log(error);
                });
            })
            .catch((error) => toast.error(error.message));
    };

    // Solve Request
    solveRequest = (itemId: string) => {
        http.post("", requestsQuery.solveRequestQuery(itemId))
            .then(() => {
                store.dispatch(requestsActions.SOLVE_REQUEST(itemId));
                store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());
                toast.success("Request Updated");

                http.post("", this.publishRequest(itemId)).catch((error) => {
                    toast.error("Failed Publishing request");
                });
            })
            .catch((error) => toast.error(error.message));
    };

    // Review Request
    reviewRequest = (itemId: string) => {
        http.post("", requestsQuery.reviewRequestQuery(itemId))
            .then(() => {
                store.dispatch(requestsActions.REVIEW_REQUEST(itemId));
                store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());
                toast.success("Request Updated");

                http.post("", this.publishRequest(itemId)).catch((error) => {
                    toast.error("Failed Publishing request");
                });
            })
            .catch((error) => toast.error(error.message));
    };

    // Updating Request
    updateResponse = (itemId: string, data: ITicketResponse[]) => {
        http.post("", ticketsQuery.updateResponse(itemId, data))
            .then(() => {
                toast.success("Answer Submitted");
                http.post("", this.publsishTicket(itemId))
                    .then(() => {
                        toast.success("Ticket Published Successfuly");
                        store.dispatch(fetchTickets() as any);
                    })
                    .catch((error) => {
                        toast.error("Error Publishing Ticket");
                        console.log(error);
                    });
            })
            .catch(() => {
                toast.error("There Was an error for submitting answer");
            });
    };
}

export default new VisionDashboardApiServices();
