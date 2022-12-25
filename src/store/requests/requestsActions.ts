import moment from "moment";
import apiService from "../../services/VisionDashboardApiServices";
import * as actions from "./requestsReducer";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { IAccount } from "../../models/account";
import { toast } from "react-toastify";
import { IRequest } from "../../models/request";

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

const createRequest = (userId: string, data: IRequest) => (dispatch: Dispatch) => {
    apiService.createRequest(userId, data);
    dispatch(actions.CREATE_REQUEST(data));
};

export { fetchRequests, createUser, pendRequest, solveRequest, reviewRequest, createRequest };
