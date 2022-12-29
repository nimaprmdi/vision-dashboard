import moment from "moment";
import apiServices from "../../services/VisionDashboardApiServices";
import { Dispatch } from "@reduxjs/toolkit";
import { IAccountLogin, IAddAccount } from "../../models/account";
// actions
import { fetchRequests } from "../requests/requestsActions";
import { fetchTickets } from "../tickets/ticketsActions";
// reducer
import { RootState } from "../rootReducer";
import * as actions from "./accountsReducer";
import { NavigateFunction } from "react-router-dom";

const fetchAccounts = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().accounts;
    const diffIMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffIMinutes < 10) return;
    apiServices.fetchAccounts();
};

const deleteAccount = (itemId: string) => async (dispatch: Dispatch) => {
    await apiServices.deleteAccount(itemId);
    dispatch(actions.DELETE_ACCOUNT(itemId));
    // @todo: merge requests
    dispatch(fetchRequests() as any);
    dispatch(fetchTickets() as any);
};

const createAccount = (data: IAddAccount) => async (dispatch: Dispatch) => {
    console.log("createAccount data", data);

    return await apiServices
        .createAccount(data)
        .then((response) => {
            dispatch(actions.CREATE_ACCOUNT(response.data));

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

            dispatch(actions.CREATE_ACCOUNT(response.data.data.createAccount));

            return response.data.data.createAccount;
        })
        .then((response) => {
            console.log("findal github create account ", response);
            const accounts = getState().accounts.accounts;
            const accountIndex = accounts.findIndex((account) => account.userName === response.userName);
            dispatch(actions.SELECT_CURRENT_USER(accountIndex));
        })
        .catch((error) => console.log(error));
};

const loginAccount = (data: IAccountLogin, navigate: NavigateFunction) => async (dispatch: Dispatch, getState: () => RootState) => {
    const accountIndex = getState().accounts.accounts.findIndex((account) => account.userName === data.userName);

    return await apiServices.loginAccount(data).then(() => {
        dispatch(actions.SELECT_CURRENT_USER(accountIndex));

        setTimeout(() => {
            console.log("Here");
            navigate("/");
        }, 1000);
    });
};

const getCurrentAccount = (accountIndex: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(actions.SELECT_CURRENT_USER(accountIndex));
};

const removeCurrentUser = () => (dispatch: Dispatch) => {
    dispatch(actions.REMOVE_CURRENT_USER);
};

export { fetchAccounts, deleteAccount, createAccount, loginAccount, getCurrentAccount, createGithubAccount, removeCurrentUser };
