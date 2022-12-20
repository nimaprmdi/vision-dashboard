import moment from "moment";
import apiServices from "../../services/VisionDashboardApiServices";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";

const fetchAccounts = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().accounts;
    const diffIMinutes = moment().diff(moment(lastFetch), "minutes");

    if (diffIMinutes < 10) return;

    apiServices.fetchAccounts();
};

export default fetchAccounts;
