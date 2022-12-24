import http from "./httpServices";
import ticketsQuery from "./query/Tickets";
import requestsQuery from "./query/Requests";
import accountsQuery from "./query/Accounts";
import assetsQuery from "./query/Assets";

import * as requestsActions from "../store/requests/requestsReducer";
import * as ticketsActions from "../store/tickets/ticketsReducer";
import * as accountsActions from "../store/account/accountsReducer";

import fetchTickets from "../store/tickets/ticketsActions";
import fetchRequests from "../store/requests/requestsActions";
import configureStore from "../store/configureStore";

import { IAccount, IEditAccount } from "../models/account";
import { ITicketResponse } from "../models/tickets";
import { toast } from "react-toastify";

const store = configureStore;

class VisionDashboardApiServices {
    // @todo: Clean Up Every Method for their model => Requests, Tickets, Accounts
    // @todo : Fix Async and await http methods
    private publishRequest = async (itemId: string, successMsg: string, failedMsg: string) => {
        return await http
            .post("", requestsQuery.publishRequestQuery(itemId))
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
            .post("", ticketsQuery.publsishTicketQuery(itemId))
            .then(() => {
                toast.success(successMsg);
                store.dispatch(fetchTickets() as any);
            })
            .catch((error) => {
                toast.error(failedMsg);
                console.log(error);
            });
    };

    // Fetch All Tickets
    readonly fetchTickets = () => {
        store.dispatch(ticketsActions.FETCH_DATA());

        http.post("", ticketsQuery.fetchTicketsQuery())
            .then((response) => {
                const { data } = response.data;
                console.log(data);

                store.dispatch(ticketsActions.FETCH_DATA_SUCCESSFUL(data.tickets));
                store.dispatch(ticketsActions.GET_ALL_CLOSED_TICKETS());
            })
            .catch((error) => {
                const errorMsg = error.message;
                store.dispatch(ticketsActions.FETCH_DATA_FAILED(errorMsg));
            });
    };

    // Fetch All Users
    readonly fetchRequests = () => {
        store.dispatch(requestsActions.FETCH_DATA());

        http.post("", requestsQuery.fetchUsers())
            .then((response) => {
                const { data } = response.data;
                store.dispatch(requestsActions.FETCH_DATA_SUCCESSFUL(data.requests));
                store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());
            })
            .catch((error) => {
                const errorMsg = error.message;
                store.dispatch(requestsActions.FETCH_DATA_FAILED(errorMsg));
            });
    };

    // Fetch All Accounts
    readonly fetchAccounts = async () => {
        store.dispatch(accountsActions.FETCH_DATA());

        await http
            .post("", accountsQuery.fetchAccountsQuery())
            .then((response) => {
                const { data } = response.data;

                store.dispatch(accountsActions.FETCH_DATA_SUCCESSFUL(data.accounts));
                store.dispatch(accountsActions.GET_TOTAL_ACCOUNTS());
            })
            .catch((error) => {
                const errorMsg = error.message;
                store.dispatch(accountsActions.FETCH_DATA_FAILED(errorMsg));
            });
    };

    private publishAccount = async (itemId: string) => {
        await http
            .post("", accountsQuery.publishAccountQuery(itemId))
            .then(() => {
                toast.success("Account Published");
                this.fetchAccounts() as any;
            })
            .catch((error) => {
                toast.error(error.message);
                console.log("Publish Account Error");
            });
    };

    // Create User
    readonly createUser = (inputData: IAccount) => {
        http.post("/upload", inputData.profileImage)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    // Pend A Request
    readonly pendRequest = (itemId: string) => {
        http.post("", requestsQuery.pendRequestQuery(itemId))
            .then(() => {
                store.dispatch(requestsActions.PEND_REQUEST(itemId));
                store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());

                this.publishRequest(itemId, "Request Published", "failed publishing request");
            })
            .catch((error) => toast.error(error.message));
    };

    // Solve Request
    readonly solveRequest = (itemId: string) => {
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
    readonly reviewRequest = (itemId: string) => {
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
    readonly updateTicketResponse = (itemId: string, data: ITicketResponse[]) => {
        http.post("", ticketsQuery.updateResponseQuery(itemId, data))
            .then(() => {
                toast.success("Answer Submitted");
                this.publishTicket(itemId, "Ticket Published", "Ticket Publish Failed");
            })
            .catch(() => {
                toast.error("There Was an error for submitting answer");
            });
    };

    // Update Ticket isClose
    readonly updateIsClose = (itemId: string, isClose: boolean) => {
        http.post("", ticketsQuery.updateIsCloseQuery(itemId, isClose))
            .then(() => {
                toast.success("Ticket Updated");
                this.publishTicket(itemId, "Ticket Published", "Ticket Publish Failed").then(() => {
                    store.dispatch(ticketsActions.PEND_TICKET(itemId));
                });
            })
            .catch(() => toast.error("Ticket Did Not Close"));
    };

    // Delete Ticket
    readonly deleteTicket = (itemId: string) => {
        http.post("", ticketsQuery.deleteTicketQuery(itemId))
            .then(() => {
                store.dispatch(ticketsActions.DELETE_TICKET(itemId));
                toast.success("Ticket Has Been Deleted");
                window.history.go(-1);
            })
            .catch(() => {
                toast.error("Failed Deleting Ticket");
            });
    };

    // Update Profile Image
    readonly updateProfileImage = async (itemId: string, formData: FormData, setImageUpload: (value: React.SetStateAction<boolean>) => void) => {
        // Upload Assets
        await http
            .post("/upload", formData)
            .then((response) => {
                const imageId: string = response.data.id;

                // Publish Asset
                http.post("", assetsQuery.publishAssetQuery(imageId))
                    .then(() => {
                        // Update Profile
                        http.post("", accountsQuery.updateAccountImageQuery(imageId, itemId))
                            .then(async () => {
                                await this.publishAccount(itemId);
                                store.dispatch(this.fetchAccounts() as any);
                                setImageUpload(false);
                            })
                            .catch(() => {
                                setImageUpload(false);
                            });
                    })
                    .catch((error) => {
                        console.log("PublishAsset Failed");
                        // @todo: Dispatch Error Here
                    });
            })
            .catch((error) => console.log("Create Asset error", error));
    };

    readonly updateAccount = (itemId: string, data: IEditAccount) => {
        data &&
            http
                .post("", accountsQuery.updateAccountQuery(itemId, data))
                .then((response) => {
                    console.log(response);
                    this.publishAccount(itemId);
                    toast.success("Information Submitted Successful");
                })
                .catch((error) => {
                    console.log(error);
                });
    };

    readonly updateAccountPermission = async (itemId: string, permission: boolean) => {
        await http
            .post("", accountsQuery.updateAccountPermission(itemId, permission))
            .then(async (response) => {
                console.log(response.data);
                await this.publishAccount(itemId);
                this.fetchAccounts() as any;
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export default new VisionDashboardApiServices();
