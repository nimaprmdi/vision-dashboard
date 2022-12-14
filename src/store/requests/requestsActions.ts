import moment from "moment";
import apiService from "../../services/VisionDashboardApiServices";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { IAccount } from "../../models/account";
import { toast } from "react-toastify";

const fetchRequests = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().requests;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

    if (diffInMinutes < 10) return;

    apiService.fetchUsers();
};

const createUser = (inputData: IAccount) => (dispatch: Dispatch, getState: () => RootState) => {
    apiService.createUser(inputData);
};

const pendRequest =
    (itemId: string, itemStatus: "pending" | "solved" | "reviewing" | undefined) => (dispatch: Dispatch) => {
        if (itemStatus !== "pending") {
            apiService.pendRequest(itemId);
        } else {
            toast.info("Request Already Is Pending");
        }
    };

const solveRequest =
    (itemId: string, itemStatus: "pending" | "solved" | "reviewing" | undefined) => (dispatch: Dispatch) => {
        if (itemStatus !== "solved") {
            apiService.solveRequest(itemId);
        } else {
            toast.info("Request Already Is Solved");
        }
    };

const reviewRequest =
    (itemId: string, itemStatus: "pending" | "solved" | "reviewing" | undefined) => (dispatch: Dispatch) => {
        if (itemStatus !== "reviewing") {
            apiService.reviewRequest(itemId);
        } else {
            toast.info("Request Already Is Reviewing");
        }
    };

export { createUser, pendRequest, solveRequest, reviewRequest };
export default fetchRequests;
