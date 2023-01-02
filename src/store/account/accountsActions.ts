import moment from "moment";
import apiServices from "../../services/VisionDashboardApiServices";
import { Dispatch } from "@reduxjs/toolkit";
import { IAccountLogin, IAddAccount } from "../../models/account";
// actions
import { fetchRequests, removeRequestsHistory } from "../requests/requestsActions";
import { fetchTickets, removeTicketsHistory } from "../tickets/ticketsActions";
// reducer
import { RootState } from "../rootReducer";
import * as actions from "./accountsReducer";
import { CHANGE_HTTP_CALL_STATUS } from "../entities/entitiesReducer";

import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

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

const createAccount = (data: IAddAccount, navigate: NavigateFunction) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(CHANGE_HTTP_CALL_STATUS(true));
    const accountIndex = getState().accounts.accounts.findIndex((account) => account.email === data.email);

    if (accountIndex === -1) {
        const user = await apiServices.createAccount(data);
        dispatch(actions.CREATE_ACCOUNT(user.data.data.createAccount));

        // Select Current Account
        const newAccountIndex = getState().accounts.accounts.findIndex((account) => account.email === user.data.data.createAccount.email);
        dispatch(actions.SELECT_CURRENT_USER(newAccountIndex));
        dispatch(CHANGE_HTTP_CALL_STATUS(false));
        navigate(process.env.REACT_APP_GLOBAL_HOME_LOCATION!);
    } else {
        toast.error("This email exist");
        dispatch(CHANGE_HTTP_CALL_STATUS(false));
    }
};

// create a github account
const createGithubAccount = (data: IAddAccount, navigate: NavigateFunction) => async (dispatch: Dispatch, getState: () => RootState) => {
    return await apiServices
        .createGithubAccount(data)
        .then((response) => {
            console.log(data);
            console.log(response);

            dispatch(actions.CREATE_ACCOUNT(response.data.data.createAccount));
            return response.data.data.createAccount;
        })
        .then((response) => {
            const { accounts } = getState().accounts;
            const accountIndex = accounts.findIndex((account) => account.userName === response.userName);
            dispatch(actions.SELECT_CURRENT_USER(accountIndex));
            navigate(process.env.REACT_APP_GLOBAL_HOME_LOCATION!);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong with github actions");
            navigate(`${process.env.REACT_APP_GLOBAL_HOME_LOCATION!}login`);
        });
};

// Login Account by email and password
const loginAccount = (data: IAccountLogin, navigate: NavigateFunction) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(CHANGE_HTTP_CALL_STATUS(true));
    const accountIndex = getState().accounts.accounts.findIndex((account) => account.email === data.email);

    if (accountIndex !== -1) {
        const user = await apiServices.loginAccount(data);

        if (user) {
            dispatch(actions.SELECT_CURRENT_USER(accountIndex));
            dispatch(CHANGE_HTTP_CALL_STATUS(false));
            navigate(process.env.REACT_APP_GLOBAL_HOME_LOCATION!);
        } else {
            dispatch(CHANGE_HTTP_CALL_STATUS(false));
            toast.error("Falied Login");
        }
    } else {
        toast.error("No email found");
        dispatch(CHANGE_HTTP_CALL_STATUS(false));
    }
};

const getCurrentAccount = (accountIndex: number, navigate: NavigateFunction) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(actions.SELECT_CURRENT_USER(accountIndex));
    navigate(process.env.REACT_APP_GLOBAL_HOME_LOCATION!);
};

const removeCurrentUser = () => (dispatch: Dispatch) => {
    dispatch(actions.REMOVE_CURRENT_USER());
};

const setLoadingStatus = (status: boolean) => (dispatch: Dispatch) => {
    dispatch(actions.SET_LOADING_STATUS(status));
};

const removeAccountHistory = () => (dispatch: Dispatch) => {
    dispatch(actions.REMOVE_ACCOUNT_HISTORY());
    dispatch(removeRequestsHistory() as any);
    dispatch(removeTicketsHistory() as any);
};

export {
    fetchAccounts,
    deleteAccount,
    createAccount,
    loginAccount,
    getCurrentAccount,
    createGithubAccount,
    removeCurrentUser,
    removeAccountHistory,
    setLoadingStatus,
};
