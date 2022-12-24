import moment from "moment";
import apiServices from "../../services/VisionDashboardApiServices";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { DELETE_ACCOUNT } from "./accountsReducer";
import { fetchRequests } from "../requests/requestsActions";
import { fetchTickets } from "../tickets/ticketsActions";

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
    dispatch(fetchRequests() as any);
};

export { fetchAccounts, deleteAccount };
