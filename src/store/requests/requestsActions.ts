import * as http from "../../services/httpServices";
import moment from "moment";
import * as requestsActions from "./requestsReducer";
import { RootState } from "../rootReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { IAccount } from "../../models/account";
import { toast } from "react-toastify";

const fetchRequests = () => (dispatch: Dispatch, getState: () => RootState) => {
    const { lastFetch } = getState().requests;
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

    if (diffInMinutes < 10) return;

    const data = JSON.stringify({
        query: `{
            requests {
                id
                itemId
                itemStatus
                lastName
                location
                mobile
                name
                phone
                service
                stafId
                date
                gender
                address
                description
                location
                account {
                    name
                    lastName
                    userName
                    isAdmin
                    color {
                        hex
                    }
                    profileImage {
                        url
                    }
                }
            }
        }`,
        variables: {},
    });

    dispatch(requestsActions.FETCH_DATA());

    http.default
        .post("", data)
        .then((response) => {
            const requests = response.data;
            dispatch(requestsActions.FETCH_DATA_SUCCESSFUL(requests.data.requests));
            dispatch(requestsActions.GET_ANSWERED_REQUESTS());
        })
        .catch((error) => {
            const errorMsg = error.message;
            dispatch(requestsActions.FETCH_DATA_FAILED(errorMsg));
        });
};

const createUser = (inputData: IAccount) => (dispatch: Dispatch, getState: () => RootState) => {
    const {
        itemid,
        name,
        lastName,
        email,
        userName,
        password,
        isAdmin,
        bio,
        location,
        itemRequests,
        answeredTickets,
        answeredRequests,
        itemTickets,
        createdAt,
        color,
        profileImage,
    } = inputData;

    var data = JSON.stringify({
        query: `
            mutation createUser(
                $itemid: String!
                $name: String!
                $lastName: String!
                $email: String!
                $userName: String!
                $password: String!
                $isAdmin: Boolean!
                $bio: String
                $location: String
                $itemRequests: Json
                $answeredRequests: Json
                $itemTickets: Json
                $answeredTickets: Json
                $color: ColorInput
                $profileImage: AssetCreateOneInlineInput
                $tickets: TicketCreateManyInlineInput
                $requests: AccountRequestsCreateManyInlineInput
                ) {
                createRequest(
                    data:{
                        itemid: $itemid
                        name: $name
                        lastName: $lastName
                        email: $email
                        userName: $userName
                        password: $password
                        isAdmin: $isAdmin
                        bio: $bio
                        location: $location
                        itemRequests: $itemRequests
                        answeredRequests: $answeredRequests
                        itemTickets: $itemTickets
                        answeredTickets: $answeredTickets
                        color: $color
                        profileImage: $profileImage
                        tickets: $tickets
                        requests: $requests
                    }
                ) 
                {
                    id
                }
            }
        `,
        variables: {
            itemid: itemid,
            name: name,
            lastName: lastName,
            email: email,
            userName: userName,
            password: password,
            isAdmin: isAdmin,
            bio: bio,
            location: location,
            itemRequests: itemRequests,
            answeredTickets: answeredTickets,
            answeredRequests: answeredRequests,
            itemTickets: itemTickets,
            createdAt: createdAt,
            color: color,
            profileImage: profileImage,
        },
    });

    http.default
        .post("/upload", profileImage)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(error));
};

const pendRequest = (itemId: string) => (dispatch: Dispatch) => {
    dispatch(requestsActions.PEND_REQUEST(itemId));

    const data = JSON.stringify({
        query: `
            mutation {
                updateRequest(data: {itemStatus: "pending"}, where: {itemId: "${itemId}"})
            } 
        `,
    });

    toast.success("hello");

    http.default
        .post("", data)
        .then((response) => toast.success("Request Updated"))
        .catch((error) => toast.error(error.message));
};

const solveRequest = (itemId: string) => (dispatch: Dispatch) => {
    dispatch(requestsActions.SOLVE_REQUEST(itemId));

    const data = JSON.stringify({
        query: `
            mutation MyMutation {
                updateRequest(data: {itemStatus: "solved"}, where: {itemId: "${itemId}"} ) {
                    id
                }
            }
        `,
    });

    const publsishRequest = JSON.stringify({
        query: `
            mutation MyMutation {
                publishRequest(where: {itemId: "${itemId}"}) { id }
            }          
        `,
    });

    toast.success("hello");

    http.default
        .post("", data)
        .then((response) => {
            toast.success("Request Updated");

            http.default
                .post("", publsishRequest)
                .then((response) => console.log(response))
                .catch((error) => {
                    toast.error("Failed Publishing request");
                    console.log(error);
                });
        })
        .catch((error) => toast.error(error.message));
};

const reviewRequest = (itemId: string) => (dispatch: Dispatch) => {
    dispatch(requestsActions.REVIEW_REQUEST(itemId));
};

export { createUser, pendRequest, solveRequest, reviewRequest };
export default fetchRequests;
