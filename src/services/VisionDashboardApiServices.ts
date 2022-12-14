import http from "./httpServices";
import requestsQuery from "./query/Requests";
import * as requestsActions from "../store/requests/requestsReducer";
import configureStore from "../store/configureStore";
import { toast } from "react-toastify";
import { IAccount } from "../models/account";

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
}

export default new VisionDashboardApiServices();
