import { IAddAccountGithub } from "../models/account";
import * as http from "./httpServices";

const loginWithGithub = () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID);
};

const getUserData = async () => {
    let response: IAddAccountGithub = {
        itemId: "",
        name: "",
        lastName: "",
        userName: "",
        email: "",
        login: "",
        hasRemember: false,
        isAdmin: false,
    };

    await fetch("https://vision-dashboard.onrender.com/getUserData", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    })
        .then((resposne) => {
            return resposne.json();
        })
        .then((data) => {
            response = data;
            return data;
        })
        .catch((error) => {
            return error;
        });

    return response;
};

export { getUserData, loginWithGithub };
