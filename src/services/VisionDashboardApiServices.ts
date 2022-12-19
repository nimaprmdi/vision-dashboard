import http from "./httpServices";
import requestsQuery from "./query/Requests";
import ticketsQuery from "./query/Tickets";
import * as requestsActions from "../store/requests/requestsReducer";
import * as ticketsActions from "../store/tickets/ticketsReducer";
import fetchTickets from "../store/tickets/ticketsActions";
import fetchRequests from "../store/requests/requestsActions";
import configureStore from "../store/configureStore";
import { toast } from "react-toastify";
import { IAccount } from "../models/account";
import { ITicketResponse } from "../models/tickets";

const store = configureStore;

class VisionDashboardApiServices {
    //@todo clean up -> send to query files
    private publishRequestQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation MyMutation {
                    publishRequest(where: {itemId: "${itemId}"}) { id }
                }          
            `,
        });
    };
    //@todo clean up -> send to query files
    private publsishTicketQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation MyMutation {
                    publishTicket(where: {itemId: "${itemId}"}) { id }
                } 
            `,
        });
    };

    private publishRequest = async (itemId: string, successMsg: string, failedMsg: string) => {
        return await http
            .post("", this.publishRequestQuery(itemId))
            .then(() => {
                toast.success(successMsg);
                store.dispatch(fetchRequests() as any);
            })
            .catch((error) => {
                toast.error(failedMsg);
                console.log(error);
            });
    };

    private publishTicket = async (itemId: string, successMsg: string, failedMsg: string) => {
        return await http
            .post("", this.publsishTicketQuery(itemId))
            .then(() => {
                toast.success(successMsg);
                store.dispatch(fetchTickets() as any);
            })
            .catch((error) => {
                toast.error(failedMsg);
                console.log(error);
            });
    };

    /*******************************************************************/

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

                this.publishRequest(itemId, "Request Published", "failed publishing request");
            })
            .catch((error) => toast.error(error.message));
    };

    // Solve Request
    solveRequest = (itemId: string) => {
        http.post("", requestsQuery.solveRequestQuery(itemId))
            .then(() => {
                this.publishRequest(itemId, "Request Published", "failed publishing request").then((response) => {
                    store.dispatch(requestsActions.SOLVE_REQUEST(itemId));
                    store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());
                });
            })
            .catch((error) => toast.error(error.message));
    };

    // Review Request
    reviewRequest = (itemId: string) => {
        http.post("", requestsQuery.reviewRequestQuery(itemId))
            .then(() => {
                this.publishRequest(itemId, "Request Published", "failed publishing request").then((response) => {
                    store.dispatch(requestsActions.REVIEW_REQUEST(itemId));
                    store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());
                });
            })
            .catch((error) => toast.error(error.message));
    };

    // Update Ticket Response and send
    updateTicketResponse = (itemId: string, data: ITicketResponse[]) => {
        http.post("", ticketsQuery.updateResponse(itemId, data))
            .then(() => {
                toast.success("Answer Submitted");
                this.publishTicket(itemId, "Ticket Published", "Ticket Publish Failed");
            })
            .catch(() => {
                toast.error("There Was an error for submitting answer");
            });
    };

    // Update Ticket isClose
    updateIsClose = (itemId: string, isClose: boolean) => {
        http.post("", ticketsQuery.updateIsClose(itemId, isClose))
            .then(() => {
                toast.success("Ticket Updated");
                this.publishTicket(itemId, "Ticket Published", "Ticket Publish Failed").then(() => {
                    store.dispatch(ticketsActions.PEND_TICKET(itemId));
                });
            })
            .catch((error) => toast.error("Ticket Did Not Close"));
    };
}

export default new VisionDashboardApiServices();
