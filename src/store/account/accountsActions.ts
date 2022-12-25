import moment from "moment";
import apiServices from "../../services/VisionDashboardApiServices";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchRequests } from "../requests/requestsActions";
import { IAccount, IAddAccount } from "../../models/account";
import { fetchTickets } from "../tickets/ticketsActions";
//reducer
import { RootState } from "../rootReducer";
import { DELETE_ACCOUNT, CREATE_ACCOUNT } from "./accountsReducer";

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

const createAccount = (data: IAddAccount) => async (dispatch: Dispatch, getState: () => RootState) => {
    await apiServices
        .createAccount(data)
        .then((response) => {
            const data = response.data;
            dispatch(CREATE_ACCOUNT(data));
        })
        .catch((error) => console.log(error));
};

export { fetchAccounts, deleteAccount, createAccount };
