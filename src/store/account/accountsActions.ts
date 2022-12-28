import moment from "moment";
import apiServices from "../../services/VisionDashboardApiServices";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchRequests } from "../requests/requestsActions";
import { IAccountLogin, IAddAccount } from "../../models/account";
import { fetchTickets } from "../tickets/ticketsActions";
import { getUserData } from "../../services/githubServices";
// reducer
import { RootState } from "../rootReducer";
import { DELETE_ACCOUNT, CREATE_ACCOUNT, SELECT_CURRENT_USER } from "./accountsReducer";
import { toast } from "react-toastify";

const fetchAccounts = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().accounts;
    const diffIMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffIMinutes < 10) return;
    apiServices.fetchAccounts();
};

const deleteAccount = (itemId: string) => async (dispatch: Dispatch) => {
    await apiServices.deleteAccount(itemId);
    dispatch(DELETE_ACCOUNT(itemId));
    // @todo: merge requests
    dispatch(fetchRequests() as any);
    dispatch(fetchTickets() as any);
};

const createAccount = (data: IAddAccount) => async (dispatch: Dispatch) => {
    console.log("createAccount data", data);

    return await apiServices
        .createAccount(data)
        .then((response) => {
            dispatch(CREATE_ACCOUNT(response.data));

            setTimeout(() => {
                // window.location.href = process.env.REACT_APP_GLOBAL_HOME_LOCATION!;
            }, 1000);
        })
        .catch((error) => console.log(error));
};

const createGithubAccount = (data: IAddAccount) => async (dispatch: Dispatch, getState: () => RootState) => {
    return await apiServices
        .createGithubAccount(data)
        .then((response) => {
            console.log("createGithubAccount", response);

            dispatch(CREATE_ACCOUNT(response.data.data.createAccount));

            return response.data.data.createAccount;
        })
        .then((response) => {
            console.log("findal github create account ", response);
            const accounts = getState().accounts.accounts;
            const accountIndex = accounts.findIndex((account) => account.userName === response.userName);
            dispatch(SELECT_CURRENT_USER(accountIndex));
        })
        .catch((error) => console.log(error));
};

const loginAccount = (data: IAccountLogin) => async (dispatch: Dispatch, getState: () => RootState) => {
    await apiServices.loginAccount(data);
};

const getCurrentAccount = (accountIndex: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(SELECT_CURRENT_USER(accountIndex));
};

export { fetchAccounts, deleteAccount, createAccount, loginAccount, getCurrentAccount, createGithubAccount };
