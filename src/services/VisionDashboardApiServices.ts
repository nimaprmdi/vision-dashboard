import http from "./httpServices";
import ticketsQuery from "./query/Tickets";
import requestsQuery from "./query/Requests";
import accountsQuery from "./query/Accounts";
import assetsQuery from "./query/Assets";

// reducers actions @todo : what is going on here action reducers and actions bottoms ?
import * as requestsActions from "../store/requests/requestsReducer";
import * as ticketsActions from "../store/tickets/ticketsReducer";
import * as accountsActions from "../store/account/accountsReducer";

// actions
import { fetchTickets } from "../store/tickets/ticketsActions";
import { fetchRequests } from "../store/requests/requestsActions";
import configureStore from "../store/configureStore";

// Models
import { IAccount, IAddAccount, IEditAccount, IAccountLogin } from "../models/account";
import { IRequest } from "../models/request";
import { ITicketResponse, ITicket } from "../models/tickets";

//urtils
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

const store = configureStore;

class VisionDashboardApiServices {
    // @todo: Clean Up Every Method for their model => Requests, Tickets, Accounts
    // @todo : Fix Async and await http methods
    // remove dispacyches from this file (should be actions)

    private publishRequest = async (itemId: string) => {
        return await http
            .post("", requestsQuery.publishRequestQuery(itemId))
            .then(() => {
                toast.success("Request Published Successfuly");
                store.dispatch(fetchRequests() as any);
            })
            .catch((error) => {
                toast.error("Publish Request Failed");
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
            });
    };

    // Create User
    readonly createUser = (inputData: IAccount) => {
        http.post("/upload", inputData.profileImage)
            .then((response) => {
                return response;
            })
            .catch((error) => console.log(error));
    };

    // Pend A Request
    readonly pendRequest = (itemId: string) => {
        http.post("", requestsQuery.pendRequestQuery(itemId))
            .then(() => {
                store.dispatch(requestsActions.PEND_REQUEST(itemId));
                store.dispatch(requestsActions.GET_ANSWERED_REQUESTS());

                this.publishRequest(itemId);
            })
            .catch((error) => toast.error(error.message));
    };

    // Solve Request
    readonly solveRequest = (itemId: string) => {
        http.post("", requestsQuery.solveRequestQuery(itemId))
            .then(() => {
                this.publishRequest(itemId).then(() => {
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
                this.publishRequest(itemId).then(() => {
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
    readonly deleteTicket = async (itemId: string) => {
        return await http
            .post("", ticketsQuery.deleteTicketQuery(itemId))
            .then(() => {
                store.dispatch(ticketsActions.DELETE_TICKET(itemId));
                toast.success("Ticket Has Been Deleted");
                window.history.go(-1);
            })
            .catch(() => {
                toast.error("Failed Deleting Ticket");
            });
    };

    // #addTicket
    readonly addTicket = async (accountId: string, data: ITicket) => {
        return await http
            .post("", ticketsQuery.addTicketQuery(accountId, data))
            .then((response) => {
                toast.success("Ticket Has Been Created");
                this.publishTicket(response.data.data.createTicket.itemId, "Ticket Published", "Error Publishing Ticket");
                this.publishAccount(accountId);
                this.publishRequest(response.data.data.createTicket.requests.itemId);
                return response;
            })
            .catch((error) => {
                toast.error("There was and error creating ticket");
                return error;
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
                await this.publishAccount(itemId);
                this.fetchAccounts() as any;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    readonly deleteAccount = async (itemId: string) => {
        await http
            .post("", accountsQuery.deleteAccountQuery(itemId))
            .then((response) => {
                toast.success("Account Deleted");
                window.history.go(-1);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Delete Account Failed");
            });
    };

    readonly createRequest = async (userId: string, data: IRequest, navigate: NavigateFunction, navAddress?: string) => {
        return await http
            .post("", requestsQuery.createRequest(userId, data))
            .then(async (response) => {
                const { data } = response;
                toast.success("Submitted Successfully");
                store.dispatch(requestsActions.CREATE_REQUEST(data.data.createRequest));
                await this.publishRequest(data.data.createRequest.itemId).then(() => {
                    navAddress ? navigate(navAddress) : navigate("/");
                });
                await this.publishAccount(data.data.createRequest.account.itemId);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Create Request Failed");
            });
    };

    readonly createAccount = async (data: IAddAccount) => {
        return await http
            .post("", accountsQuery.createAccountQuery(data))
            .then((response) => {
                toast.success("Create Account Successful");
                this.publishAccount(response.data.data.createAccount.itemId);
                return response;
            })
            .catch((error) => {
                error.response.data.errors && toast.error(error.response.data.errors[0].message);
                console.log(error.response.data.errors[0].message);
                return error;
            });
    };

    readonly createGithubAccount = async (data: IAddAccount) => {
        return await http
            .post("", accountsQuery.createGithubAccountQuery(data))
            .then((response) => {
                toast.success("Create Account Successful");
                this.publishAccount(response.data.data.createAccount.itemId);
                return response;
            })
            .catch((error) => {
                toast.error(error.messsage);
                return error;
            });
    };

    readonly loginAccount = async (data: IAccountLogin) => {
        return await http
            .post("", accountsQuery.loginAccountQuery(data))
            .then((response) => {
                if (response.data.data.accountsConnection.aggregate.count > 0) {
                    return true;
                }
                return false;
            })
            .catch((error) => {
                console.log(error);
                toast.error("Ann Error Occourd");
                return false;
            });
    };

    readonly handleGoogleLogin = async (googleData: any) => {
        const token = JSON.stringify({
            token: googleData.clientId,
        });

        await fetch("/api/google-login", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.clientId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
}

export default new VisionDashboardApiServices();
