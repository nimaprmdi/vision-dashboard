import moment from "moment";
import apiService from "../../services/VisionDashboardApiServices";
import * as actions from "./requestsReducer";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { IAccount } from "../../models/account";
import { toast } from "react-toastify";
import { IRequest } from "../../models/request";
import { NavigateFunction } from "react-router-dom";

const fetchRequests = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().requests;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

    if (diffInMinutes < 10) return;

    apiService.fetchRequests();
};

const createUser = (inputData: IAccount) => (dispatch: Dispatch, getState: () => RootState) => {
    apiService.createUser(inputData);
};

const pendRequest = (itemId: string, itemStatus: "pending" | "solved" | "reviewing" | undefined) => (dispatch: Dispatch) => {
    if (itemStatus !== "pending") {
        apiService.pendRequest(itemId);
    } else {
        toast.info("Request Already Is Pending");
    }
};

const solveRequest = (itemId: string, itemStatus: "pending" | "solved" | "reviewing" | undefined) => (dispatch: Dispatch) => {
    if (itemStatus !== "solved") {
        apiService.solveRequest(itemId);
    } else {
        toast.info("Request Already Is Solved");
    }
};

const reviewRequest = (itemId: string, itemStatus: "pending" | "solved" | "reviewing" | undefined) => (dispatch: Dispatch) => {
    if (itemStatus !== "reviewing") {
        apiService.reviewRequest(itemId);
    } else {
        toast.info("Request Already Is Reviewing");
    }
};

const createRequest = (userId: string, data: IRequest, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    await apiService.createRequest(userId, data, navigate, "/archives/requests/").then(() => {
        dispatch(actions.CREATE_REQUEST(data));
    });
};

const removeRequestsHistory = () => (dispatch: Dispatch) => {
    dispatch(actions.REMOVE_REQUESTS_HISTORY());
};

export { fetchRequests, createUser, pendRequest, solveRequest, reviewRequest, createRequest, removeRequestsHistory };
